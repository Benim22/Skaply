import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ConsultationForm } from "@/components/consultation-form"
import { Clock, CalendarDays, MessageSquare, PhoneCall } from "lucide-react"
import { SeoSchema } from "@/components/seo-schema"
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
    <div className="min-h-screen bg-background">
      <SeoSchema 
        type="ContactPage"
        name="Kontakta Skaply | Gratis Konsultation för Digitala Projekt"
        description="Kontakta Skaply för en kostnadsfri konsultation om ditt digitala projekt. Få skräddarsydda lösningar inom webbutveckling, appar, AI eller design från våra experter."
        url="https://www.skaply.se/kontakt"
        image="https://www.skaply.se/images/kontakt-og.jpg"
      />
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Kostnadsfri Konsultation</h1>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
              Berätta om ditt projekt och få en personlig konsultation. Vi hjälper dig att hitta den bästa lösningen för dina behov och din budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50 flex flex-col items-center text-center">
              <div className="bg-[#00ADB5]/20 p-3 rounded-full mb-3">
                <CalendarDays className="h-6 w-6 text-[#00ADB5]" />
              </div>
              <h3 className="font-semibold mb-1">Boka konsultation</h3>
              <p className="text-sm text-foreground/70">Fyll i formuläret för att boka en tid med oss</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50 flex flex-col items-center text-center">
              <div className="bg-[#00ADB5]/20 p-3 rounded-full mb-3">
                <MessageSquare className="h-6 w-6 text-[#00ADB5]" />
              </div>
              <h3 className="font-semibold mb-1">Diskutera behov</h3>
              <p className="text-sm text-foreground/70">Vi går igenom dina behov och mål tillsammans</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50 flex flex-col items-center text-center">
              <div className="bg-[#00ADB5]/20 p-3 rounded-full mb-3">
                <Clock className="h-6 w-6 text-[#00ADB5]" />
              </div>
              <h3 className="font-semibold mb-1">Få en offert</h3>
              <p className="text-sm text-foreground/70">Vi tar fram en skräddarsydd offert baserad på dina behov</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50 flex flex-col items-center text-center">
              <div className="bg-[#00ADB5]/20 p-3 rounded-full mb-3">
                <PhoneCall className="h-6 w-6 text-[#00ADB5]" />
              </div>
              <h3 className="font-semibold mb-1">Direkt support</h3>
              <p className="text-sm text-foreground/70">Direktsupport under hela projektet</p>
            </div>
          </div>

          <ConsultationForm />
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Föredrar du att prata direkt?</h2>
            <p className="text-foreground/70 mb-4">
              Ring oss på <a href="tel:+46762761784" className="text-[#00ADB5] font-medium hover:underline">076-276 17 84</a> eller maila till{" "}
              <a href="mailto:info@skaply.se" className="text-[#00ADB5] font-medium hover:underline">info@skaply.se</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
