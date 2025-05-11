import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Metadata } from "next"
import { ProjectsPage } from "@/components/projects-page"
import { SeoSchema } from "@/components/seo-schema"

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | Framgångsrika Digitala Projekt av Skaply",
  description: "Utforska Skaplys portfolio av framgångsrika digitala projekt. Se exempel på våra moderna webbplatser, appar, AI-lösningar och e-handelslösningar som hjälpt företag att växa.",
  keywords: [
    'webbportfolio', 
    'digitala case studies', 
    'framgångsrika webbprojekt', 
    'apputveckling exempel', 
    'e-handelssajter',
    'UX/UI designprojekt',
    'webbapplikationer referenser',
    'React webblösningar',
    'Next.js projekt'
  ],
  openGraph: {
    title: "Portfolio & Case Studies | Framgångsrika Digitala Projekt av Skaply",
    description: "Utforska Skaplys portfolio av framgångsrika digitala projekt. Se exempel på våra moderna webbplatser, appar, AI-lösningar och e-handelslösningar som hjälpt företag att växa.",
    url: "https://www.skaply.se/projekt",
    type: "website",
    images: [
      {
        url: "https://www.skaply.se/images/portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "Skaply - Portfolio och Case Studies"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Case Studies | Framgångsrika Digitala Projekt av Skaply",
    description: "Utforska Skaplys portfolio av framgångsrika digitala projekt. Se exempel på våra moderna webbplatser, appar, AI-lösningar och e-handelslösningar.",
    images: ["https://www.skaply.se/images/portfolio-og.jpg"]
  }
}

export default function ProjektPage() {
  return (
    <div className="min-h-screen bg-background">
      <SeoSchema 
        type="CollectionPage"
        name="Portfolio & Case Studies | Framgångsrika Digitala Projekt av Skaply"
        description="Utforska Skaplys portfolio av framgångsrika digitala projekt. Se exempel på våra moderna webbplatser, appar, AI-lösningar och e-handelslösningar."
        url="https://www.skaply.se/projekt"
        image="https://www.skaply.se/images/portfolio-og.jpg"
      />
      <Navbar />
      <main>
        <ProjectsPage />
      </main>
      <Footer />
    </div>
  )
} 