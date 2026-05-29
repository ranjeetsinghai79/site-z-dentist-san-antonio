export type ThemeName =
  | "navy"
  | "ember"
  | "ocean"
  | "forest"
  | "slate"
  | "dubai"
  | "noir"

export type NicheName =
  | "hvac"
  | "roofing"
  | "dentist"
  | "medspa"
  | "lawfirm"
  | "remodeling"
  | "cleaning"
  | "junk-removal"
  | "daycare"
  | "auto-detailing"
  | "restaurant"
  | "luxury-realestate"

export interface Business {
  name: string
  tagline: string
  phone: string
  phoneHref: string
  email: string
  address: string
  city: string
  serviceAreas: string[]
  since: string
  google_rating: string
  review_count: string
  license?: string
  emergency?: boolean
  whatsapp?: string
  social?: Record<string, string>
  theme: ThemeName
  niche: NicheName
}

export interface Service {
  icon: string
  title: string
  desc: string
  urgent?: boolean
}

export interface Testimonial {
  name: string
  location?: string
  role?: string
  stars: number
  text: string
}

export interface Stat {
  value: string | number
  label: string
  suffix?: string
  decimals?: number
}

export interface Reason {
  icon: string
  title: string
  desc: string
}

export interface Property {
  id: string
  title: string
  type: string
  location: string
  price: string
  beds: number
  baths: number
  area: string
  image: string
  badge?: string
}

export interface BrandStoryChapter {
  index: string
  label: string
  heading: string
  body: string
  bg: string
  fg: string
  items?: Array<{ n: string; title: string; desc: string }>
}

export interface SiteConfig {
  business: Business
  services?: Service[]
  testimonials?: Testimonial[]
  trustBadges?: string[]
  stats?: Stat[]
  reasons?: Reason[]
  properties?: Property[]
  brandStoryChapters?: BrandStoryChapter[]
  formServiceOptions?: string[]
}
