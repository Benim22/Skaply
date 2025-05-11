import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { VisionSection } from "@/components/vision-section"
import { ProcessSection } from "@/components/process-section"
import { SeoSchema } from "@/components/seo-schema"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Om Skaply | Din Partner för Digital Transformation | Expertteam inom Webbdesign",
  description: "Möt teamet bakom Skaply - en ledande digitalbyrå med passion för innovation. Vi kombinerar teknisk expertis med kreativitet för att skapa framtidens digitala upplevelser.",
  keywords: [
    'digitalbyrå Stockholm', 
    'webbutvecklingsteam', 
    'teknisk expertis', 
    'kreativ digitalbyrå', 
    'Next.js utvecklare',
    'Supabase experter',
    'digitala innovatörer',
    'företagshistoria tech',
    'digital transformation partner'
  ],
  openGraph: {
    title: "Om Skaply | Din Partner för Digital Transformation | Expertteam inom Webbdesign",
    description: "Möt teamet bakom Skaply - en ledande digitalbyrå med passion för innovation. Vi kombinerar teknisk expertis med kreativitet för att skapa framtidens digitala upplevelser.",
    url: "https://www.skaply.se/om-oss",
    type: "website",
    images: [
      {
        url: "https://www.skaply.se/images/team-og.jpg",
        width: 1200,
        height: 630,
        alt: "Skaply - Expertteam inom Webbdesign"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Skaply | Din Partner för Digital Transformation | Expertteam inom Webbdesign",
    description: "Möt teamet bakom Skaply - en ledande digitalbyrå med passion för innovation. Vi kombinerar teknisk expertis med kreativitet för att skapa framtidens digitala upplevelser.",
    images: ["https://www.skaply.se/images/team-og.jpg"]
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SeoSchema 
        type="AboutPage"
        name="Om Skaply | Din Partner för Digital Transformation"
        description="Möt teamet bakom Skaply - en ledande digitalbyrå med passion för innovation. Vi kombinerar teknisk expertis med kreativitet för att skapa framtidens digitala upplevelser."
        url="https://www.skaply.se/om-oss"
        image="https://www.skaply.se/images/team-og.jpg"
      />
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
