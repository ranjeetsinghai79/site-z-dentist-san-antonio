import type { SiteConfig } from "@core/web/types"

export const config: SiteConfig = {
  business: {
  city: "Tracy",
  theme: "noir",
  niche: "lawfirm",
  name: "Caldwell & Associates",
  tagline: "Fighting For You. Every Case. Every Time.",
  phone: "(555) 567-8901",
  phoneHref: "tel:+15555678901",
  email: "hello@caldwelllaw.com",
  address: "Tracy, California",
  serviceAreas: ["Tracy", "Stockton", "Modesto", "Sacramento", "San Jose", "Oakland"],
  license: "California State Bar #456789",
  since: "2003",
  google_rating: "4.9",
  review_count: "156",
  emergency: true,
  social: { google: "https://google.com", yelp: "https://yelp.com", facebook: "https://facebook.com" },
},

  services: [
  { icon: "car", title: "Personal Injury", desc: "Car accidents, slip & fall, workplace injuries. No fee unless we win. Maximum compensation for your suffering.", urgent: true },
  { icon: "users", title: "Family Law", desc: "Divorce, child custody, spousal support, and adoption. Protecting your family's future with compassion and strength.", urgent: false },
  { icon: "shield", title: "Criminal Defense", desc: "DUI, drug charges, assault, theft. We defend your rights aggressively from arrest through trial.", urgent: true },
  { icon: "briefcase", title: "Business Law", desc: "Contracts, partnerships, LLC formation, disputes. Legal protection for every stage of your business.", urgent: false },
  { icon: "file-text", title: "Estate Planning", desc: "Wills, trusts, power of attorney, and probate. Secure your legacy and protect your loved ones.", urgent: false },
  { icon: "globe", title: "Immigration Law", desc: "Visas, green cards, citizenship, deportation defense. Navigating complex immigration with decades of experience.", urgent: false },
],

  testimonials: [
  { name: "David R.", location: "Tracy, CA", stars: 5, text: "After my car accident, I was overwhelmed. Caldwell & Associates handled everything — insurance, medical bills, settlement. Got 3x what the insurance offered." },
  { name: "Maria G.", location: "Stockton, CA", stars: 5, text: "Went through a difficult divorce with children involved. They fought hard for my custody rights while being sensitive to the emotional toll. Couldn't have done it without them." },
  { name: "James T.", location: "Modesto, CA", stars: 5, text: "Faced criminal charges that could have ruined my career. They had the charges dismissed. Professional, responsive, and genuinely cared about my outcome." },
],

  trustBadges: [
  "20+ Years Experience", "No Fee Unless We Win", "Free Consultations",
  "AV Preeminent Rated", "Super Lawyers 2024", "1,000+ Cases Won"
],

  stats: [
  {
    "value": 4.9,
    "label": "Google Rating",
    "suffix": "★",
    "decimals": 1
  },
  {
    "value": 780,
    "label": "Jobs Done",
    "suffix": "+",
    "decimals": 0
  },
  {
    "value": 23,
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
    "title": "AI Intake 24/7",
    "desc": "AI answers calls and texts around the clock — qualifies leads, schedules consultations, and captures case details before your team follows up."
  },
  {
    "icon": "truck",
    "title": "Fully Equipped",
    "desc": "Trucks stocked with everything needed. First-visit completion rate above 90%."
  }
],

  formServiceOptions: [
  "Personal Injury",
  "Family Law",
  "Criminal Defense",
  "Business Law",
  "Estate Planning",
  "Immigration Law"
],
}

// Backward compat re-exports
export const BUSINESS = config.business
export const SERVICES = config.services!
export const TESTIMONIALS = config.testimonials!
export const TRUST_BADGES = config.trustBadges!
