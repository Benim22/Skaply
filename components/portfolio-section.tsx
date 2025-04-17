"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import Link from "next/link"
import Image from "next/image"

const portfolioItems = [
  {
    title: "TechFlow",
    description: "Modern e-handelsplattform för teknikprodukter med sömlös betalningsintegration och lagerhantering.",
    category: "E-handel",
    image: "/placeholder.jpg",
    technologies: ["React", "Next.js", "Supabase", "Stripe"],
    link: "#",
  },
  {
    title: "Hälsa App",
    description: "Mobilapp för träning och kostregistrering med personliga rekommendationer driven av AI.",
    category: "Apputveckling",
    image: "/placeholder.jpg",
    technologies: ["React Native", "Firebase", "TensorFlow"],
    link: "#",
  },
  {
    title: "FinTech Dashboard",
    description: "Avancerad finansiell plattform med realtidsdata och visualiseringar för investeringsbeslut.",
    category: "AI-lösningar",
    image: "/placeholder.jpg",
    technologies: ["React", "Node.js", "D3.js", "OpenAI API"],
    link: "#",
  },
  {
    title: "GreenGrow",
    description: "Varumärkesidentitet och webbdesign för ett innovativt miljövänligt jordbruksföretag.",
    category: "Grafisk design",
    image: "/placeholder.jpg",
    technologies: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
    link: "#",
  },
]

export function PortfolioSection() {
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Våra projekt</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Här är några av de projekt vi har arbetat med. Vi är stolta över resultaten och våra nöjda kunder.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-[#16213E]/50 rounded-lg overflow-hidden border border-[#0F3460]/30 hover:border-[#00ADB5]/50 transition-all duration-500"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16213E] to-transparent opacity-70"></div>
                <div className="absolute top-4 left-4 bg-[#00ADB5] text-white text-xs py-1 px-3 rounded-full">
                  {item.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#00ADB5] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-foreground/70 mb-4">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#0F3460]/50 border border-[#0F3460]/30 py-1 px-2 rounded-full text-foreground/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={item.link}
                  className="inline-flex items-center text-[#00ADB5] hover:text-[#00ADB5]/80 transition-colors duration-300"
                >
                  <span className="mr-1">Se projektet</span>
                  <ExternalLink size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white">
            <Link href="/projekt">
              Se alla projekt
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 