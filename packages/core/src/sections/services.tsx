"use client"

import { useEffect, useRef } from "react"
import { Wrench } from "lucide-react"
import type { SiteConfig } from "../types"
import { gsap, ScrollTrigger } from "../lib/gsap-init"
import { createScope } from "../lib/kill-scope"
import { useReducedMotion } from "../hooks/use-reduced-motion"
import { SplitText } from "../effects/split-text"
import { getIcon } from "./icon-map"

interface Props {
  config: SiteConfig
  /** "horizontal" pins + horizontal-scrolls cards on desktop. "grid" is a static grid. Default "horizontal". */
  layout?: "horizontal" | "grid"
  label?: string
  heading?: string
  subheading?: string
  paragraph?: string
}

export function Services({
  config,
  layout = "horizontal",
  label = "What We Do",
  heading,
  subheading,
  paragraph,
}: Props) {
  const services = config.services ?? []

  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    if (reduced) {
      gsap.set([headingRef.current, ...track.querySelectorAll(".service-card")].filter(Boolean), { opacity: 1, y: 0 })
      return
    }

    const scope = createScope()
    const mm = gsap.matchMedia()

    if (layout === "horizontal") {
      mm.add("(min-width: 1024px)", () => {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)
        const tween = gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${Math.abs(getScrollAmount())}`,
            scrub: 1.2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) progressRef.current.style.width = `${self.progress * 100}%`
            },
          },
        })
        scope.add(tween)
        if (tween.scrollTrigger) scope.add(tween.scrollTrigger)

        const headingTween = gsap.from(headingRef.current, {
          opacity: 0, y: 32, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 90%", once: true },
        })
        scope.add(headingTween)
        if (headingTween.scrollTrigger) scope.add(headingTween.scrollTrigger)

        const cards = track.querySelectorAll<HTMLElement>(".service-card")
        cards.forEach((card, i) => {
          if (i < 2) return
          const t = gsap.from(card, {
            opacity: 0, y: 24, duration: 0.5, ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 95%",
              once: true,
            },
          })
          scope.add(t)
          if (t.scrollTrigger) scope.add(t.scrollTrigger)
        })
      })

      mm.add("(max-width: 1023px)", () => {
        const headingTween = gsap.from(headingRef.current, {
          opacity: 0, y: 48, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 87%", once: true },
        })
        scope.add(headingTween)
        if (headingTween.scrollTrigger) scope.add(headingTween.scrollTrigger)

        const cards = track.querySelectorAll<HTMLElement>(".service-card")
        if (cards.length) {
          const t = gsap.from(cards, {
            opacity: 0, y: 60, scale: 0.92, stagger: 0.07, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: track, start: "top 82%", once: true },
          })
          scope.add(t)
          if (t.scrollTrigger) scope.add(t.scrollTrigger)
        }
      })
    } else {
      // grid layout
      const headingTween = gsap.from(headingRef.current, {
        opacity: 0, y: 32, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 90%", once: true },
      })
      scope.add(headingTween)
      if (headingTween.scrollTrigger) scope.add(headingTween.scrollTrigger)

      const cards = track.querySelectorAll<HTMLElement>(".service-card")
      if (cards.length) {
        const t = gsap.from(cards, {
          opacity: 0, y: 48, scale: 0.95, stagger: 0.08, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: track, start: "top 85%", once: true },
        })
        scope.add(t)
        if (t.scrollTrigger) scope.add(t.scrollTrigger)
      }
    }

    return () => {
      scope.kill()
      mm.revert()
    }
  }, [reduced, layout, services.length])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--brand-bg) 0%, color-mix(in srgb, var(--brand-bg) 85%, #000) 100%)",
        minHeight: layout === "horizontal" ? "100vh" : "auto",
        padding: layout === "grid" ? "6rem 0" : undefined,
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center top, color-mix(in srgb, var(--brand-accent) 12%, transparent) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[none] mx-auto">
        <div ref={headingRef} className="text-center pt-20 pb-12 px-5">
          <span className="section-label">{label}</span>
          <h2
            className="font-display text-white mb-5"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontWeight: 900,
            }}
          >
            {heading ?? (
              <>
                Services That{" "}
                <SplitText className="text-gradient">Solve Problems</SplitText>
              </>
            )}
            {subheading && (
              <>
                <br />
                <SplitText className="text-gradient">{subheading}</SplitText>
              </>
            )}
          </h2>
          {paragraph && (
            <p className="font-body text-white/55 max-w-xl mx-auto leading-relaxed text-lg">
              {paragraph}
            </p>
          )}

          {layout === "horizontal" && (
            <>
              <div className="hidden lg:block mt-8 max-w-xs mx-auto h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full rounded-full transition-none"
                  style={{
                    width: "0%",
                    background: "linear-gradient(90deg, var(--brand-accent), var(--brand-accent-light))",
                  }}
                />
              </div>
              <p className="hidden lg:block mt-3 text-white/30 text-xs font-body tracking-widest">
                scroll to explore →
              </p>
            </>
          )}
        </div>

        <div
          ref={trackRef}
          className={`flex gap-8 px-5 pb-20 ${
            layout === "horizontal"
              ? "lg:flex-nowrap lg:justify-start lg:pl-[max(8rem,calc(50vw-560px))] lg:pr-[max(8rem,calc(50vw-560px))] flex-wrap justify-center"
              : "flex-wrap justify-center max-w-7xl mx-auto"
          }`}
        >
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="service-card group relative rounded-2xl p-8 flex-shrink-0"
              style={{
                width: layout === "horizontal" ? "clamp(280px, 360px, 400px)" : "min(360px, 100%)",
                minHeight: "320px",
                background: service.urgent
                  ? "linear-gradient(135deg, color-mix(in srgb, var(--brand-accent) 22%, transparent), color-mix(in srgb, var(--brand-accent) 8%, transparent))"
                  : "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: service.urgent
                  ? "1px solid color-mix(in srgb, var(--brand-accent) 45%, transparent)"
                  : "1px solid rgba(255,255,255,0.08)",
                boxShadow: service.urgent
                  ? "0 0 48px -8px color-mix(in srgb, var(--brand-accent) 28%, transparent)"
                  : "0 4px 24px -8px rgba(0,0,0,0.4)",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
              }}
            >
              <div
                className="absolute top-6 right-6 font-display text-4xl tabular-nums pointer-events-none"
                style={{ color: "rgba(255,255,255,0.04)", fontFamily: "var(--font-display)", fontWeight: 900 }}
                aria-hidden
              >
                {String(idx + 1).padStart(2, "0")}
              </div>

              {service.urgent && (
                <div
                  className="absolute top-4 right-4 text-white text-[0.6rem] font-bold px-2.5 py-1 rounded-full tracking-wider"
                  style={{ background: "var(--brand-accent)" }}
                >
                  24/7
                </div>
              )}

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: "color-mix(in srgb, var(--brand-accent) 15%, transparent)",
                  color: "var(--brand-accent-light)",
                  border: "1px solid color-mix(in srgb, var(--brand-accent) 25%, transparent)",
                }}
              >
                {getIcon(service.icon, "w-7 h-7") ?? <Wrench className="w-7 h-7" />}
              </div>

              <h3
                className="font-display text-xl mb-3 text-white"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {service.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-white/55">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
