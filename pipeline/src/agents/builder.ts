import { createRepoFromTemplate, updateFile, uploadBinaryFile, setRepoSecret } from '../tools/github.js'
import type { Lead, PipelineConfig, AgentResult } from '../types.js'
import type { HeroImages } from './image-generator.js'

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
}

const NICHE_TEMPLATE_DIR: Record<string, string> = {
  hvac: 'templates/hvac',
  roofing: 'templates/roofing',
  dentist: 'templates/dentist',
  medspa: 'templates/medspa',
  lawfirm: 'templates/lawfirm',
  remodeling: 'templates/remodeling',
  cleaning: 'templates/cleaning',
  'junk-removal': 'templates/junk-removal',
  daycare: 'templates/daycare',
  'auto-detailing': 'templates/auto-detailing',
  restaurant:          'templates/restaurant',
  'luxury-realestate': 'templates/luxury-realestate',
}

function buildDeployWorkflow(templateDir: string, projectName: string): string {
  return `name: Deploy to Cloudflare Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install deps
        run: npm install --legacy-peer-deps
      - name: Build
        run: npm run build --workspace=${templateDir}
      - name: Remove files exceeding CF Pages 25 MiB limit
        run: find ${templateDir}/out -size +24M -delete 2>/dev/null || true
      - name: Deploy
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy ${templateDir}/out --project-name=${projectName} --commit-dirty=true
`
}

export async function runBuilderAgent(
  lead: Lead,
  config: PipelineConfig,
  heroImages?: HeroImages | null,
  heroVideoBuffer?: Buffer | null
): Promise<AgentResult<Lead>> {
  console.log(`[Builder] Creating repo for ${lead.name}`)

  const repoName = `site-${slugify(lead.name)}`
  const templateDir = NICHE_TEMPLATE_DIR[config.niche] || `templates/${config.niche}`
  const configPath = `${templateDir}/src/lib/config.ts`

  try {
    const repo = await createRepoFromTemplate({
      templateOwner: config.templateOwner,
      templateRepo: config.templateRepo,
      newOwner: config.deployOwner,
      newRepoName: repoName,
    })

    if (!repo) return { success: false, error: 'Failed to create repo from template' }

    const updated = await updateFile({
      owner: config.deployOwner,
      repo: repoName,
      path: configPath,
      content: lead.config_ts!,
      message: `Configure for ${lead.name}`,
    })

    if (!updated) return { success: false, error: `Failed to update ${configPath}` }

    // Upload 4 AI hero images
    if (heroImages) {
      const keys = ['hero-1', 'hero-2', 'hero-3', 'hero-4'] as const
      for (const key of keys) {
        const buf = heroImages[key]
        if (!buf) continue
        const imgOk = await uploadBinaryFile({
          owner: config.deployOwner,
          repo: repoName,
          path: `${templateDir}/public/${key}.jpg`,
          buffer: buf,
          message: `feat: AI hero image ${key}`,
        })
        if (!imgOk) console.warn(`[Builder] ${key} upload failed`)
      }
      console.log(`[Builder] Hero images uploaded`)
    }

    // Upload hero background video (luxury-realestate + any niche with video gen enabled)
    if (heroVideoBuffer) {
      const vidOk = await uploadBinaryFile({
        owner: config.deployOwner,
        repo: repoName,
        path: `${templateDir}/public/hero-bg.mp4`,
        buffer: heroVideoBuffer,
        message: 'feat: AI hero background video',
      })
      if (vidOk) {
        console.log(`[Builder] Hero video uploaded ✓`)
      } else {
        console.warn(`[Builder] Hero video upload failed`)
      }
    }

    // Add GitHub Actions workflow for Cloudflare Pages deployment (no GitHub App needed)
    const projectName = repoName
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 63)

    // Set CF secrets BEFORE pushing workflow (workflow triggers immediately on push)
    const cfToken = process.env.CLOUDFLARE_TOKEN
    const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID
    if (cfToken && cfAccountId) {
      await Promise.all([
        setRepoSecret({ owner: config.deployOwner, repo: repoName, secretName: 'CLOUDFLARE_API_TOKEN', secretValue: cfToken }),
        setRepoSecret({ owner: config.deployOwner, repo: repoName, secretName: 'CLOUDFLARE_ACCOUNT_ID', secretValue: cfAccountId }),
      ])
      console.log(`[Builder] CF secrets set on ${repoName} ✓`)
    } else {
      console.warn('[Builder] CF creds not set — workflow will fail until secrets added manually')
    }

    // Push workflow AFTER secrets are set so first run can authenticate
    const workflowContent = buildDeployWorkflow(templateDir, projectName)
    await updateFile({
      owner: config.deployOwner,
      repo: repoName,
      path: '.github/workflows/deploy.yml',
      content: workflowContent,
      message: 'ci: Cloudflare Pages deploy via Wrangler',
    })

    return {
      success: true,
      data: {
        ...lead,
        github_repo: repo.html_url,
        status: 'built',
        // Store templateDir so deployer knows which rootDirectory to set
        brand_data: { ...lead.brand_data!, _templateDir: templateDir } as any,
      },
    }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}
