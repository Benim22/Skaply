import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ConsultationForm } from "@/components/consultation-form"
import { Clock, CalendarDays, MessageSquare, PhoneCall, Mail, Phone, HeadphonesIcon } from "lucide-react"
import { SeoSchema } from "@/components/seo-schema"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakta Skaply | Gratis Konsultation för Digitala Projekt | Webbutveckling",
  description: "Kontakta Skaply för en kostnadsfri konsultation om ditt digitala projekt. Få skräddarsydda lösningar inom webbutveckling, appar, AI eller design från våra experter.",
  keywords: [
    'kontakta webbyrå', 
    'digital konsultation', 
    'kostnadsfritt möte webbdesign', 
    'offert webbutveckling', 
    'apputveckling kostnader',
    'webbprojekt hjälp',
    'digital utvecklingspartner',
    'IT-konsultation Stockholm',
    'webbapplikation konsult'
  ],
  openGraph: {
    title: "Kontakta Skaply | Gratis Konsultation för Digitala Projekt | Webbutveckling",
    description: "Kontakta Skaply för en kostnadsfri konsultation om ditt digitala projekt. Få skräddarsydda lösningar inom webbutveckling, appar, AI eller design från våra experter.",
    url: "https://www.skaply.se/kontakt",
    type: "website",
    images: [
      {
        url: "https://www.skaply.se/link_preview.png",
        width: 1200,
        height: 630,
        alt: "Kostnadsfri Konsultation - Skaply"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakta Skaply | Gratis Konsultation för Digitala Projekt | Webbutveckling",
    description: "Kontakta Skaply för en kostnadsfri konsultation om ditt digitala projekt. Få skräddarsydda lösningar inom webbutveckling, appar, AI eller design från våra experter.",
    images: ["https://www.skaply.se/link_preview.png"]
  }
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B1E] via-[#1A1A2E] to-[#16213E] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00ADB5]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E94560]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-[#0F3460]/5 rounded-full blur-3xl"></div>
      
      <SeoSchema 
        type="ContactPage"
        name="Kontakta Skaply | Gratis Konsultation för Digitala Projekt"
        description="Kontakta Skaply för en kostnadsfri konsultation om ditt digitala projekt. Få skräddarsydda lösningar inom webbutveckling, appar, AI eller design från våra experter."
        url="https://www.skaply.se/kontakt"
        image="https://www.skaply.se/images/kontakt-og.jpg"
      />
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-[#00ADB5]/10 border border-[#00ADB5]/20 rounded-full px-4 py-2 mb-6">
                  <HeadphonesIcon className="h-4 w-4 text-[#00ADB5]" />
                  <span className="text-sm text-[#00ADB5] font-medium">Kostnadsfri Konsultation</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ADB5] via-white to-[#E94560]">
                  Låt oss Förverkliga
                  <br />
                  <span className="text-white">Dina Idéer</span>
                </h1>
                <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                  Berätta om ditt projekt och få en personlig konsultation. Vi hjälper dig att hitta den bästa 
                  lösningen för dina behov och din budget - helt kostnadsfritt.
                </p>
              </div>
            </ScrollReveal>

            {/* Process Steps */}
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center hover:border-[#00ADB5]/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00ADB5] to-[#00ADB5]/80 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <CalendarDays className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">1. Boka konsultation</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">Fyll i formuläret för att boka en tid med våra experter</p>
            </div>
            
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center hover:border-[#00ADB5]/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E94560] to-[#E94560]/80 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-6 w-6 text-white" />
              </div>
                  <h3 className="font-bold text-white mb-2">2. Diskutera behov</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">Vi går igenom dina behov och mål tillsammans i detalj</p>
            </div>
            
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center hover:border-[#00ADB5]/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0F3460] to-[#00ADB5] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-white" />
              </div>
                  <h3 className="font-bold text-white mb-2">3. Få en offert</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">Vi tar fram en skräddarsydd offert baserad på dina behov</p>
            </div>
            
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 text-center hover:border-[#00ADB5]/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00ADB5] to-[#E94560] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <PhoneCall className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">4. Direkt support</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">Kontinuerlig support under hela projektets livscykel</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <ConsultationForm />
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-[#0F3460]/30 shadow-2xl text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00ADB5] to-[#00ADB5]/80 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <HeadphonesIcon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Föredrar du att prata direkt?</h2>
                  <p className="text-foreground/80 text-lg leading-relaxed mb-8">
                    Ingen problematik! Vi finns här för dig på flera sätt. Kontakta oss direkt för en snabb diskussion om ditt projekt.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div className="bg-[#0F3460]/20 rounded-2xl p-6">
                      <Phone className="h-8 w-8 text-[#00ADB5] mx-auto mb-3" />
                      <h3 className="font-bold text-white mb-2">Ring oss direkt</h3>
                      <a 
                        href="tel:+46762761784" 
                        className="text-[#00ADB5] font-medium hover:text-[#00ADB5]/80 transition-colors text-lg"
                      >
                        076-276 17 84
                      </a>
                    </div>
                    <div className="bg-[#0F3460]/20 rounded-2xl p-6">
                      <Mail className="h-8 w-8 text-[#E94560] mx-auto mb-3" />
                      <h3 className="font-bold text-white mb-2">Skicka e-post</h3>
                      <a 
                        href="mailto:info@skaply.se" 
                        className="text-[#E94560] font-medium hover:text-[#E94560]/80 transition-colors text-lg"
                      >
                        info@skaply.se
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
