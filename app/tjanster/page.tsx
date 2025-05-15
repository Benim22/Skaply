"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServiceDetail } from "@/components/service-detail"
import { SeoSchema } from "@/components/seo-schema"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

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
        <Suspense fallback={<div>Laddar...</div>}>
          <ServicesContent />
        </Suspense>
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
