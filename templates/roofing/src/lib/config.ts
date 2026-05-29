import type { SiteConfig } from "@core/web/types"

export const config: SiteConfig = {
  business: {
  city: "Tracy",
  theme: "ember",
  niche: "roofing",
  name: "Peak Shield Roofing",
  tagline: "Storm-Ready. Storm-Proof.",
  phone: "(555) 234-5678",
  phoneHref: "tel:+15552345678",
  email: "hello@peakshieldroofing.com",
  address: "Tracy, California",
  serviceAreas: ["Tracy", "Stockton", "Modesto", "Manteca", "Turlock", "Lodi"],
  license: "CSLB #123987",
  since: "2005",
  google_rating: "4.8",
  review_count: "287",
  emergency: true,
  social: {
    google: "https://google.com",
    yelp: "https://yelp.com",
    facebook: "https://facebook.com",
  },
},

  services: [
  {
    icon: "home",
    title: "Roof Replacement",
    desc: "Full tear-off and replacement with 30-year architectural shingles. Manufacturer warranty + our 10-year workmanship guarantee.",
    urgent: false,
  },
  {
    icon: "cloud-lightning",
    title: "Storm Damage Repair",
    desc: "Wind, hail, and rain damage repaired fast. We document everything for your insurance claim.",
    urgent: true,
  },
  {
    icon: "file-text",
    title: "Insurance Claims",
    desc: "We work directly with your insurance adjuster. 95% of our storm repairs are fully covered.",
    urgent: false,
  },
  {
    icon: "shield",
    title: "Emergency Tarping",
    desc: "Same-day emergency tarp service. 24/7 response. Protect your home while we schedule full repair.",
    urgent: true,
  },
  {
    icon: "droplets",
    title: "Gutter Installation",
    desc: "Seamless aluminum gutters with leaf guards. Protect your foundation and landscaping.",
    urgent: false,
  },
  {
    icon: "search",
    title: "Free Inspections",
    desc: "Thorough roof inspection with photo report. Know exactly what you have before buying or selling.",
    urgent: false,
  },
],

  testimonials: [
  {
    name: "Robert M.",
    location: "Tracy, CA",
    stars: 5,
    text: "Hail storm took out half our roof. Peak Shield had emergency tarps up same day, full replacement done in 3 days. Insurance paid everything.",
  },
  {
    name: "Sarah L.",
    location: "Stockton, CA",
    stars: 5,
    text: "They handled the entire insurance claim for us. Didn't pay a dollar out of pocket. New roof looks better than the original.",
  },
  {
    name: "Tom K.",
    location: "Manteca, CA",
    stars: 5,
    text: "Pre-listing inspection found issues the buyer's inspector would've caught. Fixed it fast, sold for full price. Worth every penny.",
  },
],

  trustBadges: [
  "Licensed & Insured",
  "Storm Damage Specialists",
  "Insurance Claim Experts",
  "GAF Master Elite Contractor",
  "Lifetime Warranty Available",
  "Free Inspections",
],

  stats: [
  {
    "value": 4.8,
    "label": "Google Rating",
    "suffix": "★",
    "decimals": 1
  },
  {
    "value": 1435,
    "label": "Jobs Done",
    "suffix": "+",
    "decimals": 0
  },
  {
    "value": 21,
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
    "desc": "AI answers every call and text 24/7 — schedules inspections, captures storm-damage leads, and gives estimates before competitors do."
  },
  {
    "icon": "truck",
    "title": "Fully Equipped",
    "desc": "Trucks stocked with everything needed. First-visit completion rate above 90%."
  }
],

  formServiceOptions: [
  "Roof Replacement",
  "Storm Damage Repair",
  "Insurance Claims",
  "Emergency Tarping",
  "Gutter Installation",
  "Free Inspections"
],
}

// Backward compat re-exports
export const BUSINESS = config.business
export const SERVICES = config.services!
export const TESTIMONIALS = config.testimonials!
export const TRUST_BADGES = config.trustBadges!
