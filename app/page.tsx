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
import { SeoSchema } from "@/components/seo-schema"
import { ProjectNotification } from "@/components/ui/project-notification"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SeoSchema 
        type="WebPage"
        name="Skaply - Digitala lösningar för framtiden"
        description="Skaply är en digital byrå som bygger framtidens lösningar för webben, mobilen och AI med teknisk spets inom React, Next.js och Supabase."
        url="https://www.skaply.se"
      />
      <Navbar />
      <ProjectNotification 
        project={{
          title: "Moi Sushi & Poké Bowl",
          description: "Komplett digitalt restaurangsystem med onlinebeställning, realtidsöversikt och automatisk kvittoutskrift. Byggt för hög prestanda och skalbarhet.",
          image: "/barberhaus.png",
          link: "https://moisushi.se",
          category: "Webbutveckling",
          status: "Färdig"
        }}
      />
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
