import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { VisionSection } from "@/components/vision-section"
import { ProcessSection } from "@/components/process-section"
import { SeoSchema } from "@/components/seo-schema"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Users, Heart, Lightbulb, Target } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Om Skaply | Din Partner för Digital Transformation | Expertteam inom Webbdesign",
  description: "Möt teamet bakom Skaply - en ledande digitalbyrå med passion för innovation. Vi kombinerar teknisk expertis med kreativitet för att skapa framtidens digitala upplevelser.",
  keywords: [
    'digitalbyrå Stockholm', 
    'webbutvecklingsteam', 
    'teknisk expertis', 
    'kreativ digitalbyrå', 
    'Next.js utvecklare',
    'Supabase experter',
    'digitala innovatörer',
    'företagshistoria tech',
    'digital transformation partner'
  ],
  openGraph: {
    title: "Om Skaply | Din Partner för Digital Transformation | Expertteam inom Webbdesign",
    description: "Möt teamet bakom Skaply - en ledande digitalbyrå med passion för innovation. Vi kombinerar teknisk expertis med kreativitet för att skapa framtidens digitala upplevelser.",
    url: "https://www.skaply.se/om-oss",
    type: "website",
    images: [
      {
        url: "https://www.skaply.se/link_preview.png",
        width: 1200,
        height: 630,
        alt: "Skaply - Expertteam inom Webbdesign"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Skaply | Din Partner för Digital Transformation | Expertteam inom Webbdesign",
    description: "Möt teamet bakom Skaply - en ledande digitalbyrå med passion för innovation. Vi kombinerar teknisk expertis med kreativitet för att skapa framtidens digitala upplevelser.",
    images: ["https://www.skaply.se/link_preview.png"]
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B1E] via-[#1A1A2E] to-[#16213E] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00ADB5]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E94560]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#0F3460]/5 rounded-full blur-3xl"></div>
      
      <SeoSchema 
        type="AboutPage"
        name="Om Skaply | Din Partner för Digital Transformation"
        description="Möt teamet bakom Skaply - en ledande digitalbyrå med passion för innovation. Vi kombinerar teknisk expertis med kreativitet för att skapa framtidens digitala upplevelser."
        url="https://www.skaply.se/om-oss"
        image="https://www.skaply.se/link_preview.png"
      />
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-[#E94560]/10 border border-[#E94560]/20 rounded-full px-4 py-2 mb-6">
                  <Heart className="h-4 w-4 text-[#E94560]" />
                  <span className="text-sm text-[#E94560] font-medium">Om Oss & Vårt Team</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#E94560] via-white to-[#00ADB5]">
                  Möt Teamet
                  <br />
                  <span className="text-white">Bakom Skaply</span>
                </h1>
                <p className="text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
                  Vi är en passionerad grupp digitala innovatörer som brinner för att förvandla idéer till 
                  extraordinära digitala upplevelser. Med teknisk expertis och kreativ vision hjälper vi 
                  företag att lyckas i den digitala världen.
                </p>
              </div>
            </ScrollReveal>
            
            {/* Values Section */}
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00ADB5] to-[#00ADB5]/80 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
                  <p className="text-foreground/70 text-sm">Vi utforskar ständigt nya teknologier och metoder för att leverera framtidens lösningar.</p>
                </div>
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E94560] to-[#E94560]/80 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Passion</h3>
                  <p className="text-foreground/70 text-sm">Vår kärlek för design och utveckling driver oss att skapa exceptionella digitala upplevelser.</p>
                </div>
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0F3460] to-[#00ADB5] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Fokus</h3>
                  <p className="text-foreground/70 text-sm">Vi fokuserar på att förstå våra kunders behov och leverera lösningar som överträffar förväntningar.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Content Sections */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 space-y-24">
            <TeamSection />
            <ProcessSection />
            <VisionSection />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
