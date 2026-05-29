export async function appendSheetRow(params: {
  spreadsheetId: string
  sheetName: string
  values: string[]
}): Promise<boolean> {
  const token = await getAccessToken()
  if (!token) return false

  const range = `${params.sheetName}!A1`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${params.spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [params.values] }),
  })

  if (!res.ok) {
    console.error('[Sheets] append failed:', await res.text())
    return false
  }
  return true
}

async function loadServiceAccount(): Promise<any | null> {
  // Prefer JSON string in env, fall back to file path
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try { return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON) } catch { return null }
  }
  if (process.env.GOOGLE_SERVICE_ACCOUNT_FILE) {
    const { readFileSync } = await import('fs')
    const { resolve } = await import('path')
    try { return JSON.parse(readFileSync(resolve(process.env.GOOGLE_SERVICE_ACCOUNT_FILE), 'utf8')) } catch { return null }
  }
  return null
}

async function getAccessToken(): Promise<string | null> {
  const sa = await loadServiceAccount()
  if (!sa) {
    console.error('[Sheets] No service account — set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_FILE')
    return null
  }

  const now = Math.floor(Date.now() / 1000)

  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })).toString('base64url')

  const { createSign } = await import('crypto')
  const sign = createSign('RSA-SHA256')
  sign.update(`${header}.${payload}`)
  const signature = sign.sign(sa.private_key, 'base64url')

  const jwt = `${header}.${payload}.${signature}`

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  })

  const tokenData = await tokenRes.json() as any
  return tokenData.access_token || null
}
