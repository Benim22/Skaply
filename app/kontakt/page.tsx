import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ConsultationForm } from "@/components/consultation-form"
import { Clock, CalendarDays, MessageSquare, PhoneCall } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt & Konsultation | Skaply",
  description: "Få en gratis konsultation för ditt digitala projekt. Vår expertis står till ditt förfogande.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
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
