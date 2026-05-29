import type { SiteConfig, BrandStoryChapter } from "@core/web/types"

export const config: SiteConfig & { brandStoryChapters: BrandStoryChapter[] } = {
  business: {
    name: "ProFix HVAC & Plumbing",
    tagline: "Fast. Licensed. Trusted.",
    phone: "(555) 123-4567",
    phoneHref: "tel:+15551234567",
    email: "hello@profixhvac.com",
    address: "Tracy, California",
    city: "Tracy",
    serviceAreas: ["Tracy", "Stockton", "Modesto", "Manteca", "Lathrop", "Lodi"],
    license: "CSLB #987654",
    since: "2008",
    google_rating: "4.9",
    review_count: "312",
    emergency: true,
    social: {
      google: "https://google.com",
      yelp: "https://yelp.com",
      facebook: "https://facebook.com",
    },
    theme: "navy",
    niche: "hvac",
  },

  services: [
    { icon: "thermometer",  title: "AC Repair & Install",  desc: "Same-day diagnostics and repair for all AC brands. New system installations with 10-year warranty.", urgent: false },
    { icon: "flame",        title: "Heating & Furnace",    desc: "Furnace repair, replacement, and maintenance. No heat tonight? We have emergency slots available.", urgent: false },
    { icon: "droplets",     title: "Plumbing Repairs",     desc: "Leaks, clogs, burst pipes, water heaters. Full-service plumbing for residential and commercial.", urgent: false },
    { icon: "zap",          title: "Emergency Service",    desc: "24/7 emergency dispatch. We answer every call. Average response time: 45 minutes.", urgent: true },
    { icon: "shield-check", title: "Maintenance Plans",    desc: "Annual tune-ups that extend equipment life by 5+ years and cut energy bills by up to 20%.", urgent: false },
    { icon: "wrench",       title: "Commercial HVAC",      desc: "Full commercial HVAC services. Restaurants, offices, retail. Scheduled and emergency.", urgent: false },
  ],

  testimonials: [
    { name: "Maria S.", location: "Tracy, CA",    stars: 5, text: "AC went out on a 104° day. ProFix arrived in under an hour, had parts on the truck, done by noon. Saved us." },
    { name: "James T.", location: "Stockton, CA", stars: 5, text: "Called at 11pm for a burst pipe. Technician showed up in 40 minutes. Professional, clean, fair price. 5 stars." },
    { name: "Linda K.", location: "Manteca, CA",  stars: 5, text: "Used them for annual furnace tune-up. Saved $340 vs competitor quote. Will use every year going forward." },
  ],

  trustBadges: [
    "Licensed & Insured",
    "NATE Certified",
    "BBB A+ Rated",
    "24/7 Emergency",
    "Free Estimates",
    "100% Satisfaction Guarantee",
  ],

  stats: [
    { value: 4.9,   label: "Google Rating",  suffix: "★", decimals: 1 },
    { value: 4800,  label: "Jobs Done",      suffix: "+", decimals: 0 },
    { value: 16,    label: "Yrs Experience", suffix: "+", decimals: 0 },
  ],

  reasons: [
    { icon: "clock",        title: "Same-Day Service",       desc: "Call before noon and we're there today. 45-minute average emergency response." },
    { icon: "dollar-sign",  title: "Upfront Pricing",        desc: "No surprises. We quote before we work, and we stick to it. Always." },
    { icon: "award",        title: "NATE Certified Techs",   desc: "Our technicians hold the highest HVAC certification available. Real expertise on every job." },
    { icon: "thumbs-up",    title: "Satisfaction Guarantee", desc: "If you're not 100% satisfied, we come back and make it right. No questions." },
    { icon: "phone",        title: "AI Reception 24/7",      desc: "AI answers every call, text & WhatsApp — books service calls, handles emergencies, gives quotes around the clock. No hold music. No voicemail." },
    { icon: "truck",        title: "Stocked Service Trucks", desc: "90% of repairs done on the first visit. We carry the parts so you're not waiting." },
  ],

  formServiceOptions: [
    "AC Repair or Installation",
    "Heating / Furnace",
    "Plumbing",
    "Emergency Service",
    "Maintenance Plan",
  ],

  brandStoryChapters: [
    {
      index: "01",
      label: "Who We Are",
      heading: "Honest Work. Every Time.",
      body: "Since 2008, ProFix HVAC & Plumbing has been the call neighbors make when something breaks. No upsells. No scare tactics. Just licensed technicians who show up and fix it right.",
      bg: "var(--brand-accent)",
      fg: "#fff",
    },
    {
      index: "02",
      label: "How It Works",
      heading: "Call. Fix. Done.",
      body: "Three steps. No waiting. No guessing. Your home is comfortable again — today.",
      bg: "var(--brand-bg)",
      fg: "#fff",
      items: [
        { n: "01", title: "Call or Text",  desc: "Reach a real dispatcher in under 60 seconds. No phone trees, no hold music." },
        { n: "02", title: "We Diagnose",   desc: "A certified tech arrives with a fully stocked truck. Upfront quote before any work starts." },
        { n: "03", title: "Fixed Today",   desc: "90% of jobs resolved on the first visit. You pay only what was quoted." },
      ],
    },
    {
      index: "03",
      label: "Why Choose Us",
      heading: "Built On Trust.",
      body: "NATE Certified technicians. CSLB Licensed. Fully insured. The credentials to back up every promise.",
      bg: "#F5F0E8",
      fg: "var(--brand-bg)",
    },
  ],
}

// Re-exports for backward compat
export const BUSINESS = config.business
export const SERVICES = config.services!
export const TESTIMONIALS = config.testimonials!
export const TRUST_BADGES = config.trustBadges!
