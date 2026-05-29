import type { SiteConfig } from "@core/web/types"

export const config: SiteConfig = {
  business: {
  city: "Tracy",
  theme: "ember",
  niche: "daycare",
  name: "Sunshine Sprouts Learning Center",
  tagline: "Where Little Minds Grow Big.",
  phone: "(555) 901-2345",
  phoneHref: "tel:+15559012345",
  email: "hello@sunshinesprouts.com",
  address: "Tracy, California",
  serviceAreas: ["Tracy", "Mountain House", "Manteca", "Lathrop", "Banta", "Stockton"],
  license: "CA Community Care Lic #901234",
  since: "2011",
  google_rating: "5.0",
  review_count: "189",
  emergency: false,
  social: { google: "https://google.com", yelp: "https://yelp.com", facebook: "https://facebook.com" },
},

  services: [
  { icon: "baby", title: "Infant Care", desc: "Ages 6 weeks–18 months. Nurturing 1:3 ratios, sleep routines, tummy time, and sensory play in a safe, loving environment.", urgent: false },
  { icon: "users", title: "Toddler Program", desc: "Ages 18 months–3 years. Language-rich activities, social skills, and guided exploration. Daily progress photos shared.", urgent: false },
  { icon: "book-open", title: "Pre-K Curriculum", desc: "Ages 3–5. Kindergarten readiness through play-based learning. Reading foundations, numbers, and creative arts.", urgent: false },
  { icon: "sun", title: "After-School Care", desc: "Safe pickup from local schools. Homework help, healthy snacks, and enrichment activities until 6pm.", urgent: false },
  { icon: "calendar", title: "Summer Camp", desc: "Fun-packed 8-week summer program. Themes, field trips, art, science experiments, and outdoor play.", urgent: false },
  { icon: "clock", title: "Drop-In Care", desc: "Flexible drop-in slots available. Date night, appointment, or work meeting. Licensed, safe, no commitment.", urgent: false },
],

  testimonials: [
  { name: "Priya M.", location: "Tracy, CA", stars: 5, text: "My daughter cried at daycare drop-off everywhere else. First day at Sunshine Sprouts she walked right in. The teachers are incredible — she has grown so much." },
  { name: "Jason & Amy C.", location: "Mountain House, CA", stars: 5, text: "Both our kids have been here since infant care. The curriculum is excellent — our son started K already reading. Safe, clean, and genuinely loving staff." },
  { name: "Fatima A.", location: "Manteca, CA", stars: 5, text: "The daily photos and updates give me total peace of mind at work. My toddler is thriving socially and learning so fast. Worth every penny." },
],

  trustBadges: [
  "State Licensed", "Background-Checked Staff", "CPR Certified Teachers",
  "Daily Parent Updates", "Organic Snacks", "Kindergarten Readiness Curriculum"
],

  stats: [
  {
    "value": 5,
    "label": "Google Rating",
    "suffix": "★",
    "decimals": 1
  },
  {
    "value": 945,
    "label": "Jobs Done",
    "suffix": "+",
    "decimals": 0
  },
  {
    "value": 15,
    "label": "Yrs Experience",
    "suffix": "+",
    "decimals": 0
  }
],

  reasons: [
  {
    "icon": "clock",
    "title": "Fast Response",
    "desc": "Same-day service when you need it. We don't keep customers waiting."
  },
  {
    "icon": "dollar-sign",
    "title": "Upfront Pricing",
    "desc": "Quote before work starts. The number we say is the number you pay."
  },
  {
    "icon": "award",
    "title": "Certified Professionals",
    "desc": "Licensed, insured, and trained. Real expertise on every job."
  },
  {
    "icon": "thumbs-up",
    "title": "Satisfaction Guarantee",
    "desc": "100% happy or we come back and make it right. No questions asked."
  },
  {
    "icon": "phone",
    "title": "AI Reception 24/7",
    "desc": "AI books tours, answers enrollment questions, and sends parent updates via call, SMS, or WhatsApp — even outside business hours."
  },
  {
    "icon": "truck",
    "title": "Fully Equipped",
    "desc": "Trucks stocked with everything needed. First-visit completion rate above 90%."
  }
],

  formServiceOptions: [
  "Infant Care",
  "Toddler Program",
  "Pre-K Curriculum",
  "After-School Care",
  "Summer Camp",
  "Drop-In Care"
],
}

// Backward compat re-exports
export const BUSINESS = config.business
export const SERVICES = config.services!
export const TESTIMONIALS = config.testimonials!
export const TRUST_BADGES = config.trustBadges!
