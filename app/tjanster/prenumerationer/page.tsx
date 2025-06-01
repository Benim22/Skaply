"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SubscriptionPlans } from "@/components/subscription-plans"
import { SeoSchema } from "@/components/seo-schema"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Sparkles, Target, Repeat } from "lucide-react"

export default function PrenumerationerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B1E] via-[#1A1A2E] to-[#16213E] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00ADB5]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E94560]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0F3460]/5 rounded-full blur-3xl"></div>
      
      <SeoSchema 
        type="Service"
        name="Prenumerationstjänster | Webb & App som en tjänst - Skaply"
        description="Prenumerera på din webbplats eller mobilapp. Moderna, AI-drivna lösningar utan höga startkostnader. Webb från 1495 kr/mån, Appar från 1495 kr/mån."
        url="https://www.skaply.se/tjanster/prenumerationer"
        image="https://www.skaply.se/images/prenumerationer-og.jpg"
      />
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-[#E94560]/10 border border-[#E94560]/20 rounded-full px-4 py-2 mb-6">
                  <Repeat className="h-4 w-4 text-[#E94560]" />
                  <span className="text-sm text-[#E94560] font-medium">Prenumerationstjänster</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#E94560] via-white to-[#00ADB5]">
                  Webb & App
                  <br />
                  <span className="text-white">som en Tjänst</span>
                </h1>
                <p className="text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
                  Slipp höga startkostnader och få moderna, skalbara digitala lösningar som växer med ditt företag. 
                  Prenumerera på din webbplats eller mobilapp med allt inkluderat - utveckling, hosting, support och löpande förbättringar.
                </p>
              </div>
            </ScrollReveal>
            
            {/* Value propositions */}
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00ADB5] to-[#00ADB5]/80 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Inga höga startkostnader</h3>
                  <p className="text-foreground/70 text-sm">Kom igång direkt med låga månadsavgifter istället för stora engångskostnader.</p>
                </div>
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E94560] to-[#E94560]/80 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Allt inkluderat</h3>
                  <p className="text-foreground/70 text-sm">Hosting, support, uppdateringar och löpande förbättringar - allt i ett paket.</p>
                </div>
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0F3460] to-[#00ADB5] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Repeat className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Skalbar lösning</h3>
                  <p className="text-foreground/70 text-sm">Börja enkelt och utöka funktioner allteftersom ditt företag växer.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <SubscriptionPlans />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 