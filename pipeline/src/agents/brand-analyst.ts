import { GoogleGenerativeAI } from '@google/generative-ai'
import { scrapeSite } from '../tools/firecrawl.js'
import type { Lead, BrandData, AgentResult } from '../types.js'

const genai = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)
// gemini-2.5-flash: free 1,500 req/day — fast JSON extraction
const model = genai.getGenerativeModel({ model: 'gemini-2.5-flash' })

const EXTRACTION_INSTRUCTIONS = `Extract structured brand data from this business website. Return valid JSON only, no markdown fences, no explanation.

Return this exact JSON shape:
{
  "name": "business name",
  "tagline": "slogan if any",
  "phone": "phone number",
  "email": "email if found",
  "address": "full address",
  "services": ["service1", "service2"],
  "tone": "professional|friendly|urgent|luxury",
  "unique_selling_points": ["usp1", "usp2"],
  "years_in_business": 0,
  "license": "license number if any",
  "service_areas": ["city1", "city2"],
  "google_rating": "4.8",
  "review_count": "150",
  "testimonials": [
    {"name": "Customer Name", "text": "review text", "rating": 5}
  ]
}

Rules:
- Use null for missing fields, never invent data
- testimonials: only include if real quotes exist on the page
- service_areas: cities/neighborhoods explicitly mentioned
- tone: judge from copy style`

export async function runBrandAnalystAgent(lead: Lead): Promise<AgentResult<Lead>> {
  console.log(`[BrandAnalyst] Analyzing ${lead.name}`)

  try {
    // No website → skip Firecrawl, build brand data from Google Places fields only
    if (!lead.website) {
      const brandData: BrandData = {
        name:    lead.name,
        phone:   lead.phone,
        address: lead.address,
        services: [],
        tone: 'professional',
      }
      console.log(`[BrandAnalyst] ${lead.name} — no website, using Places data only`)
      return { success: true, data: { ...lead, brand_data: brandData, status: 'analyzed' } }
    }

    const content = await scrapeSite(lead.website)

    if (!content) {
      const brandData: BrandData = {
        name:    lead.name,
        phone:   lead.phone,
        address: lead.address,
        services: [],
      }
      return { success: true, data: { ...lead, brand_data: brandData, status: 'analyzed' } }
    }

    const result = await model.generateContent(
      `${EXTRACTION_INSTRUCTIONS}\n\nWebsite content:\n${content.slice(0, 8000)}`
    )

    const text = result.response.text()
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in Gemini response')

    const brandData: BrandData = JSON.parse(jsonMatch[0])

    return {
      success: true,
      data: { ...lead, brand_data: brandData, status: 'analyzed' },
    }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}
