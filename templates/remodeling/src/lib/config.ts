import type { SiteConfig } from "@core/web/types"

export const config: SiteConfig = {
  business: {
  city: "Tracy",
  theme: "navy",
  niche: "remodeling",
  name: "Craftsman Home Remodeling",
  tagline: "Built With Pride. Built to Last.",
  phone: "(555) 678-9012",
  phoneHref: "tel:+15556789012",
  email: "hello@craftsmanremodel.com",
  address: "Tracy, California",
  serviceAreas: ["Tracy", "Stockton", "Modesto", "Manteca", "Dublin", "Pleasanton"],
  license: "CSLB #654321",
  since: "2008",
  google_rating: "4.8",
  review_count: "198",
  emergency: false,
  social: { google: "https://google.com", yelp: "https://yelp.com", facebook: "https://facebook.com" },
},

  services: [
  { icon: "utensils", title: "Kitchen Remodel", desc: "Custom cabinets, quartz countertops, full layout redesigns. Transform your kitchen into the heart of your home.", urgent: false },
  { icon: "bath", title: "Bathroom Renovation", desc: "Walk-in showers, soaking tubs, double vanities. Spa-level bathrooms that add immediate home value.", urgent: false },
  { icon: "home", title: "Room Additions", desc: "Expand your living space without moving. Master suites, family rooms, ADUs built to code and on budget.", urgent: false },
  { icon: "layers", title: "Flooring", desc: "Hardwood, LVP, tile, and carpet. Expert installation for all flooring types throughout your home.", urgent: false },
  { icon: "sun", title: "Deck & Outdoor Living", desc: "Custom decks, pergolas, and outdoor kitchens. Extend your living space outdoors.", urgent: false },
  { icon: "tool", title: "Full Home Renovation", desc: "Complete gut-and-rebuild or whole-home refresh. One contractor for every trade. Clear timeline, no surprises.", urgent: false },
],

  testimonials: [
  { name: "Kevin H.", location: "Tracy, CA", stars: 5, text: "Full kitchen remodel in 3 weeks. They stuck to the budget and timeline. The craftsmanship is stunning — every guest asks who did it." },
  { name: "Lisa W.", location: "Dublin, CA", stars: 5, text: "Master bath renovation was beyond our expectations. Heated floors, custom tile, frameless glass. It looks like a $50k job. They beat every quote we got." },
  { name: "Mark & Amy D.", location: "Stockton, CA", stars: 5, text: "Added a 400 sq ft family room addition. Permits pulled, work done in 6 weeks. Seamlessly matches the original house. Worth every dollar." },
],

  trustBadges: [
  "Licensed General Contractor", "Design + Build", "On Budget Guarantee",
  "15 Years Experience", "Financing Available", "Free Design Consultation"
],

  stats: [
  {
    "value": 4.8,
    "label": "Google Rating",
    "suffix": "★",
    "decimals": 1
  },
  {
    "value": 990,
    "label": "Jobs Done",
    "suffix": "+",
    "decimals": 0
  },
  {
    "value": 18,
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
    "desc": "AI handles every call, text, and WhatsApp inquiry — schedules consultations, collects project details, and qualifies leads around the clock."
  },
  {
    "icon": "truck",
    "title": "Fully Equipped",
    "desc": "Trucks stocked with everything needed. First-visit completion rate above 90%."
  }
],

  formServiceOptions: [
  "Kitchen Remodel",
  "Bathroom Renovation",
  "Room Additions",
  "Flooring",
  "Deck & Outdoor Living",
  "Full Home Renovation"
],
}

// Backward compat re-exports
export const BUSINESS = config.business
export const SERVICES = config.services!
export const TESTIMONIALS = config.testimonials!
export const TRUST_BADGES = config.trustBadges!
