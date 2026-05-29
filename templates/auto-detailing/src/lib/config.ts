import type { SiteConfig } from "@core/web/types"

export const config: SiteConfig = {
  business: {
  city: "Tracy",
  theme: "slate",
  niche: "auto-detailing",
  name: "Apex Auto Detailing",
  tagline: "Every Detail. Perfected.",
  phone: "(555) 012-3456",
  phoneHref: "tel:+15550123456",
  email: "hello@apexautodetail.com",
  address: "Tracy, California",
  serviceAreas: ["Tracy", "Stockton", "Modesto", "Manteca", "Pleasanton", "Livermore"],
  license: "CA Business #012345",
  since: "2014",
  google_rating: "5.0",
  review_count: "276",
  emergency: false,
  social: { google: "https://google.com", yelp: "https://yelp.com", facebook: "https://facebook.com" },
},

  services: [
  { icon: "sparkles", title: "Ceramic Coating", desc: "9H hardness nano-ceramic protection. 5-year warranty. Hydrophobic, scratch-resistant, showroom shine that lasts years.", urgent: false },
  { icon: "star", title: "Paint Correction", desc: "Multi-stage machine polishing removes swirls, scratches, and oxidation. Restore your car's true shine.", urgent: false },
  { icon: "zap", title: "Full Detail Package", desc: "Interior + exterior deep clean. Clay bar, hand wax, leather conditioning, engine bay. The full treatment.", urgent: false },
  { icon: "droplets", title: "Interior Detail", desc: "Deep extraction shampoo, leather cleaning and conditioning, dashboard and trim dressing. Fresh from the inside.", urgent: false },
  { icon: "shield", title: "PPF (Paint Film)", desc: "Self-healing urethane film for bumpers, hoods, mirrors. Invisible protection against rock chips and scratches.", urgent: false },
  { icon: "sun", title: "Window Tinting", desc: "Premium ceramic tint. Heat rejection, UV protection, privacy. Legal limits honored. Lifetime warranty.", urgent: false },
],

  testimonials: [
  { name: "Marcus J.", location: "Tracy, CA", stars: 5, text: "Ceramic coated my BMW last year. Water beads off like nothing. Hasn't been to a car wash since. Worth every single dollar." },
  { name: "Tyler R.", location: "Pleasanton, CA", stars: 5, text: "Paint correction on my 10-year-old Mustang made it look brand new. The swirl marks are completely gone. Insane transformation." },
  { name: "David K.", location: "Stockton, CA", stars: 5, text: "Full interior detail after a road trip disaster. Kids had destroyed it. Looks like I just drove it off the lot. Literally perfect." },
],

  trustBadges: [
  "Ceramic Pro Certified", "Paint Correction Specialists", "5-Star Google Rated",
  "5-Year Ceramic Warranty", "Mobile Service Available", "Free Estimates"
],

  stats: [
  {
    "value": 5,
    "label": "Google Rating",
    "suffix": "★",
    "decimals": 1
  },
  {
    "value": 1380,
    "label": "Jobs Done",
    "suffix": "+",
    "decimals": 0
  },
  {
    "value": 12,
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
    "desc": "AI books detailing appointments, sends reminders, and collects post-service reviews via call, text, or WhatsApp. Zero missed bookings."
  },
  {
    "icon": "truck",
    "title": "Fully Equipped",
    "desc": "Trucks stocked with everything needed. First-visit completion rate above 90%."
  }
],

  formServiceOptions: [
  "Ceramic Coating",
  "Paint Correction",
  "Full Detail Package",
  "Interior Detail",
  "PPF (Paint Film)",
  "Window Tinting"
],
}

// Backward compat re-exports
export const BUSINESS = config.business
export const SERVICES = config.services!
export const TESTIMONIALS = config.testimonials!
export const TRUST_BADGES = config.trustBadges!
