import { sendOutreachEmail } from '../tools/resend.js'
import { sendOutreachSMS }   from '../tools/sms.js'
import type { Lead, AgentResult } from '../types.js'

export async function runOutreachAgent(lead: Lead): Promise<AgentResult<Lead>> {
  if (!lead.vercel_url) return { success: false, error: 'No demo URL' }
  if (!lead.email && !lead.phone) return { success: false, error: 'No email or phone' }

  const demoUrl  = `https://${lead.vercel_url}`
  const sentVia: string[] = []

  // Email outreach
  if (lead.email) {
    const ok = await sendOutreachEmail({
      to:           lead.email,
      businessName: lead.name,
      demoUrl,
      niche:        lead.niche,
    })
    if (ok) {
      sentVia.push('email')
      console.log(`[Outreach] Email → ${lead.email}`)
    } else {
      console.warn('[Outreach] Email failed')
    }
  }

  // SMS outreach (Twilio — only if env vars set)
  if (lead.phone && process.env.TWILIO_ACCOUNT_SID) {
    const ok = await sendOutreachSMS({
      to:           lead.phone,
      businessName: lead.name,
      demoUrl,
      niche:        lead.niche,
    })
    if (ok) sentVia.push('sms')
  }

  if (sentVia.length === 0) return { success: false, error: 'All outreach channels failed' }

  return {
    success: true,
    data: {
      ...lead,
      outreach_sent:    true,
      outreach_sent_at: new Date().toISOString(),
      status:           'outreach_sent',
    },
  }
}
