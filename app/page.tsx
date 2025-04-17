import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { FAQSection } from "@/components/faq-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <PortfolioSection />
        <Testimonials />
        <FAQSection />
        <NewsletterSignup />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
