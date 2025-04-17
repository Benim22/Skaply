import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Metadata } from "next"
import { ProjectsPage } from "@/components/projects-page"

export const metadata: Metadata = {
  title: "Projekt | Skaply",
  description: "Utforska våra senaste projekt inom webbutveckling, apputveckling, AI-lösningar, grafisk design, digital marknadsföring och e-handel.",
  openGraph: {
    title: "Våra projekt | Skaply",
    description: "Utforska våra senaste projekt och case studies inom olika digitala områden.",
    url: "https://www.skaply.se/projekt",
  }
}

export default function ProjektPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <ProjectsPage />
      </main>
      <Footer />
    </div>
  )
} 