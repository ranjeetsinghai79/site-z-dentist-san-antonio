import { GoogleGenerativeAI } from '@google/generative-ai'
import type { Lead, AgentResult } from '../types.js'

const genai = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)
// gemini-2.5-flash: free 500 req/day — best free model for code generation
const model = genai.getGenerativeModel({
  model: 'gemini-2.5-flash',
  // @ts-ignore: thinkingConfig not in type defs yet
  generationConfig: { maxOutputTokens: 8192, temperature: 0.3, thinkingConfig: { thinkingBudget: 0 } },
  systemInstruction: `You are a local business website configurator. Apply these design principles:
TAGLINES: Short, punchy, present tense, max 6 words. Never start with "Welcome to". Never end with "?".
TRUST BADGES: Be specific — "NATE Certified" beats "Certified", "GAF Master Elite" beats "Licensed".
TESTIMONIALS: Real customer voice, specific detail (time/price/outcome), min 35 words, emotional hook.
Return ONLY valid TypeScript code. No markdown fences. No explanation.`,
})

const FALLBACK_SERVICES: Record<string, string[]> = {
  hvac:             ['AC Repair', 'Heating', 'Plumbing', 'Emergency Service', 'Maintenance', 'Installation'],
  roofing:          ['Roof Replacement', 'Storm Damage Repair', 'Insurance Claims', 'Emergency Tarping', 'Gutter Installation', 'Free Inspections'],
  dentist:          ['Teeth Whitening', 'Preventive Cleanings', 'Dental Implants', 'Invisalign', 'Emergency Dental', 'Cosmetic Dentistry'],
  medspa:           ['Botox & Fillers', 'Laser Hair Removal', 'HydraFacial', 'Chemical Peels', 'Microneedling', 'Body Contouring'],
  lawfirm:          ['Personal Injury', 'Family Law', 'Criminal Defense', 'Business Law', 'Estate Planning', 'Immigration Law'],
  remodeling:       ['Kitchen Remodel', 'Bathroom Renovation', 'Room Additions', 'Flooring', 'Deck & Outdoor', 'Full Home Renovation'],
  cleaning:         ['Deep Cleaning', 'Weekly / Bi-Weekly', 'Move In / Move Out', 'Commercial Cleaning', 'Post-Construction', 'Airbnb Turnover'],
  'junk-removal':   ['Furniture Removal', 'Appliance Removal', 'Estate Cleanouts', 'Construction Debris', 'Yard Debris', 'Same-Day Service'],
  daycare:          ['Infant Care', 'Toddler Program', 'Pre-K Curriculum', 'After-School Care', 'Summer Camp', 'Drop-In Care'],
  'auto-detailing': ['Ceramic Coating', 'Paint Correction', 'Full Detail Package', 'Interior Detail', 'PPF', 'Window Tinting'],
  restaurant:          ['Dine In', 'Takeout', 'Catering', 'Private Events', 'Delivery', 'Bar & Drinks'],
  plumbing:            ['Drain Cleaning', 'Water Heater', 'Leak Repair', 'Emergency Service', 'Pipe Repair', 'Fixture Install'],
  'luxury-realestate': ['Luxury Apartments', 'Penthouses', 'Villas', 'Commercial Properties', 'Off-Plan Investments', 'Property Management'],
}

// Deterministic theme assignment from business name (avoids all sites looking the same)
function pickTheme(name: string): string {
  const themes = ['navy', 'ember', 'ocean', 'forest', 'slate', 'noir']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff
  return themes[Math.abs(hash) % themes.length]
}

// Per-niche theme override (luxury-realestate → dubai is fixed; others use pickTheme)
const NICHE_FIXED_THEME: Record<string, string> = {
  'luxury-realestate': 'dubai',
}

const CONFIG_SCHEMA = `Generate a TypeScript config file. Output this exact structure:

import type { SiteConfig } from "@core/web/types"

export const config: SiteConfig = {
  business: {
    name: "...",
    tagline: "...",
    phone: "...",
    phoneHref: "tel:+1...",
    email: "...",
    address: "...",
    city: "...",
    serviceAreas: ["city1", "city2"],
    license: "...",
    since: "...",
    google_rating: "4.9",
    review_count: "200",
    emergency: true,
    theme: "navy",
    niche: "hvac",
  },

  services: [
    { icon: "thermometer", title: "...", desc: "One sentence.", urgent: false }
  ],

  testimonials: [
    { name: "...", location: "...", stars: 5, text: "..." }
  ],

  trustBadges: [
    "Licensed & Insured", "Same-Day Service", "5-Star Rated", "24/7 Emergency"
  ],

  stats: [
    { value: 4.9, label: "Google Rating", suffix: "★", decimals: 1 },
    { value: 1000, label: "Jobs Done", suffix: "+", decimals: 0 },
    { value: 15, label: "Yrs Experience", suffix: "+", decimals: 0 }
  ],

  reasons: [
    { icon: "clock",       title: "Fast Response",          desc: "..." },
    { icon: "dollar-sign", title: "Upfront Pricing",        desc: "..." },
    { icon: "award",       title: "Certified Pros",         desc: "..." },
    { icon: "thumbs-up",   title: "Satisfaction Guarantee", desc: "..." },
    { icon: "phone",       title: "AI Reception 24/7",      desc: "..." },
    { icon: "truck",       title: "Fully Equipped",         desc: "..." }
  ],

  formServiceOptions: ["..."]
}

// Backward-compat re-exports
export const BUSINESS = config.business
export const SERVICES = config.services!
export const TESTIMONIALS = config.testimonials!
export const TRUST_BADGES = config.trustBadges!

Rules:
- icon: one of thermometer | flame | droplets | zap | shield-check | wrench | star | heart | scissors | sparkles | clock | hammer | truck | home | briefcase | phone | award | dollar-sign | thumbs-up
- phone: (XXX) XXX-XXXX format
- phoneHref: tel:+1XXXXXXXXXX digits only
- theme: MUST be exactly the value provided below — do not change it
- niche: MUST be exactly the value provided below
- city: first part of address before comma
- 3–6 services, 3 testimonials, 4–6 trust badges, 3 stats, 6 reasons
- formServiceOptions: array of service titles
- testimonials use "stars" not "rating"
- since: string year`

export async function runConfigGeneratorAgent(lead: Lead): Promise<AgentResult<Lead>> {
  console.log(`[ConfigGenerator] Generating config for ${lead.name}`)

  const bd = lead.brand_data!
  const services = bd.services?.length ? bd.services : FALLBACK_SERVICES[lead.niche] || []

  try {
    const theme = NICHE_FIXED_THEME[lead.niche] ?? pickTheme(lead.name)

    const result = await model.generateContent(
      `${CONFIG_SCHEMA}\n\nBusiness data:\n${JSON.stringify(bd, null, 2)}\n\nServices: ${services.join(', ')}\nNiche: ${lead.niche}\nTheme to use: "${theme}" (set this exact value for the theme field)`
    )

    const configContent = result.response.text()

    // Validate not truncated — must have config export + backward-compat
    const required = ['export const config', 'business:', 'services:', 'testimonials:', 'trustBadges:']
    const missing = required.filter(k => !configContent.includes(k))
    if (missing.length > 0) {
      return { success: false, error: `Config truncated — missing: ${missing.join(', ')}` }
    }

    return {
      success: true,
      data: { ...lead, config_ts: configContent, status: 'config_generated' },
    }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}
