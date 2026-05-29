# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

AI Employee pipeline for local businesses. Two systems:

1. **Pipeline** — finds businesses with bad websites, scrapes their brand, generates a config, forks a template repo, deploys to Cloudflare Pages (free, unlimited sites), sends outreach email. Fully automated, zero human steps.
2. **Templates** — 11 niche-specific Next.js sites (hvac, roofing, dentist, medspa, lawfirm, remodeling, cleaning, junk-removal, daycare, auto-detailing, restaurant). Config-driven: swap `src/lib/config.ts` and the site is a different business.

## Commands

```bash
# Pipeline (run from monorepo root)
npm run pipeline:dry          # dry-run (no GitHub/Cloudflare/email)
npm run pipeline              # live run
npm run retention --workspace=pipeline  # run GBP + reviews + analytics agents

# Individual template dev servers
npm run dev:hvac
npm run dev:roofing
npm run dev:dentist
# ... dev:<niche> for any of the 11 niches

# Pipeline TypeScript check
cd pipeline && node_modules/.bin/tsc --noEmit

# Test DB connection
cd pipeline && npx tsx src/scripts/test-db.ts
```

## Pipeline Architecture

`pipeline/src/orchestrator.ts` drives 10 sequential agents per lead:

```
lead-hunter    → Google Places API → finds businesses without/bad websites
site-scorer    → PageSpeed API → skips if mobile score ≥ 60 or < 2 issues
brand-analyst  → Firecrawl scrape + Gemini → extracts BrandData JSON
niche-brain    → Gemini → unique NicheProfile (visual style, cinematic prompts, uniqueness signature)
config-gen     → Gemini → generates TypeScript config.ts for the template
image-gen      → fal.ai Flux Pro 1.1 → 4 unique hero images (brain-powered prompts, parallel)
video-gen      → Kling 1.6 Pro via fal.ai → 5s cinematic hero background video
builder        → GitHub API → forks repo, writes config + uploads images + video
deployer       → Cloudflare Pages API → creates project, polls until deployed
seo-agent      → generates sitemap.xml, robots.txt, schema JSON-LD
outreach       → Resend email + Twilio SMS with demo link
stripe-agent   → creates Stripe payment link (ready when lead responds)
```

`Lead.status` full lifecycle:
`found → scored → analyzed → config_generated → built → deployed → outreach_sent → sms_sent → conversation_active → meeting_scheduled → payment_link_sent → paid → handed_off`

Leads with `status: 'skipped'` had good sites. Every step persists to Neon Postgres.

### Scale: Queue Worker (10-100 sites/day)

```bash
npm run worker:enqueue   # scan Google Maps + enqueue leads
npm run worker           # start N parallel workers (WORKER_CONCURRENCY=3)
npm run worker:status    # print queue depth
npm run worker:requeue   # retry stale leads
```

Uses `pg-boss` (Postgres-backed queue on Neon). `WORKER_CONCURRENCY` env controls parallelism.
Rate limits: Gemini 500 req/day free, fal.ai $0.04/img, Kling $0.05/video → ~$0.25/site total.

**Retention agents** (`pipeline/src/retention.ts`, run separately):
- `seo-agent` — generates sitemap.xml, robots.txt, schema JSON-LD, keyword list
- `gbp-agent` — posts weekly update to Google Business Profile via GMB API
- `reviews-agent` — fetches unanswered Google reviews, posts Gemini-generated replies
- `analytics-agent` — queries GSC for 28-day data, emails weekly summary to client
- `leads-agent` — handles contact form submissions → Neon + Google Sheets + Resend notify
- `video-agent` — Remotion 15s MP4 outreach video (install `@remotion/bundler @remotion/renderer remotion` first)

## Template Architecture

Every template follows the same structure:
```
templates/<niche>/
  src/lib/config.ts          ← THE ONLY FILE that changes per client
  src/app/globals.css        ← @theme block with all CSS vars
  src/components/            ← nav, hero, services, why-us, reviews,
                                service-areas, contact, footer
  src/app/api/leads/route.ts ← POSTs to PIPELINE_API_URL/leads
```

**Design rules:**
- Tailwind v4 with `@theme {}` — ALL colors are CSS vars (`var(--color-*)`) never Tailwind color classes like `bg-green-500`
- GSAP only — no Framer Motion. Use `gsap.timeline()` for entrance sequences, `ScrollTrigger` for scroll-driven effects
- `EASE = [0.25, 0.46, 0.45, 0.94]` (or `"power3.out"`) everywhere for cinematic feel
- `next/link` is NOT used — plain `<a>` tags only
- Font weights `font-700`, `font-800`, `font-900` work as Tailwind utilities in v4

## Animation & UX Requirements (Draftly-standard)

Every template must implement ALL of the following. These are non-negotiable for award-winning feel.

### 1. Cinematic Loading Screen (`loading-screen.tsx`)
- Dark bg using `--brand-bg` gradient + aurora blobs
- Business name fades in → tagline fades in → progress bar fills → overlay slides up (yPercent: -100)
- Blocks body scroll (`overflow: hidden`) until complete
- Reference: `templates/hvac/src/components/loading-screen.tsx`

### 2. Scroll Progress Bar (`scroll-progress.tsx`)
- Fixed 2px bar at top of viewport
- Uses CSS var `--scroll-pct` driven by JS scroll listener
- Gradient: `--brand-accent` → `--brand-accent-light` with glow
- Reference: `templates/hvac/src/components/scroll-progress.tsx`

### 3. Lenis Smooth Inertia Scroll (`smooth-scroll.tsx`)
- `lerp: 0.1`, `smoothWheel: true`
- Must call `ScrollTrigger.update` on every Lenis scroll tick
- Already implemented — don't remove

### 4. GSAP Entrance Timelines (Hero)
Every hero must chain: label → badge → headline words → paragraph → CTAs → trust badges
```ts
const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
tl.from(labelRef.current, { opacity: 0, y: -16, duration: 0.45 })
  .from(words, { yPercent: 110, opacity: 0, stagger: 0.045, duration: 0.75 }, "-=0.8")
  // ... continue chaining
```

### 5. Word-Split Headlines (ALL sections, not just hero)
Wrap headings in `<SplitText>` (word-wrap + word-inner pattern). Use `useTextReveal` hook:
```tsx
import { useTextReveal } from "@/hooks/use-text-reveal"
// in component:
useTextReveal(headingRef, { start: "top 85%" })
```
Reference: `templates/hvac/src/hooks/use-text-reveal.ts`

### 6. Multi-Layer Parallax (Hero)
Three speeds: background (yPercent: -25, scrub: 1.5), photo grid (yPercent: -15, scrub: 2), content fade (opacity → 0, scrub: 1)

### 7. Horizontal Pinned Scroll (Services)
Desktop only (matchMedia `min-width: 1024px`). Pin section, translate track by `-scrollWidth + vw`. Cards animate as they enter via `containerAnimation`. Mobile: standard vertical stagger.

### 8. GSAP quickTo 3D Tilt (Why-Us / Feature Cards)
```ts
const setRotX = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power2.out" })
const setRotY = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power2.out" })
gsap.set(card, { transformPerspective: 900, transformStyle: "preserve-3d" })
```
Dynamic box-shadow shifts with mouse position for depth illusion.

### 9. Staggered Card Entrances (ALL grid/card sections)
Use `useStaggerReveal` hook from `@/hooks/use-text-reveal`:
```tsx
useStaggerReveal(containerRef, ".service-card", { y: 48, scale: 0.95, stagger: 0.07 })
```

### 10. Particle Canvas (Hero background)
50 slow-moving dots, color from `--brand-particle` CSS var. Canvas resizes on window resize.

### 11. Aurora Blob Background (Hero + Loading Screen)
Two radial blobs using `--brand-blob-1` and `--brand-blob-2` with `filter: blur(80px)`. Animate with `@keyframes aurora-drift`.

### 12. Magnetic Cursor (`cursor.tsx`)
Custom cursor follows mouse with `lerp`. Already implemented — keep in all templates.

### 13. Premium Hover on ALL Interactive Elements
- Cards: `.hover-lift` class (translateY -6px + shadow on hover)
- Buttons: `.btn-primary` shimmer gradient animation (already in globals.css)
- Nav links: subtle accent underline slide-in
- Images: `scale(1.05)` on hover with `transition-transform duration-500`

### 14. Image Reveal Animation
Hero images and section images use `.img-reveal` wrapper. GSAP drives `clipPath: inset(0 100% 0 0)` → `inset(0 0% 0 0)` on scroll enter.

### 15. Scroll-Triggered Counter Animation (Stats)
Number counters animate from 0 to value when entering viewport. Use `gsap.to({ val: 0 }, { val: target, onUpdate: () => el.textContent = Math.round(obj.val) })`.

### 16. Section Entrance (every non-hero section)
All section headings/subheads use `useEntranceReveal` or `useTextReveal`. No section should just appear without animation.

---

### Animation Timing Reference
| Element | Duration | Ease | Delay |
|---------|----------|------|-------|
| Hero label | 0.45s | power3.out | 0 |
| Hero words | 0.75s | power3.out | stagger 0.045 |
| Hero para | 0.6s | power3.out | overlap |
| Section heading | 0.65s | power3.out | scroll |
| Cards stagger | 0.65s | power3.out | 0.07 per card |
| Loading bar | 1.1s | power2.inOut | after name |
| Loading exit | 0.75s | power4.inOut | after bar |
| 3D tilt | 0.4s | power2.out | mouse move |

**config.ts exports:** `BUSINESS`, `SERVICES`, `TESTIMONIALS`, `TRUST_BADGES` — all template components read only from these.

When adding a new niche template, also update:
- `pipeline/src/types.ts` — add to `PipelineConfig.niche` union
- `pipeline/src/agents/builder.ts` — add to `NICHE_TEMPLATE_DIR`
- `pipeline/src/agents/config-generator.ts` — add fallback services
- `package.json` root — add `dev:<niche>` script

## Key Files

| File | Purpose |
|------|---------|
| `pipeline/src/types.ts` | `Lead`, `BrandData`, `PipelineConfig`, `AgentResult<T>` — all shared types |
| `pipeline/src/orchestrator.ts` | Main pipeline loop, sequential agent chaining |
| `pipeline/src/run.ts` | Entry point, reads env vars into `PipelineConfig` |
| `pipeline/src/retention.ts` | Retention loop — GBP, reviews, analytics for deployed clients |
| `pipeline/src/db/supabase.ts` | DB layer — uses `pg` + `DATABASE_URL` (Neon Postgres, not Supabase) |
| `pipeline/src/db/schema.sql` | DB schema — run once to initialize |
| `pipeline/src/scripts/deps-tracker.ts` | Checks tracked deps via GitHub API |

## LLM

Pipeline uses **Gemini 2.5 Flash** (`@google/generative-ai`) — not Claude. Free tier: 1,500 req/day for brand extraction, 500 req/day for config generation. Key: `GOOGLE_AI_API_KEY`.

## Environment Variables

Required in `pipeline/.env` (see `pipeline/.env.example`):

```
GOOGLE_AI_API_KEY          # Gemini 2.5 Flash — brand analysis + config generation
GOOGLE_PLACES_API_KEY      # lead discovery + PageSpeed
FIRECRAWL_URL              # https://api.firecrawl.dev (cloud) or http://localhost:3002 (self-hosted)
FIRECRAWL_API_KEY          # firecrawl.dev API key, or "local" for self-hosted
GITHUB_TOKEN               # ranjeetsinghai79 classic PAT with repo scope
CLOUDFLARE_TOKEN           # API token with Pages:Edit permission
CLOUDFLARE_ACCOUNT_ID      # from dash.cloudflare.com → Workers & Pages sidebar
DATABASE_URL               # Neon Postgres connection string (neon.tech)
PIPELINE_API_URL           # hosted pipeline API URL (for contact form lead capture)
RESEND_API_KEY
OUTREACH_FROM_EMAIL        # e.g. hello@yourdomain.com
GOOGLE_SERVICE_ACCOUNT_JSON  # JSON blob for Sheets + GMB + GSC
GBP_ACCOUNT_ID / GBP_LOCATION_ID
LEADS_SHEET_ID
BUSINESS_OWNER_EMAIL

# Pipeline run config
NICHE=hvac                 # any of the 11 niche values
LOCATION=Tracy, CA
CITY=Tracy
STATE=CA
COUNT=10
DRY_RUN=true
TEMPLATE_OWNER=ranjeetsinghai79
TEMPLATE_REPO=websitedeveloper
DEPLOY_OWNER=ranjeetsinghai79
```

Deployed templates read `BUSINESS_NAME`, `BUSINESS_NICHE`, `PIPELINE_API_URL` from their Cloudflare Pages env.

## Google APIs Auth

Sheets, GMB (Google My Business), and GSC all use the same service account. Auth is JWT-based via `crypto.createSign('RSA-SHA256')` — no OAuth flow. Set `GOOGLE_SERVICE_ACCOUNT_JSON` to the full JSON blob from GCP Console → Service Accounts → Keys → JSON.

## Git Remotes

```
origin  → github.com/ranjeetsinghai79/websitedeveloper  (deploy account)
pavan   → github.com/pavankumarharati/websitedeveloper   (personal backup)
```

Push to both: `git push origin main && git push pavan main`

## Firecrawl

Cloud API only: `FIRECRAWL_URL=https://api.firecrawl.dev` + `FIRECRAWL_API_KEY` (free 500 scrapes/month at firecrawl.dev). Used only by `brand-analyst` agent — falls back to Google Places data if unavailable.
