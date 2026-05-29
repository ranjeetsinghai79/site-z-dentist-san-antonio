/**
 * sms-outreach.ts
 *
 * Sends personalized outreach SMS to qualified leads after site is deployed.
 * Two tiers, two message styles:
 *   Tier 1 (no website)   → impulse close, show demo, $299 price
 *   Tier 2 (bad website)  → upgrade pitch, show score, $500-999 price
 *
 * Safety:
 *   - Skips leads with sms_opt_out=true
 *   - Skips leads already sms_sent=true
 *   - Dry-run mode logs without sending
 *   - Rate: 1 SMS per lead, 1s delay between sends
 *
 * Run:
 *   npx tsx src/scripts/send-outreach.ts
 *
 * Env:
 *   TWILIO_ACCOUNT_SID   AC...
 *   TWILIO_AUTH_TOKEN    ...
 *   TWILIO_FROM_NUMBER   +1XXXXXXXXXX
 *   SMS_DRY_RUN=true     (default false)
 */

import type { Lead, AgentResult } from '../types.js'

const DRY_RUN = process.env.SMS_DRY_RUN === 'true' || process.env.DRY_RUN === 'true'

// ─── Twilio client (lazy init) ────────────────────────────────────────────────

let _twilio: any = null

async function getTwilio() {
  if (_twilio) return _twilio
  const sid   = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  if (!sid || !token) {
    throw new Error('TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN not set in .env')
  }
  const { default: twilio } = await import('twilio')
  _twilio = twilio(sid, token)
  return _twilio
}

// ─── Message templates ────────────────────────────────────────────────────────

function buildMessage(lead: Lead): string {
  const firstName = lead.name.split(' ')[0]  // "Rodriguez Auto Detailing" → "Rodriguez"
  const tier = lead.tier ?? (lead.website ? 'tier2' : 'tier1')
  const demoUrl = lead.vercel_url ?? lead.cloudflare_url ?? ''

  if (!demoUrl) {
    throw new Error(`No demo URL for ${lead.name} — deploy first`)
  }

  if (tier === 'tier1') {
    // No website — impulse close
    return [
      `Hi, I built a free website demo for ${lead.name}.`,
      `Check it out: ${demoUrl}`,
      `Own it for $299 one-time. Hosting $49/mo.`,
      `Reply YES and it goes live today. Reply STOP to opt out.`,
    ].join('\n')
  }

  // Tier 2 — bad website upgrade pitch
  const score = lead.site_score ? ` (scored ${lead.site_score}/100 on Google)` : ''
  const domain = lead.website ? new URL(lead.website).hostname : 'your site'
  return [
    `Hi, I noticed ${domain}${score} could be costing you customers.`,
    `Built what it should look like: ${demoUrl}`,
    `Full upgrade $599 — looks completely different.`,
    `Reply YES to talk. Reply STOP to opt out.`,
  ].join('\n')
}

// ─── Send single SMS ──────────────────────────────────────────────────────────

export async function sendSMS(to: string, body: string): Promise<{ sid: string }> {
  const from = process.env.TWILIO_FROM_NUMBER
  if (!from) throw new Error('TWILIO_FROM_NUMBER not set')

  if (DRY_RUN) {
    console.log(`[SMS DRY-RUN] → ${to}`)
    console.log(`  ${body.replace(/\n/g, '\n  ')}`)
    return { sid: 'dry-run' }
  }

  const client = await getTwilio()
  const msg = await client.messages.create({ to, from, body })
  return { sid: msg.sid }
}

// ─── Outreach agent (pipeline integration) ───────────────────────────────────

export async function runSMSOutreachAgent(lead: Lead): Promise<AgentResult<Lead>> {
  // Guard: must have demo URL
  const demoUrl = lead.vercel_url ?? lead.cloudflare_url
  if (!demoUrl) {
    return { success: false, error: 'No deployed URL — run deployer first' }
  }

  // Guard: must have phone
  if (!lead.phone) {
    console.log(`[SMS] ${lead.name} — no phone, skip`)
    return { success: true, data: { ...lead } }
  }

  // Guard: opt-out
  if (lead.sms_opt_out) {
    console.log(`[SMS] ${lead.name} — opted out, skip`)
    return { success: true, data: { ...lead } }
  }

  // Guard: already sent
  if (lead.sms_sent) {
    console.log(`[SMS] ${lead.name} — already sent (${lead.sms_sent_at}), skip`)
    return { success: true, data: { ...lead } }
  }

  try {
    const message = buildMessage(lead)
    console.log(`[SMS] Sending to ${lead.name} (${lead.phone})...`)

    const { sid } = await sendSMS(lead.phone, message)
    const sentAt = new Date().toISOString()

    console.log(`  ✓ Sent — SID: ${sid}`)

    return {
      success: true,
      data: {
        ...lead,
        sms_sent: true,
        sms_sent_at: sentAt,
        status: 'sms_sent',
      },
    }
  } catch (e: any) {
    console.error(`[SMS] Failed for ${lead.name}: ${e.message}`)
    return { success: false, error: e.message }
  }
}
