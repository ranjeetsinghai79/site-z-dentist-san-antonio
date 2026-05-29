const NICHE_LABEL: Record<string, string> = {
  hvac:           'HVAC & Air Conditioning',
  roofing:        'Roofing',
  plumbing:       'Plumbing',
  dentist:        'Dental',
  medspa:         'Med Spa',
  lawfirm:        'Law',
  cleaning:       'Cleaning',
  'auto-detailing':'Auto Detailing',
  'junk-removal': 'Junk Removal',
  daycare:        'Daycare',
  remodeling:     'Remodeling',
  restaurant:     'Restaurant',
}

export async function sendOutreachSMS(params: {
  to: string
  businessName: string
  demoUrl: string
  niche: string
}): Promise<boolean> {
  const sid   = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const from  = process.env.TWILIO_FROM_NUMBER

  if (!sid || !token || !from) return false

  const { to, businessName, demoUrl, niche } = params
  const nicheLabel = NICHE_LABEL[niche] || niche

  // Strip non-digit chars, add US country code if needed
  const digits = to.replace(/\D/g, '')
  const e164   = digits.startsWith('1') ? `+${digits}` : `+1${digits}`

  const body = `Hi! I built a free ${nicheLabel} website for ${businessName}. See it live: ${demoUrl}\n\nStarting at $49/mo — reply STOP to opt out.`

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ To: e164, From: from, Body: body }).toString(),
    }
  )

  const data = await res.json() as any
  if (!res.ok) {
    console.warn('[SMS] Twilio error:', data?.message)
    return false
  }

  console.log(`[SMS] Sent to ${e164}: SID ${data.sid}`)
  return true
}
