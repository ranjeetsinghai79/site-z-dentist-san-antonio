import type { SiteConfig } from "@core/web/types"

export const config: SiteConfig = {
  business: {
    name: "Z Dentist",
    tagline: "Your Smile, Our Priority. Always.",
    phone: "(210) 802-9999",
    phoneHref: "tel:+12108029999",
    email: "info@zdentist.com",
    address: "7010 W Loop 1604 N, Suite 205, San Antonio, Texas 78254",
    city: "San Antonio",
    serviceAreas: ["San Antonio"],
    license: "Licensed & Insured",
    since: "2005",
    google_rating: "4.9",
    review_count: "200",
    emergency: true,
    theme: "noir",
    niche: "dentist",
  },

  services: [
    { icon: "star", title: "General Dentistry", desc: "Comprehensive care for your everyday dental needs, ensuring long-term oral health.", urgent: false },
    { icon: "sparkles", title: "Cosmetic Dentistry", desc: "Transform your smile with veneers, whitening, and smile makeovers for a confident new you.", urgent: false },
    { icon: "shield-check", title: "Dental Implants", desc: "Permanent solutions for missing teeth, restoring function and aesthetics with durable implants.", urgent: false },
    { icon: "heart", title: "Sedation Dentistry", desc: "Relax during your visit with various sedation options, making dental care comfortable and stress-free.", urgent: false },
    { icon: "wrench", title: "TMJ Treatment", desc: "Effective relief for jaw pain and discomfort, improving your quality of life.", urgent: false },
    { icon: "phone", title: "Dental Emergencies", desc: "Immediate care for urgent dental issues, providing prompt relief and solutions when you need them most.", urgent: true }
  ],

  testimonials: [
    { name: "Sarah L.", location: "San Antonio", stars: 5, text: "I had a dental emergency on a Saturday morning, and Z Dentist was incredible. They got me in within an hour, and Dr. Lee was so kind and professional. My toothache was gone, and I felt so much better. The front desk staff was also very helpful with my insurance. Highly recommend their emergency service!" },
    { name: "Mark T.", location: "San Antonio", stars: 5, text: "Getting my Same-Day Crown at Z Dentist was a game-changer. I was dreading multiple appointments, but they handled everything in one visit. The technology they use is amazing, and the crown fits perfectly. No pain, no hassle, just a great experience from start to finish. Thank you, Z Dentist!" },
    { name: "Jessica R.", location: "San Antonio", stars: 5, text: "I've always been anxious about dental visits, but the Oral Conscious Sedation at Z Dentist made a huge difference. I barely remember the procedure, and I felt completely relaxed. The team was incredibly understanding and made sure I was comfortable throughout. This is the only place I'll go for my dental work now." }
  ],

  trustBadges: [
    "Licensed & Insured", "Same-Day Crown", "Emergency Services", "Comprehensive Sedation", "Z Membership Plans", "Online Booking"
  ],

  stats: [
    { value: 4.9, label: "Google Rating", suffix: "★", decimals: 1 },
    { value: 5000, label: "Happy Smiles", suffix: "+", decimals: 0 },
    { value: 15, label: "Yrs Experience", suffix: "+", decimals: 0 }
  ],

  reasons: [
    { icon: "clock", title: "Fast Response", desc: "We prioritize your time with prompt scheduling and efficient service for all your dental needs." },
    { icon: "dollar-sign", title: "Upfront Pricing", desc: "Clear, transparent pricing with no hidden fees, so you always know what to expect." },
    { icon: "award", title: "Certified Pros", desc: "Our highly trained and certified dental professionals deliver top-tier care with expertise and compassion." },
    { icon: "thumbs-up", title: "Satisfaction Guarantee", desc: "Your comfort and satisfaction are our priority, ensuring a positive experience every visit." },
    { icon: "phone", title: "AI Reception 24/7", desc: "Our AI reception is available around the clock to assist with scheduling and answer your questions." },
    { icon: "truck", title: "Fully Equipped", desc: "State-of-the-art technology and modern facilities for advanced and comfortable dental treatments." }
  ],

  formServiceOptions: ["General Dentistry", "Cosmetic Dentistry", "Dental Implants", "Sedation Dentistry", "TMJ Treatment", "Dental Emergencies"]
}

// Backward-compat re-exports
export const BUSINESS = config.business
export const SERVICES = config.services!
export const TESTIMONIALS = config.testimonials!
export const TRUST_BADGES = config.trustBadges!