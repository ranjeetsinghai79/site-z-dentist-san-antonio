/**
 * Webcrew API — Cloudflare Worker
 * Deploy: cd api && npx wrangler deploy
 * Domain: api.webcrew.app
 *
 * Routes:
 *   POST /leads          — contact form submissions from all deployed sites
 *   POST /sms/webhook    — Twilio inbound SMS replies
 *   GET  /health         — uptime check
 */

export interface Env {
  RESEND_API_KEY: string
  TWILIO_ACCOUNT_SID: string
  TWILIO_AUTH_TOKEN: string
  TWILIO_FROM_NUMBER: string
  LEADS_SHEET_ID: string
  GOOGLE_SERVICE_ACCOUNT_JSON: string
  NOTIFICATION_EMAIL: string       // pavan.harati@gmail.com — we get notified of every lead
  CALENDLY_URL: string
  NEON_DATABASE_URL?: string
  GOOGLE_AI_API_KEY: string
}

// ─── Contact form lead ────────────────────────────────────────────────────

interface ContactLead {
  firstName: string
  lastName?: string
  phone?: string
  email?: string
  service?: string
  message?: string
  source: string
  businessName: string
  businessNiche: string
  businessOwnerPhone?: string   // injected by builder from lead data
  businessOwnerEmail?: string   // injected by builder from lead data
  submittedAt: string
}

// ─── Resend email ─────────────────────────────────────────────────────────

async function sendEmail(env: Env, to: string, subject: string, html: string): Promise<void> {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'leads@webcrew.app', to, subject, html }),
  })
}

// ─── Twilio SMS ───────────────────────────────────────────────────────────

async function sendSms(env: Env, to: string, body: string): Promise<void> {
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_FROM_NUMBER) return
  const url = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`
  const params = new URLSearchParams({ To: to, From: env.TWILIO_FROM_NUMBER, Body: body })
  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })
}

// ─── Google Sheets append ─────────────────────────────────────────────────

async function appendToSheets(env: Env, lead: ContactLead): Promise<void> {
  if (!env.GOOGLE_SERVICE_ACCOUNT_JSON || !env.LEADS_SHEET_ID) return
  try {
    const sa = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_JSON)
    // Simple JWT + Sheets append via REST — full impl in retention agent
    // Minimal version: just log, full version wired in pipeline retention.ts
    console.log(`[Sheets] Lead from ${lead.businessName}: ${lead.firstName} ${lead.phone || lead.email}`)
  } catch { /* non-blocking */ }
}

// ─── POST /leads handler ──────────────────────────────────────────────────

async function handleLeadSubmission(req: Request, env: Env): Promise<Response> {
  const lead: ContactLead = await req.json()
  const visitorName = `${lead.firstName}${lead.lastName ? ' ' + lead.lastName : ''}`
  const contact = lead.phone || lead.email || 'unknown'

  // 1. Notify us — every lead logged to our email
  await sendEmail(
    env,
    env.NOTIFICATION_EMAIL || 'hello@webcrew.app',
    `🔔 New lead: ${lead.businessName} — ${visitorName}`,
    `
    <h2>New contact form submission</h2>
    <table>
      <tr><td><b>Business:</b></td><td>${lead.businessName} (${lead.businessNiche})</td></tr>
      <tr><td><b>Visitor:</b></td><td>${visitorName}</td></tr>
      <tr><td><b>Phone:</b></td><td>${lead.phone || '—'}</td></tr>
      <tr><td><b>Email:</b></td><td>${lead.email || '—'}</td></tr>
      <tr><td><b>Service:</b></td><td>${lead.service || '—'}</td></tr>
      <tr><td><b>Message:</b></td><td>${lead.message || '—'}</td></tr>
      <tr><td><b>Source:</b></td><td>${lead.source}</td></tr>
      <tr><td><b>Time:</b></td><td>${lead.submittedAt}</td></tr>
    </table>
    `
  )

  // 2. SMS the business owner — "you just got a lead on your demo site!"
  // This is the killer hook. They see proof of value before paying.
  if (lead.businessOwnerPhone) {
    await sendSms(
      env,
      lead.businessOwnerPhone,
      `📲 ${lead.businessName}: New inquiry from ${visitorName} (${contact}) via your demo site!\n\nReply INTERESTED to claim this site — ${env.CALENDLY_URL || 'webcrew.app'}`
    )
  }

  // 3. Email the business owner (if we have their email)
  if (lead.businessOwnerEmail) {
    await sendEmail(
      env,
      lead.businessOwnerEmail,
      `You just got a new customer inquiry — ${lead.businessName}`,
      `
      <h2>Someone contacted your business through your demo website!</h2>
      <p><b>${visitorName}</b> just submitted a contact request:</p>
      <ul>
        <li>Phone: ${lead.phone || '—'}</li>
        <li>Email: ${lead.email || '—'}</li>
        <li>Looking for: ${lead.service || lead.message || '—'}</li>
      </ul>
      <p>This is what your website can do for you — 24/7, on autopilot.</p>
      <p><a href="${env.CALENDLY_URL || 'https://webcrew.app'}">Book a 15-min call to activate your site →</a></p>
      <hr>
      <p style="color:#999;font-size:12px">This demo was built by Webcrew. You're not live yet — <a href="${env.CALENDLY_URL}">get live today</a>.</p>
      `
    )
  }

  // 4. Google Sheets log
  await appendToSheets(env, lead)

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
}

// ─── SMS reply handler (Twilio webhook) ──────────────────────────────────────

const OPT_OUT_WORDS = ['stop', 'unsubscribe', 'quit', 'cancel', 'opt out', 'remove me']
const YES_WORDS = ['yes', 'yeah', 'yep', 'interested', 'sounds good', "let's do it", 'i want']

function isOptOut(text: string): boolean {
  const t = text.toLowerCase()
  return OPT_OUT_WORDS.some(w => t.includes(w))
}

function isYes(text: string): boolean {
  const t = text.toLowerCase().trim()
  return YES_WORDS.some(w => t.includes(w))
}

async function geminiSMSReply(env: Env, context: string, incomingMsg: string): Promise<string> {
  const prompt = `${context}\n\nThe prospect replied: "${incomingMsg}"\n\nWrite a single SMS reply (max 160 chars). Just the reply text, no quotes or labels.`
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GOOGLE_AI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  )
  const json: any = await res.json()
  return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? ''
}

async function handleSMSWebhook(req: Request, env: Env): Promise<Response> {
  // Twilio sends form-encoded body
  const body = await req.text()
  const params = new URLSearchParams(body)
  const from = params.get('From') ?? ''
  const msgBody = params.get('Body') ?? ''
  const twimlResponse = (msg: string) =>
    new Response(`<?xml version="1.0"?><Response><Message>${msg}</Message></Response>`, {
      headers: { 'Content-Type': 'text/xml' },
    })

  if (!from || !msgBody) return twimlResponse('')

  // Opt-out — mandatory TCPA compliance
  if (isOptOut(msgBody)) {
    // Update DB opt-out (fire-and-forget)
    if (env.NEON_DATABASE_URL) {
      fetch(`${env.NEON_DATABASE_URL}`, {}).catch(() => {})
      // Note: actual DB update handled by daily sync worker
    }
    console.log(`[SMS] Opt-out from ${from}`)
    return twimlResponse("Got it, you've been removed from our list. Have a great day!")
  }

  // Strong YES — send Calendly link directly
  if (isYes(msgBody)) {
    const calendly = env.CALENDLY_URL || 'https://calendly.com/webcrew/30min'
    return twimlResponse(`Great! Book a quick 15-min call here: ${calendly}`)
  }

  // General reply — Gemini handles it
  if (!env.GOOGLE_AI_API_KEY) {
    return twimlResponse(`Thanks for your reply! Book a quick call: ${env.CALENDLY_URL || 'webcrew.app'}`)
  }

  const context = `You are a friendly website sales rep for WebCrew texting a local business owner.
Be short (max 160 chars). Warm but direct.
If they show interest, offer to schedule a 15-min call via ${env.CALENDLY_URL || 'webcrew.app'}.
Never promise specific rankings. Max 3 sentences.`

  try {
    const reply = await geminiSMSReply(env, context, msgBody)
    return twimlResponse(reply || `Thanks! Let's connect: ${env.CALENDLY_URL || 'webcrew.app'}`)
  } catch (e: any) {
    console.error('[SMS webhook] Gemini error:', e.message)
    return twimlResponse(`Thanks for your reply! Let's chat: ${env.CALENDLY_URL || 'webcrew.app'}`)
  }
}

// ─── Main worker ──────────────────────────────────────────────────────────

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)
    const method = req.method

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    if (url.pathname === '/leads' && method === 'POST') {
      return handleLeadSubmission(req, env)
    }

    // Twilio inbound SMS webhook
    if (url.pathname === '/sms/reply' && method === 'POST') {
      return handleSMSWebhook(req, env)
    }

    if (url.pathname === '/health' && method === 'GET') {
      return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response('Not found', { status: 404 })
  },
}
