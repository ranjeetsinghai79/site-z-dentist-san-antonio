import { Nav, Hero, Services, WhyUs, Reviews, ServiceAreas, Contact, Footer } from "@core/web"
import { config } from "@/lib/config"

export default function Home() {
  return (
    <>
      <Nav config={config} scrolledTheme="light" />
      <main>
        <Hero config={config} posterSrc="/hero-1.jpg" />
        <Services config={config} layout="horizontal" />
        <WhyUs config={config} />
        <Reviews
          config={config}
          ctaText={`Join ${config.business.review_count}+ Happy Customers — Call Now`}
        />
        <ServiceAreas config={config} />
        <Contact config={config} />
      </main>
      <Footer config={config} />
    </>
  )
}
