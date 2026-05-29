import { searchPlaces } from '../tools/google-places.js'
import type { Lead, PipelineConfig, AgentResult } from '../types.js'

// ─── Lead qualification tiers ─────────────────────────────────────────────
//
// Tier 1 (BEST): no website at all           → auto-qualify, skip scorer
// Tier 2 (GOOD): has website + phone/email   → score it, replace if bad
// Tier 3 (SKIP): has good website            → site-scorer will skip
//
// Missing contact info handling:
//   phone only   → SMS outreach
//   email only   → email outreach
//   both         → email + SMS
//   neither      → build site, flag status='manual_outreach'

export async function runLeadHunterAgent(
  config: PipelineConfig
): Promise<AgentResult<Lead[]>> {
  console.log(`[LeadHunter] Searching: ${config.niche} in ${config.location}`)

  try {
    const places = await searchPlaces(config.niche, config.location, config.count * 2) // fetch 2x — scorer will thin

    const leads: Lead[] = []
    const seen = new Set<string>()

    for (const p of places) {
      if (seen.has(p.place_id)) continue
      seen.add(p.place_id)

      const hasPhone   = !!p.phone
      const hasWebsite = !!p.website

      // Skip: no contact AND no website — can't outreach, no value
      // Still include if has phone (can SMS) even with no website
      if (!hasPhone && !hasWebsite) {
        console.log(`  [skip] ${p.name} — no phone, no website`)
        continue
      }

      leads.push({
        place_id: p.place_id,
        name:     p.name,
        phone:    p.phone,
        email:    undefined,           // enriched later via brand-analyst scrape
        website:  p.website,
        address:  p.address,
        city:     config.city,
        state:    config.state,
        niche:    config.niche,
        status:   'found',
      })
    }

    // Tier 1 first (no website = auto-qualify, highest priority)
    leads.sort((a, b) => {
      const aScore = a.website ? 1 : 0
      const bScore = b.website ? 1 : 0
      return aScore - bScore // no-website floats to top
    })

    console.log(`[LeadHunter] ${leads.length} leads found`)
    console.log(`  No website (tier 1): ${leads.filter(l => !l.website).length}`)
    console.log(`  Has website (tier 2): ${leads.filter(l => l.website).length}`)

    return { success: true, data: leads.slice(0, config.count) }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}
