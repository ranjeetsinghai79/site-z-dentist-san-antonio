import type { SiteConfig } from "@core/web/types"

export const config: SiteConfig = {
  business: {
  city: "Tracy",
  theme: "ocean",
  niche: "dentist",
  name: "Bright Smile Dental",
  tagline: "Gentle Care. Beautiful Results.",
  phone: "(555) 345-6789",
  phoneHref: "tel:+15553456789",
  email: "hello@brightsmiledelta.com",
  address: "Tracy, California",
  serviceAreas: ["Tracy", "Stockton", "Manteca", "Mountain House", "Lathrop", "Banta"],
  license: "CA DDS #54321",
  since: "2010",
  google_rating: "4.9",
  review_count: "418",
  emergency: true,
  social: {
    google: "https://google.com",
    yelp: "https://yelp.com",
    facebook: "https://facebook.com",
  },
},

  services: [
  {
    icon: "sparkles",
    title: "Teeth Whitening",
    desc: "Professional Zoom whitening — up to 8 shades brighter in one visit. Take-home kits also available.",
    urgent: false,
  },
  {
    icon: "shield-check",
    title: "Preventive Cleanings",
    desc: "Comprehensive exams, digital X-rays, and thorough cleanings. Semi-annual visits for a lifetime of healthy teeth.",
    urgent: false,
  },
  {
    icon: "smile",
    title: "Dental Implants",
    desc: "Permanent tooth replacement that looks and feels natural. Single crowns to full arch restorations.",
    urgent: false,
  },
  {
    icon: "align-center",
    title: "Invisalign & Braces",
    desc: "Straighten your smile discreetly. Clear aligners for teens and adults. Free orthodontic consultation.",
    urgent: false,
  },
  {
    icon: "zap",
    title: "Emergency Dental",
    desc: "Severe pain, broken tooth, lost crown? Same-day emergency slots reserved daily. Call us first.",
    urgent: true,
  },
  {
    icon: "star",
    title: "Cosmetic Dentistry",
    desc: "Veneers, bonding, gum contouring, and smile makeovers. Your dream smile is closer than you think.",
    urgent: false,
  },
],

  testimonials: [
  {
    name: "Jennifer P.",
    location: "Tracy, CA",
    stars: 5,
    text: "Hadn't been to a dentist in 6 years due to anxiety. Dr. Kim was so patient and gentle. Now I actually look forward to my appointments.",
  },
  {
    name: "Carlos R.",
    location: "Stockton, CA",
    stars: 5,
    text: "Got Invisalign here. The whole process was explained clearly, results were amazing. Staff made every visit easy and fun.",
  },
  {
    name: "Melissa T.",
    location: "Manteca, CA",
    stars: 5,
    text: "Chipped a tooth Saturday morning. They got me in within 2 hours. Fixed it perfectly, matched my other teeth exactly. Incredible service.",
  },
],

  trustBadges: [
  "Accepting New Patients",
  "Most Insurance Accepted",
  "Anxiety-Free Dentistry",
  "Digital X-Rays",
  "Same-Day Emergencies",
  "Family & Cosmetic Dentist",
],

  stats: [
  {
    "value": 4.9,
    "label": "Google Rating",
    "suffix": "★",
    "decimals": 1
  },
  {
    "value": 2090,
    "label": "Jobs Done",
    "suffix": "+",
    "decimals": 0
  },
  {
    "value": 16,
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
    "desc": "AI receptionist books appointments, handles insurance questions, sends reminders — via call, SMS, or WhatsApp. Any hour, any day."
  },
  {
    "icon": "truck",
    "title": "Fully Equipped",
    "desc": "Trucks stocked with everything needed. First-visit completion rate above 90%."
  }
],

  formServiceOptions: [
  "Teeth Whitening",
  "Preventive Cleanings",
  "Dental Implants",
  "Invisalign & Braces",
  "Emergency Dental",
  "Cosmetic Dentistry"
],
}

// Backward compat re-exports
export const BUSINESS = config.business
export const SERVICES = config.services!
export const TESTIMONIALS = config.testimonials!
export const TRUST_BADGES = config.trustBadges!
