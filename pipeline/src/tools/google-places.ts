const NICHE_QUERIES: Record<string, string[]> = {
  hvac: ['HVAC contractor', 'air conditioning repair', 'heating repair'],
  plumbing: ['plumber', 'plumbing repair', 'drain cleaning'],
  restaurant: ['Indian restaurant', 'restaurant', 'diner'],
  medspa: ['med spa', 'medical spa', 'laser hair removal', 'botox clinic'],
  roofing: ['roofing contractor', 'roof repair', 'roofer'],
  dentist: ['dentist', 'dental clinic', 'dental office'],
  lawfirm: ['law firm', 'attorney', 'lawyer'],
  remodeling: ['home remodeling', 'kitchen remodeling', 'bathroom remodeling'],
  cleaning: ['house cleaning', 'cleaning service', 'maid service'],
  'junk-removal': ['junk removal', 'junk hauling', 'debris removal'],
  daycare: ['daycare', 'child care', 'preschool'],
  'auto-detailing': ['auto detailing', 'car detailing', 'mobile detailing'],
}

export interface PlaceLead {
  place_id: string
  name: string
  address: string
  phone?: string
  website?: string
  rating?: number
  review_count?: number
}

const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.nationalPhoneNumber',
  'places.websiteUri',
  'places.rating',
  'places.userRatingCount',
].join(',')

export async function searchPlaces(
  niche: string,
  location: string,
  maxResults = 20
): Promise<PlaceLead[]> {
  const queries = NICHE_QUERIES[niche] || [niche]
  const results: PlaceLead[] = []
  const seen = new Set<string>()

  for (const query of queries) {
    if (results.length >= maxResults) break

    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY!,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      body: JSON.stringify({
        textQuery: `${query} in ${location}`,
        maxResultCount: Math.min(20, maxResults - results.length),
      }),
    })

    const data = await res.json() as any

    if (data.error) {
      throw new Error(`Places API error: ${data.error.message}`)
    }

    for (const place of data.places || []) {
      if (seen.has(place.id)) continue
      seen.add(place.id)

      results.push({
        place_id: place.id,
        name: place.displayName?.text ?? '',
        address: place.formattedAddress ?? '',
        phone: place.nationalPhoneNumber,
        website: place.websiteUri,
        rating: place.rating,
        review_count: place.userRatingCount,
      })

      if (results.length >= maxResults) break
    }
  }

  return results
}
