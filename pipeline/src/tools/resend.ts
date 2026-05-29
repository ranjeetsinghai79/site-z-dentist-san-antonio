const NICHE_LABEL: Record<string, string> = {
  hvac:           'HVAC & Air Conditioning',
  roofing:        'Roofing',
  plumbing:       'Plumbing',
  dentist:        'Dental',
  medspa:         'Med Spa',
  lawfirm:        'Law Firm',
  cleaning:       'Cleaning',
  'auto-detailing':'Auto Detailing',
  'junk-removal': 'Junk Removal',
  daycare:        'Daycare',
  remodeling:     'Home Remodeling',
  restaurant:     'Restaurant',
}

export async function sendOutreachEmail(params: {
  to: string
  businessName: string
  demoUrl: string
  niche: string
}): Promise<boolean> {
  const { to, businessName, demoUrl, niche } = params
  const nicheLabel = NICHE_LABEL[niche] || niche
  const fromEmail  = process.env.OUTREACH_FROM_EMAIL || 'hello@webcrew.dev'

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your new website is ready</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Header -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;">
    <tr><td align="center" style="padding:40px 20px 0;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:16px 16px 0 0;padding:36px 40px 28px;border:1px solid rgba(255,255,255,0.08);border-bottom:none;">
            <p style="margin:0 0 8px;color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:3px;text-transform:uppercase;">Built specifically for</p>
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.5px;line-height:1.2;">${businessName}</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.45);font-size:14px;">${nicheLabel} · Professional Website</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>

  <!-- Body -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;">
    <tr><td align="center" style="padding:0 20px 40px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Preview card -->
        <tr>
          <td style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-top:none;padding:32px 40px;">
            <p style="margin:0 0 20px;color:rgba(255,255,255,0.7);font-size:16px;line-height:1.6;">
              Hi there — I noticed <strong style="color:#fff;">${businessName}</strong> could be getting a lot more customers online.
              I took the liberty of building you a brand-new ${nicheLabel.toLowerCase()} website. It's live right now — no strings attached.
            </p>

            <!-- Big CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:28px 0;">
              <tr>
                <td style="background:linear-gradient(135deg,#f97316,#ea580c);border-radius:12px;">
                  <a href="${demoUrl}" style="display:block;padding:18px 40px;color:#ffffff;text-decoration:none;font-size:17px;font-weight:700;letter-spacing:-0.2px;text-align:center;">
                    👀 &nbsp;View ${businessName}'s New Website
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 6px;color:rgba(255,255,255,0.45);font-size:12px;text-align:center;">
              ${demoUrl}
            </p>
          </td>
        </tr>

        <!-- What's included -->
        <tr>
          <td style="background:#0f172a;border:1px solid rgba(255,255,255,0.08);border-top:none;padding:32px 40px;">
            <p style="margin:0 0 20px;color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:3px;text-transform:uppercase;">What's included</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              ${[
                ['⚡', 'Lightning-fast', 'Loads in under 1 second on mobile'],
                ['📱', 'Mobile-first design', 'Looks perfect on every screen'],
                ['🔍', 'SEO-optimized', 'Built to rank on Google for local searches'],
                ['⭐', 'Review showcase', 'Displays your Google ratings prominently'],
                ['📞', 'Click-to-call', 'One tap to call from any device'],
                ['🔒', 'Free SSL & hosting', 'Secure, always-on, globally distributed'],
              ].map(([icon, title, desc]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="padding-right:14px;font-size:20px;vertical-align:top;">${icon}</td>
                    <td>
                      <strong style="color:#fff;font-size:14px;display:block;">${title}</strong>
                      <span style="color:rgba(255,255,255,0.45);font-size:13px;">${desc}</span>
                    </td>
                  </tr></table>
                </td>
              </tr>`).join('')}
            </table>
          </td>
        </tr>

        <!-- Pricing -->
        <tr>
          <td style="background:linear-gradient(135deg,rgba(249,115,22,0.12),rgba(234,88,12,0.06));border:1px solid rgba(249,115,22,0.3);border-top:none;padding:32px 40px;">
            <p style="margin:0 0 20px;color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:3px;text-transform:uppercase;">Simple pricing</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                  <table cellpadding="0" cellspacing="0" width="100%"><tr>
                    <td style="color:rgba(255,255,255,0.7);font-size:15px;">Monthly plan</td>
                    <td align="right"><span style="color:#fb923c;font-size:22px;font-weight:800;">$197<span style="font-size:13px;font-weight:400;color:rgba(255,255,255,0.4)">/mo</span></span></td>
                  </tr></table>
                  <p style="margin:6px 0 0;color:rgba(255,255,255,0.4);font-size:12px;">Hosting, SSL, updates, monthly SEO report, Google review replies</p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0;">
                  <table cellpadding="0" cellspacing="0" width="100%"><tr>
                    <td style="color:rgba(255,255,255,0.7);font-size:15px;">Custom domain setup</td>
                    <td align="right"><span style="color:#fff;font-size:16px;font-weight:700;">$0</span></td>
                  </tr></table>
                  <p style="margin:6px 0 0;color:rgba(255,255,255,0.4);font-size:12px;">We connect your domain (or help you get one for ~$10/yr)</p>
                </td>
              </tr>
            </table>
            <p style="margin:20px 0 0;color:rgba(255,255,255,0.45);font-size:13px;line-height:1.6;">
              No setup fees. No contracts. Cancel any time. Your site, your brand — we just keep it running and growing.
            </p>
          </td>
        </tr>

        <!-- CTA footer -->
        <tr>
          <td style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-top:none;border-radius:0 0 16px 16px;padding:32px 40px;">
            <p style="margin:0 0 20px;color:rgba(255,255,255,0.7);font-size:15px;line-height:1.6;">
              Reply to this email or call — I'll have it live on your domain within 24 hours.
            </p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#1e293b;border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:14px 28px;">
                  <a href="${demoUrl}" style="color:#fb923c;text-decoration:none;font-size:14px;font-weight:600;">
                    View your site →
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:28px 0 0;color:rgba(255,255,255,0.3);font-size:12px;line-height:1.6;">
              You received this because we build free demo websites for ${nicheLabel.toLowerCase()} businesses in your area.<br>
              To unsubscribe, reply "no thanks" and we'll remove you immediately.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      subject: `Your new ${nicheLabel} website is live — built for ${businessName}`,
      html,
    }),
  })

  return res.ok
}
