"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail } from "lucide-react"
import { FaGithub } from "react-icons/fa"

const team = [
  {
    name: "Lucas Helmvik",
    role: "Grundare & Teknisk Ledare",
    bio: "Lucas ansvarar för den tekniska utvecklingen på Skaply och säkerställer att varje lösning lever upp till högsta krav på funktionalitet, skalbarhet och användarupplevelse. Med spetskompetens inom moderna teknologier såsom React, Next.js, TailwindCSS och Supabase utvecklar han skräddarsydda webblösningar, applikationer och AI-baserade system. Lucas har en analytisk och lösningsorienterad approach, och arbetar nära kunden för att omvandla idéer till stabila digitala produkter som skapar affärsvärde.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      github: "https://github.com/Benim22",
      email: "lucas@skaply.se",
    },
  },
  {
    name: "Daniel Örnbåge",
    role: "Grundare & Kreativ Ledare",
    bio: "Daniel är ansvarig för kunddialog, affärsutveckling och marknadsföring på Skaply. Han har en stark kommunikativ förmåga och en förståelse för hur man skapar värde genom tydlig positionering, strategisk design och varumärkesbyggande. Genom att agera bryggan mellan kund och utvecklingsteam säkerställer han att varje projekt drivs framåt effektivt, med rätt förväntningar och resultatfokus. Daniels arbete syftar till att stärka kundens digitala närvaro och långsiktiga konkurrenskraft.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      github: "#",
      email: "daniel@skaply.se",
    },
  },
]

export function TeamSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Vårt Team</h2>
        <p className="text-foreground/70">
        Bakom Skaply finns ett fokuserat och målinriktat team som kombinerar teknik, strategi och kreativitet för att skapa digitala lösningar med tydlig affärsnytta.
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {team.map((member, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="aspect-square relative overflow-hidden bg-[#16213E]">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-[#00ADB5] mb-4">{member.role}</p>
                <p className="text-foreground/70 mb-6">{member.bio}</p>
                <div className="flex space-x-4">
                  <a
                    href={member.social.linkedin}
                    className="text-foreground/60 hover:text-[#00ADB5]"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={member.social.github}
                    className="text-foreground/60 hover:text-[#00ADB5]"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-foreground/60 hover:text-[#00ADB5]"
                    aria-label="Email"
                  >
                    <Mail size={20} />
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