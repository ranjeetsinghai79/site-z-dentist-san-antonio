import type { SiteConfig } from "@core/web/types"

export const config: SiteConfig = {
  business: {
  city: "Tracy",
  theme: "forest",
  niche: "junk-removal",
  name: "Green Haul Junk Removal",
  tagline: "We Haul It. You Forget It.",
  phone: "(555) 890-1234",
  phoneHref: "tel:+15558901234",
  email: "hello@greenhaul.com",
  address: "Tracy, California",
  serviceAreas: ["Tracy", "Stockton", "Modesto", "Manteca", "Turlock", "Merced"],
  license: "CA Business #890123",
  since: "2016",
  google_rating: "4.9",
  review_count: "341",
  emergency: true,
  social: { google: "https://google.com", yelp: "https://yelp.com", facebook: "https://facebook.com" },
},

  services: [
  { icon: "sofa", title: "Furniture Removal", desc: "Sofas, beds, dressers, tables — we load and haul it all. Same-day available. No disassembly required.", urgent: false },
  { icon: "zap", title: "Appliance Removal", desc: "Refrigerators, washers, dryers, AC units. We recycle and donate whenever possible.", urgent: false },
  { icon: "home", title: "Estate Cleanouts", desc: "Compassionate whole-home cleanouts for estates, foreclosures, and hoarder situations. Discreet and efficient.", urgent: false },
  { icon: "hard-hat", title: "Construction Debris", desc: "Drywall, lumber, concrete, flooring scrap. Fast commercial and residential jobsite cleanup.", urgent: false },
  { icon: "tree-pine", title: "Yard Debris", desc: "Tree trimmings, brush, old fencing, sheds, and more. We leave your property spotless.", urgent: false },
  { icon: "truck", title: "Same-Day Service", desc: "Call by noon for same-day haul. Most jobs booked and completed within 2 hours.", urgent: true },
],

  testimonials: [
  { name: "Karen M.", location: "Tracy, CA", stars: 5, text: "Cleaned out my late mother's house in one day. Respectful, fast, and donated her furniture to local families. Felt right." },
  { name: "Contractor P.", location: "Stockton, CA", stars: 5, text: "Use Green Haul on every job site. They show up on time, clear debris fast, and the price is always fair. Best in the valley." },
  { name: "Alice T.", location: "Manteca, CA", stars: 5, text: "Called at 10am, they were here by noon. Took two old sofas and a pile of junk from the garage. Gone in 45 minutes. Incredible service." },
],

  trustBadges: [
  "Same-Day Available", "Eco-Friendly Disposal", "Licensed & Insured",
  "No Hidden Fees", "We Donate + Recycle", "Free Upfront Quotes"
],

  stats: [
  {
    "value": 4.9,
    "label": "Google Rating",
    "suffix": "★",
    "decimals": 1
  },
  {
    "value": 1705,
    "label": "Jobs Done",
    "suffix": "+",
    "decimals": 0
  },
  {
    "value": 10,
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
    "desc": "AI books pickups, gives price quotes, and confirms jobs via call, SMS, or WhatsApp — 24/7, no hold times, instant response."
  },
  {
    "icon": "truck",
    "title": "Fully Equipped",
    "desc": "Trucks stocked with everything needed. First-visit completion rate above 90%."
  }
],

  formServiceOptions: [
  "Furniture Removal",
  "Appliance Removal",
  "Estate Cleanouts",
  "Construction Debris",
  "Yard Debris",
  "Same-Day Service"
],
}

// Backward compat re-exports
export const BUSINESS = config.business
export const SERVICES = config.services!
export const TESTIMONIALS = config.testimonials!
export const TRUST_BADGES = config.trustBadges!
