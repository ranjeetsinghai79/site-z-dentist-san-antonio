import { seal } from 'tweetsodium'

const BASE = 'https://api.github.com'

function headers() {
  return {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
  }
}

// ── GitHub Actions secret helpers ──────────────────────────────────────────

async function getRepoPublicKey(owner: string, repo: string): Promise<{ key_id: string; key: string } | null> {
  const res = await fetch(
    `${BASE}/repos/${owner}/${repo}/actions/secrets/public-key`,
    { headers: headers() }
  )
  if (!res.ok) {
    console.error('[GitHub] get public key failed:', await res.text())
    return null
  }
  return res.json() as any
}

export async function setRepoSecret(params: {
  owner: string
  repo: string
  secretName: string
  secretValue: string
}): Promise<boolean> {
  const pk = await getRepoPublicKey(params.owner, params.repo)
  if (!pk) return false

  const keyBytes = Buffer.from(pk.key, 'base64')
  const msgBytes = Buffer.from(params.secretValue, 'utf8')
  const encrypted = Buffer.from(seal(msgBytes, keyBytes)).toString('base64')

  const res = await fetch(
    `${BASE}/repos/${params.owner}/${params.repo}/actions/secrets/${params.secretName}`,
    {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({ encrypted_value: encrypted, key_id: pk.key_id }),
    }
  )
  if (!res.ok && res.status !== 204) {
    console.error('[GitHub] set secret failed:', await res.text())
    return false
  }
  return true
}

export async function createRepoFromTemplate(params: {
  templateOwner: string
  templateRepo: string
  newOwner: string
  newRepoName: string
}): Promise<{ html_url: string } | null> {
  // Check if repo already exists — reuse it
  const existsRes = await fetch(
    `${BASE}/repos/${params.newOwner}/${params.newRepoName}`,
    { headers: headers() }
  )
  if (existsRes.ok) {
    const existing = await existsRes.json() as any
    console.log(`[GitHub] reusing existing repo: ${existing.html_url}`)
    return { html_url: existing.html_url }
  }

  const res = await fetch(
    `${BASE}/repos/${params.templateOwner}/${params.templateRepo}/generate`,
    {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        owner: params.newOwner,
        name: params.newRepoName,
        description: `Website for ${params.newRepoName}`,
        private: false,
        include_all_branches: false,
      }),
    }
  )

  if (!res.ok) {
    console.error('[GitHub] create repo failed:', await res.text())
    return null
  }

  const data = await res.json() as any
  await new Promise(r => setTimeout(r, 4000))
  return { html_url: data.html_url }
}

export async function uploadBinaryFile(params: {
  owner: string
  repo: string
  path: string
  buffer: Buffer
  message: string
}): Promise<boolean> {
  const getRes = await fetch(
    `${BASE}/repos/${params.owner}/${params.repo}/contents/${params.path}`,
    { headers: headers() }
  )
  const sha = getRes.ok ? (await getRes.json() as any).sha : undefined

  const putRes = await fetch(
    `${BASE}/repos/${params.owner}/${params.repo}/contents/${params.path}`,
    {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({
        message: params.message,
        content: params.buffer.toString('base64'),
        ...(sha ? { sha } : {}),
      }),
    }
  )
  if (!putRes.ok) {
    console.error('[GitHub] upload binary failed:', await putRes.text())
    return false
  }
  return true
}

export async function updateFile(params: {
  owner: string
  repo: string
  path: string
  content: string
  message: string
}): Promise<boolean> {
  const getRes = await fetch(
    `${BASE}/repos/${params.owner}/${params.repo}/contents/${params.path}`,
    { headers: headers() }
  )

  const sha = getRes.ok ? (await getRes.json() as any).sha : undefined

  const putRes = await fetch(
    `${BASE}/repos/${params.owner}/${params.repo}/contents/${params.path}`,
    {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({
        message: params.message,
        content: Buffer.from(params.content).toString('base64'),
        ...(sha ? { sha } : {}),
      }),
    }
  )

  if (!putRes.ok) {
    console.error('[GitHub] upsert file failed:', await putRes.text())
    return false
  }

  return true
}
