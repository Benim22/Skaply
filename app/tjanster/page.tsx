"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServiceDetail } from "@/components/service-detail"
import { SeoSchema } from "@/components/seo-schema"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Settings, Target, Code2 } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B1E] via-[#1A1A2E] to-[#16213E] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00ADB5]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E94560]/5 rounded-full blur-3xl"></div>
      
      <SeoSchema 
        type="Service"
        name="Digitala Tjänster & Lösningar | Webbutveckling, Appar & AI"
        description="Skräddarsydda digitala tjänster för moderna företag - webbutveckling, apputveckling, AI-lösningar, design & digital marknadsföring."
        url="https://www.skaply.se/tjanster"
        image="https://www.skaply.se/images/tjanster-og.jpg"
      />
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-[#00ADB5]/10 border border-[#00ADB5]/20 rounded-full px-4 py-2 mb-6">
                  <Settings className="h-4 w-4 text-[#00ADB5]" />
                  <span className="text-sm text-[#00ADB5] font-medium">Digitala Tjänster & Lösningar</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ADB5] via-white to-[#E94560]">
                  Våra Digitala
                  <br />
                  <span className="text-white">Tjänster</span>
                </h1>
                <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                  Vi erbjuder skräddarsydda digitala lösningar för moderna företag. 
                  Från webbutveckling till AI-integrationer - vi hjälper er att lyckas online.
                </p>
              </div>
            </ScrollReveal>
            
            {/* Stats Section */}
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00ADB5] to-[#00ADB5]/80 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Code2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">6+</h3>
                  <p className="text-foreground/70">Tjänstekategorier</p>
                </div>
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E94560] to-[#E94560]/80 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">100%</h3>
                  <p className="text-foreground/70">Skräddarsydda lösningar</p>
                </div>
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00ADB5] to-[#E94560] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
                  <p className="text-foreground/70">Support & underhåll</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Services Section */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <Suspense fallback={
              <div className="text-center py-16">
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-12 max-w-xl mx-auto border border-[#0F3460]/30 shadow-2xl">
                  <div className="w-12 h-12 border-3 border-[#00ADB5]/30 border-t-[#00ADB5] rounded-full animate-spin mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-2">Laddar våra tjänster</h3>
                  <p className="text-foreground/70">Förbereder våra bästa lösningar för dig...</p>
                </div>
              </div>
            }>
          <ServicesContent />
        </Suspense>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

function ServicesContent() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Kontrollera om det finns en hash i URL:en
    const hash = window.location.hash
    if (hash) {
      // Ta bort # från hash för att få ID:t
      const id = hash.substring(1)
      const element = document.getElementById(id)
      
      if (element) {
        // Vänta lite för att säkerställa att sidan har renderats helt
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }
  }, [searchParams])
  
  return <ServiceDetail />
}
