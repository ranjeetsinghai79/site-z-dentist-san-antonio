import type { SiteConfig } from "@core/web/types"

export const config: SiteConfig = {
  business: {
  city: "Tracy",
  theme: "ocean",
  niche: "cleaning",
  name: "Sparkle Clean Co.",
  tagline: "Spotless Home. Zero Stress.",
  phone: "(555) 789-0123",
  phoneHref: "tel:+15557890123",
  email: "hello@sparkleclean.com",
  address: "Tracy, California",
  serviceAreas: ["Tracy", "Stockton", "Manteca", "Lathrop", "Mountain House", "Ripon"],
  license: "CA Business #789012",
  since: "2012",
  google_rating: "4.9",
  review_count: "523",
  emergency: false,
  social: { google: "https://google.com", yelp: "https://yelp.com", facebook: "https://facebook.com" },
},

  services: [
  { icon: "sparkles", title: "Deep Cleaning", desc: "One-time top-to-bottom clean. Perfect for move-in/out, post-construction, or a seasonal fresh start. We leave no corner untouched.", urgent: false },
  { icon: "calendar", title: "Weekly / Bi-Weekly", desc: "Recurring cleaning on your schedule. Same trusted cleaner every visit. Cancel anytime, no contracts.", urgent: false },
  { icon: "truck", title: "Move In / Move Out", desc: "Professional clean for your old place or new home. Deposit-back guaranteed or we re-clean free.", urgent: false },
  { icon: "building", title: "Commercial Cleaning", desc: "Offices, retail spaces, medical facilities. Nightly, weekly, or custom schedule. Bonded and insured.", urgent: false },
  { icon: "home", title: "Post-Construction", desc: "Dust, debris, paint overspray — we handle it all. Move-in ready within 24 hours of construction.", urgent: false },
  { icon: "key", title: "Airbnb Turnover", desc: "Between-guest cleaning that earns 5-star reviews. Quick turnaround. Fresh linens. Restock supplies.", urgent: false },
],

  testimonials: [
  { name: "Michelle B.", location: "Tracy, CA", stars: 5, text: "My house has never been this clean. The team arrived on time, worked methodically, and even cleaned spots I didn't ask for. Subscribing immediately." },
  { name: "David S.", location: "Stockton, CA", stars: 5, text: "Used them for move-out cleaning. Landlord returned the full deposit with a compliment about the condition. Worth every dollar." },
  { name: "Airbnb Host A.", location: "Manteca, CA", stars: 5, text: "They turn my unit over in 2 hours no matter the condition. Guests consistently give 5 stars for cleanliness. Best business decision I made." },
],

  trustBadges: [
  "Background-Checked Staff", "Fully Insured", "Eco-Friendly Products",
  "Satisfaction Guarantee", "No Contracts", "5-Star Average"
],

  stats: [
  {
    "value": 4.9,
    "label": "Google Rating",
    "suffix": "★",
    "decimals": 1
  },
  {
    "value": 2615,
    "label": "Jobs Done",
    "suffix": "+",
    "decimals": 0
  },
  {
    "value": 14,
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
    "desc": "AI books cleanings, handles reschedules, and collects post-service reviews via call, text, or WhatsApp. Always on, never misses a lead."
  },
  {
    "icon": "truck",
    "title": "Fully Equipped",
    "desc": "Trucks stocked with everything needed. First-visit completion rate above 90%."
  }
],

  formServiceOptions: [
  "Deep Cleaning",
  "Weekly / Bi-Weekly",
  "Move In / Move Out",
  "Commercial Cleaning",
  "Post-Construction",
  "Airbnb Turnover"
],
}

// Backward compat re-exports
export const BUSINESS = config.business
export const SERVICES = config.services!
export const TESTIMONIALS = config.testimonials!
export const TRUST_BADGES = config.trustBadges!
