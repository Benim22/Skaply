import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServiceDetail } from "@/components/service-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tjänster | Skaply",
  description: "Upptäck våra tjänster inom webbutveckling, apputveckling, AI-lösningar och grafisk design.",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Våra Tjänster</h1>
        <ServiceDetail />
      </main>
      <Footer />
    </div>
  )
}
