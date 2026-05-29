import type { SiteConfig } from "@core/web/types"

export const config: SiteConfig = {
  business: {
  city: "Tracy",
  theme: "slate",
  niche: "medspa",
  name: "Lumière Med Spa",
  tagline: "Where Science Meets Beauty.",
  phone: "(555) 456-7890",
  phoneHref: "tel:+15554567890",
  email: "hello@lumieremedspa.com",
  address: "Tracy, California",
  serviceAreas: ["Tracy", "Stockton", "Manteca", "Mountain House", "Dublin", "Pleasanton"],
  license: "CA MED #98765",
  since: "2015",
  google_rating: "5.0",
  review_count: "234",
  emergency: false,
  social: {
    google: "https://google.com",
    yelp: "https://yelp.com",
    facebook: "https://facebook.com",
  },
},

  services: [
  {
    icon: "sparkles",
    title: "Botox & Fillers",
    desc: "Natural-looking wrinkle reduction and volume restoration. Board-certified injectors. Results you'll love.",
    urgent: false,
  },
  {
    icon: "zap",
    title: "Laser Hair Removal",
    desc: "Permanent hair reduction on all skin types. 6-session packages with dramatic, lasting results.",
    urgent: false,
  },
  {
    icon: "droplets",
    title: "HydraFacial",
    desc: "Deep cleanse, extract, and hydrate in 30 minutes. Instant glow. Zero downtime. A client favorite.",
    urgent: false,
  },
  {
    icon: "sun",
    title: "Chemical Peels",
    desc: "Resurface and renew with medical-grade peels. Treat acne, hyperpigmentation, and fine lines.",
    urgent: false,
  },
  {
    icon: "activity",
    title: "Microneedling",
    desc: "Stimulate collagen naturally. Treats scars, texture, and signs of aging. PRP add-on available.",
    urgent: false,
  },
  {
    icon: "star",
    title: "Body Contouring",
    desc: "Non-surgical fat reduction and skin tightening. Sculpt your silhouette without surgery or downtime.",
    urgent: false,
  },
],

  testimonials: [
  {
    name: "Amanda W.",
    location: "Tracy, CA",
    stars: 5,
    text: "My Botox looks so natural — exactly what I wanted. The injector took so much time to understand my goals. I've been coming back every 4 months for 2 years.",
  },
  {
    name: "Priya K.",
    location: "Stockton, CA",
    stars: 5,
    text: "Laser hair removal changed my life. After 6 sessions, I'm basically hair-free. The staff made me feel comfortable the entire time.",
  },
  {
    name: "Rachel D.",
    location: "Dublin, CA",
    stars: 5,
    text: "Monthly HydraFacials have completely transformed my skin. I get compliments constantly. Worth every single penny.",
  },
],

  trustBadges: [
  "Board-Certified Providers",
  "FDA-Approved Treatments",
  "Medical-Grade Products",
  "Free Consultations",
  "Financing Available",
  "5-Star Rated on Google",
],

  stats: [
  {
    "value": 5,
    "label": "Google Rating",
    "suffix": "★",
    "decimals": 1
  },
  {
    "value": 1170,
    "label": "Jobs Done",
    "suffix": "+",
    "decimals": 0
  },
  {
    "value": 11,
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
    "desc": "AI concierge books treatments, answers service questions, and collects reviews via call, text, or WhatsApp. Available 24/7, never a wait."
  },
  {
    "icon": "truck",
    "title": "Fully Equipped",
    "desc": "Trucks stocked with everything needed. First-visit completion rate above 90%."
  }
],

  formServiceOptions: [
  "Botox & Fillers",
  "Laser Hair Removal",
  "HydraFacial",
  "Chemical Peels",
  "Microneedling",
  "Body Contouring"
],
}

// Backward compat re-exports
export const BUSINESS = config.business
export const SERVICES = config.services!
export const TESTIMONIALS = config.testimonials!
export const TRUST_BADGES = config.trustBadges!
