const BASE = 'https://api.cloudflare.com/client/v4'

function headers() {
  return {
    Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
    'Content-Type': 'application/json',
  }
}

export async function deployToCloudflarePages(params: {
  repoOwner: string
  repoName: string
  projectName: string
  templateDir: string
  envVars?: Record<string, string>
}): Promise<{ url: string } | null> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  if (!accountId) throw new Error('CLOUDFLARE_ACCOUNT_ID not set')

  const { projectName, envVars = {} } = params

  const cfEnvVars: Record<string, { value: string }> = {}
  for (const [k, v] of Object.entries(envVars)) {
    cfEnvVars[k] = { value: v }
  }

  // Create or verify project exists (no GitHub source — GH Actions deploys via Wrangler)
  const createRes = await fetch(`${BASE}/accounts/${accountId}/pages/projects`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      name: projectName,
      production_branch: 'main',
      deployment_configs: {
        production: {
          compatibility_date: '2024-09-23',
          compatibility_flags: ['nodejs_compat'],
          env_vars: Object.keys(cfEnvVars).length > 0 ? cfEnvVars : undefined,
        },
      },
    }),
  })

  if (!createRes.ok) {
    const err = await createRes.text()
    if (!err.includes('already exists') && !err.includes('taken')) {
      console.error('[Cloudflare] create project failed:', err)
      return null
    }
    console.log('[Cloudflare] project already exists, continuing')
  } else {
    console.log(`[Cloudflare] project "${projectName}" created ✓`)
  }

  // GH Actions triggered by the push in builder — wait up to 12 min for it to deploy
  // First delay: GH Actions cold start + build (~3-4 min)
  console.log('[Cloudflare] Waiting for GitHub Actions build (3 min)…')
  await new Promise(r => setTimeout(r, 3 * 60_000))

  // Poll until Pages shows a successful deployment (max 9 more min, 30s intervals)
  for (let i = 0; i < 18; i++) {
    const deploymentsRes = await fetch(
      `${BASE}/accounts/${accountId}/pages/projects/${projectName}/deployments`,
      { headers: headers() }
    )
    if (!deploymentsRes.ok) {
      console.warn('[Cloudflare] poll failed, retrying…')
      await new Promise(r => setTimeout(r, 30_000))
      continue
    }

    const deployments = (await deploymentsRes.json() as any).result as any[]
    const latest = deployments?.[0]
    const stage = latest?.latest_stage

    console.log(`  [Cloudflare] ${stage?.name ?? 'pending'} — ${stage?.status ?? 'waiting'}`)

    if (stage?.name === 'deploy' && stage?.status === 'success') {
      return { url: `https://${projectName}.pages.dev` }
    }
    if (stage?.status === 'failure') {
      console.error('[Cloudflare] deployment failed at stage:', stage?.name)
      return null
    }

    await new Promise(r => setTimeout(r, 30_000))
  }

  console.error('[Cloudflare] deployment timed out after 12 min')
  return null
}
