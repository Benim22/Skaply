import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt | Skaply",
  description: "Kontakta oss för en gratis konsultation om ditt nästa digitala projekt.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Kontakta Oss</h1>
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}

