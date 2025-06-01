"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail, ChevronDown, ChevronUp, Brain } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const team = [
  {
    name: "Lucas Helmvik",
    role: "Fullstack Utvecklare & Teknisk Arkitekt",
    bio: "Lucas ansvarar för den tekniska utvecklingen på Skaply och säkerställer att varje lösning lever upp till högsta krav på funktionalitet, skalbarhet och användarupplevelse. Med spetskompetens inom moderna teknologier såsom React, Next.js, TailwindCSS och Supabase utvecklar han skräddarsydda webblösningar, applikationer och AI-baserade system. Lucas har en analytisk och lösningsorienterad approach, och arbetar nära kunden för att omvandla idéer till stabila digitala produkter som skapar affärsvärde.",
    bioShort: "Lucas ansvarar för den tekniska utvecklingen på Skaply med spetskompetens inom React, Next.js, TailwindCSS och Supabase. Han utvecklar skräddarsydda webblösningar med fokus på funktionalitet, skalbarhet och användarupplevelse.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      github: "https://github.com/Benim22",
      email: "lucas@skaply.se",
    },
  },
  {
    name: "Daniel Örnbåge",
    role: "Affärsutvecklare & Strategisk Rådgivare",
    bio: "Daniel är ansvarig för kunddialog, affärsutveckling och marknadsföring på Skaply. Han har en stark kommunikativ förmåga och en förståelse för hur man skapar värde genom tydlig positionering, strategisk design och varumärkesbyggande. Genom att agera bryggan mellan kund och utvecklingsteam säkerställer han att varje projekt drivs framåt effektivt, med rätt förväntningar och resultatfokus. Daniels arbete syftar till att stärka kundens digitala närvaro och långsiktiga konkurrenskraft.",
    bioShort: "Daniel ansvarar för kunddialog, affärsutveckling och marknadsföring på Skaply. Med stark kommunikativ förmåga skapar han värde genom tydlig positionering och strategisk design.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      github: "#",
      email: "daniel@skaply.se",
    },
  },
  {
    name: "Marcus Petersson",
    role: "AI-specialist & Innovationsansvarig",
    bio: "Marcus leder Skaplys AI-initiativ och utvecklar intelligenta lösningar som transformerar användarupplevelser och affärsprocesser. Med djup kunskap inom maskininlärning, naturlig språkbehandling och moderna AI-ramverk såsom TensorFlow och OpenAI skapar han skräddarsydda AI-lösningar som integreras sömlöst i våra digitala produkter. Marcus har en visionär approach till teknologi och fokuserar på att göra avancerad AI tillgänglig och användbar för våra kunder, samtidigt som han säkerställer etisk och ansvarstagande implementering.",
    bioShort: "Marcus leder Skaplys AI-initiativ och utvecklar intelligenta lösningar med djup kunskap inom maskininlärning och naturlig språkbehandling för att skapa användbara AI-lösningar.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      github: "#",
      email: "marcus@skaply.se",
    },
  },
]

export function TeamSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [expandedBios, setExpandedBios] = useState<{[key: string]: boolean}>({})

  const toggleBio = (name: string) => {
    setExpandedBios(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      },
    },
  }

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-[#00ADB5]/10 border border-[#00ADB5]/20 rounded-full px-4 py-2 mb-6">
          <Brain className="h-4 w-4 text-[#00ADB5]" />
          <span className="text-sm text-[#00ADB5] font-medium">Vårt Expertteam</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ADB5] via-white to-[#E94560]">
          Människorna som Driver Innovation
        </h2>
        <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
          Bakom Skaply finns ett fokuserat och målinriktat team som kombinerar teknik, strategi och kreativitet 
          för att skapa digitala lösningar med tydlig affärsnytta.
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {team.map((member, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="group overflow-hidden border border-[#0F3460]/30 bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl hover:border-[#00ADB5]/50 transition-all duration-300 h-full">
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#16213E]/80 via-transparent to-transparent z-10" />
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00ADB5] to-[#00ADB5]/80 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00ADB5] transition-colors duration-300">{member.name}</h3>
                  <p className="text-[#00ADB5] text-sm font-medium">{member.role}</p>
                </div>
                
                {/* Mobil visning med läs mer-funktion */}
                <div className="md:hidden flex-grow">
                  <p className="text-foreground/70 text-sm mb-3 leading-relaxed">
                    {expandedBios[member.name] ? member.bio : member.bioShort}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleBio(member.name)} 
                    className="flex items-center text-[#00ADB5] hover:text-[#00ADB5] hover:bg-[#00ADB5]/10 p-0 h-auto mb-4 text-xs"
                  >
                    {expandedBios[member.name] ? (
                      <>Visa mindre <ChevronUp className="ml-1 h-3 w-3" /></>
                    ) : (
                      <>Läs mer <ChevronDown className="ml-1 h-3 w-3" /></>
                    )}
                  </Button>
                </div>
                
                {/* Desktop visning med kortare bio */}
                <div className="hidden md:block flex-grow">
                  <p className="text-foreground/70 text-sm mb-4 leading-relaxed line-clamp-4">{member.bioShort}</p>
                </div>
                
                <div className="flex space-x-3 pt-2 border-t border-[#0F3460]/30">
                  <a
                    href={member.social.linkedin}
                    className="text-foreground/50 hover:text-[#00ADB5] transition-colors duration-200 p-2 hover:bg-[#00ADB5]/10 rounded-lg"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={member.social.github}
                    className="text-foreground/50 hover:text-[#00ADB5] transition-colors duration-200 p-2 hover:bg-[#00ADB5]/10 rounded-lg"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={16} />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-foreground/50 hover:text-[#00ADB5] transition-colors duration-200 p-2 hover:bg-[#00ADB5]/10 rounded-lg"
                    aria-label="Email"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}