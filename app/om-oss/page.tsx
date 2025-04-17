import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { VisionSection } from "@/components/vision-section"
import { ProcessSection } from "@/components/process-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Om Oss | Skaply",
  description: "Lär känna teamet bakom Skaply och vår vision för framtidens digitala lösningar.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Om Skaply</h1>
        <TeamSection />
        <ProcessSection />
        <VisionSection />
      </main>
      <Footer />
    </div>
  )
}
