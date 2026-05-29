import { Phone, Mail, MapPin } from "lucide-react"
import type { SiteConfig } from "../types"

interface Props {
  config: SiteConfig
}

export function Footer({ config }: Props) {
  const business = config.business
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-14 px-6"
      style={{ background: "#000", borderTop: "1px solid color-mix(in srgb, var(--brand-accent) 12%, transparent)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-display text-white text-xl mb-1" style={{ fontWeight: 800 }}>
              {business.name}
            </div>
            <div className="font-body text-white/40 text-sm mb-4">{business.tagline}</div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  style={{ fill: "var(--brand-accent)" }}
                  aria-hidden
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="text-white text-sm ml-1" style={{ fontWeight: 700 }}>{business.google_rating}</span>
              <span className="text-white/40 text-xs ml-1">{business.review_count} reviews</span>
            </div>
            {business.license && <div className="text-white/40 text-xs font-body">{business.license}</div>}
            <div className="font-body text-white/30 text-xs mt-2">Est. {business.since}</div>
          </div>

          <div>
            <div className="font-display text-xs tracking-[0.3em] uppercase text-white/50 mb-4" style={{ fontWeight: 700 }}>
              Contact
            </div>
            <div className="space-y-3">
              <a href={business.phoneHref} className="flex items-center gap-3 text-white/65 hover:text-white transition-colors text-sm font-body">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "var(--brand-accent)" }} />
                {business.phone}
              </a>
              <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-white/65 hover:text-white transition-colors text-sm font-body">
                <Mail className="w-4 h-4 shrink-0" style={{ color: "var(--brand-accent)" }} />
                {business.email}
              </a>
              <div className="flex items-start gap-3 text-white/55 text-sm font-body">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--brand-accent)" }} />
                {business.address}
              </div>
            </div>
          </div>

          <div>
            <div className="font-display text-xs tracking-[0.3em] uppercase text-white/50 mb-4" style={{ fontWeight: 700 }}>
              Service Areas
            </div>
            <div className="flex flex-wrap gap-2">
              {business.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="font-body text-white/55 text-xs border border-white/10 px-3 py-1.5 rounded-full"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="font-body text-white/30 text-xs">
            © {year} {business.name}. All rights reserved.
          </div>
          <div className="font-body text-white/20 text-xs tracking-[0.1em] uppercase">
            {business.city} · {business.niche.replace(/-/g, " ")}
          </div>
        </div>
      </div>
    </footer>
  )
}
