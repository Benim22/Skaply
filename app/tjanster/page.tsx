import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServiceDetail } from "@/components/service-detail"
import { SeoSchema } from "@/components/seo-schema"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Digitala Tjänster & Lösningar | Webbutveckling, Appar & AI | Skaply",
  description: "Skräddarsydda digitala tjänster för moderna företag - webbutveckling, apputveckling, AI-lösningar, design & digital marknadsföring. Kontakta oss för en kostnadsfri konsultation!",
  keywords: [
    'webbutveckling företag', 
    'mobilappar Stockholm', 
    'skräddarsydda webbplatser', 
    'AI-integration företag', 
    'e-handelslösningar',
    'responsiv webbdesign',
    'React utvecklare',
    'SEO-tjänster',
    'digital transformation'
  ],
  openGraph: {
    title: "Digitala Tjänster & Lösningar | Webbutveckling, Appar & AI | Skaply",
    description: "Skräddarsydda digitala tjänster för moderna företag - webbutveckling, apputveckling, AI-lösningar, design & digital marknadsföring. Kontakta oss för en kostnadsfri konsultation!",
    url: "https://www.skaply.se/tjanster",
    type: "website",
    images: [
      {
        url: "https://www.skaply.se/images/tjanster-og.jpg",
        width: 1200,
        height: 630,
        alt: "Skaply - Digitala Tjänster"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitala Tjänster & Lösningar | Webbutveckling, Appar & AI | Skaply",
    description: "Skräddarsydda digitala tjänster för moderna företag - webbutveckling, apputveckling, AI-lösningar, design & digital marknadsföring.",
    images: ["https://www.skaply.se/images/tjanster-og.jpg"]
  }
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SeoSchema 
        type="Service"
        name="Digitala Tjänster & Lösningar | Webbutveckling, Appar & AI"
        description="Skräddarsydda digitala tjänster för moderna företag - webbutveckling, apputveckling, AI-lösningar, design & digital marknadsföring."
        url="https://www.skaply.se/tjanster"
        image="https://www.skaply.se/images/tjanster-og.jpg"
      />
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Våra Tjänster</h1>
        <ServiceDetail />
      </main>
      <Footer />
    </div>
  )
}
