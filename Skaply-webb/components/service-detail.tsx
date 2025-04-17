"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Globe, Smartphone, Brain, Palette, Users, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"

const services = [
  {
    id: "web",
    title: "Webbutveckling",
    description: "Moderna, snabba och responsiva webbplatser med React, Next.js och Supabase.",
    icon: Globe,
    color: "from-[#00ADB5] to-[#0F3460]",
    features: [
      "Responsiv design för alla enheter",
      "Optimerad prestanda och laddningstider",
      "SEO-vänlig struktur",
      "Integrationer med CMS och API:er",
      "E-handelslösningar",
      "Skräddarsydda admin-paneler",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "Supabase", "TypeScript", "Node.js"],
  },
  {
    id: "app",
    title: "Apputveckling",
    description: "Skräddarsydda mobilappar och spel med React Native för iOS och Android.",
    icon: Smartphone,
    color: "from-[#0F3460] to-[#00ADB5]",
    features: [
      "Appar för iOS och Android",
      "Enhetlig kodbase med React Native",
      "Offline-funktionalitet",
      "Push-notifikationer",
      "Integrationer med enhetsspecifika funktioner",
      "Publicering på App Store och Google Play",
    ],
    technologies: ["React Native", "Expo", "Firebase", "Redux", "Native Modules", "App Store Connect"],
  },
  {
    id: "ai",
    title: "AI-lösningar",
    description: "Smarta chatbottar, automationer och AI-integrationer för ditt företag.",
    icon: Brain,
    color: "from-[#E94560] to-[#0F3460]",
    features: [
      "Kundtjänst-chatbottar",
      "Automatiserade processer",
      "Dataanalys och insikter",
      "Rekommendationssystem",
      "Textgenerering och sammanfattning",
      "Integrationer med OpenAI och andra AI-tjänster",
    ],
    technologies: ["OpenAI API", "TensorFlow", "Python", "Node.js", "Natural Language Processing", "Machine Learning"],
  },
  {
    id: "design",
    title: "Grafisk design",
    description: "Logotyper, visuell identitet och UI/UX-design som sticker ut.",
    icon: Palette,
    color: "from-[#0F3460] to-[#E94560]",
    features: [
      "Logotyper och visuell identitet",
      "UI/UX-design för webb och mobil",
      "Prototyper och wireframes",
      "Designsystem och komponenter",
      "Illustrationer och ikoner",
      "Marknadsföringsmaterial",
    ],
    technologies: ["Figma", "Adobe Creative Suite", "Sketch", "Framer", "UI/UX Principles", "Design Systems"],
  },
  {
    id: "resources",
    title: "Resurshyra",
    description: "Flexibel tillgång till utvecklare och designers vid behov.",
    icon: Users,
    color: "from-[#00ADB5] to-[#E94560]",
    features: [
      "Dedikerade utvecklare och designers",
      "Flexibla avtal och timmar",
      "Skalbar kapacitet efter behov",
      "Expertis inom specifika teknologier",
      "Projektbaserad eller löpande samarbete",
      "Snabb uppstart och integration",
    ],
    technologies: ["Frontend", "Backend", "Fullstack", "UI/UX", "DevOps", "Project Management"],
  },
]

export function ServiceDetail() {
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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
      {services.map((service, index) => {
        const ref = useRef(null)
        const [inView, setInView] = useInView({
          triggerOnce: true,
          threshold: 0.1,
        })

        return (
          <motion.div
            key={service.id}
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="relative">
              <div className={`absolute -inset-4 bg-gradient-to-r ${service.color} rounded-lg blur-lg opacity-20`} />
              <div className="relative bg-card/50 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-border/50">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${service.color}`}
                >
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-foreground/80 mb-6">{service.description}</p>

                <h4 className="font-semibold mb-3">Funktioner:</h4>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-[#00ADB5] mr-2 shrink-0" />
                      <span className="text-foreground/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white">
                  <Link href="/kontakt">
                    Kontakta oss
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-semibold">Teknologier vi använder</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {service.technologies.map((tech, i) => (
                  <Card key={i} className="border border-border/50 bg-card/30 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <p className="font-medium">{tech}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-[#16213E]/50 rounded-lg p-6 border border-[#0F3460]/30">
                <h4 className="text-xl font-semibold mb-3">Varför välja oss för {service.title.toLowerCase()}?</h4>
                <p className="text-foreground/80 mb-4">
                  Vi kombinerar teknisk expertis med kreativitet för att leverera lösningar som inte bara ser bra ut,
                  utan också presterar exceptionellt. Vårt fokus ligger på kvalitet, användarvänlighet och långsiktiga
                  resultat.
                </p>
                <p className="text-foreground/80">
                  Med vår erfarenhet inom {service.title.toLowerCase()} kan vi hjälpa dig att ta ditt projekt från idé
                  till verklighet, oavsett storlek eller komplexitet.
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

