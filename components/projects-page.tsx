"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

interface ProjectItem {
  title: string
  description: string
  category: string
  image: string
  technologies: string[]
  link: string
  featured?: boolean
  client?: string
  year?: string
}

const allProjects: ProjectItem[] = [
  {
    title: "TechFlow",
    description: "Modern e-handelsplattform för teknikprodukter med sömlös betalningsintegration och lagerhantering.",
    category: "E-handel",
    image: "/placeholder.jpg",
    technologies: ["React", "Next.js", "Supabase", "Stripe"],
    link: "#",
    featured: true,
    client: "TechFlow AB",
    year: "2024",
  },
  {
    title: "Hälsa App",
    description: "Mobilapp för träning och kostregistrering med personliga rekommendationer driven av AI.",
    category: "Apputveckling",
    image: "/placeholder.jpg",
    technologies: ["React Native", "Firebase", "TensorFlow"],
    link: "#",
    featured: true,
    client: "Hälsoperspektiv Sverige",
    year: "2023",
  },
  {
    title: "FinTech Dashboard",
    description: "Avancerad finansiell plattform med realtidsdata och visualiseringar för investeringsbeslut.",
    category: "AI-lösningar",
    image: "/placeholder.jpg",
    technologies: ["React", "Node.js", "D3.js", "OpenAI API"],
    link: "#",
    featured: true,
    client: "Finans Direkt",
    year: "2024",
  },
  {
    title: "GreenGrow",
    description: "Varumärkesidentitet och webbdesign för ett innovativt miljövänligt jordbruksföretag.",
    category: "Grafisk design",
    image: "/placeholder.jpg",
    technologies: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
    link: "#",
    featured: true,
    client: "GreenGrow",
    year: "2023",
  },
  {
    title: "SocialBoost",
    description: "Kampanjverktyg för sociala medier med automatiserade flöden och dataanalys.",
    category: "Digital Marknadsföring",
    image: "/placeholder.jpg",
    technologies: ["React", "Node.js", "Meta API", "Google Analytics"],
    link: "#",
    client: "MediaForce",
    year: "2024",
  },
  {
    title: "FashionStore",
    description: "E-handelslösning för modebranschen med virtuella provrum och personaliserad shopping.",
    category: "E-handel",
    image: "/placeholder.jpg",
    technologies: ["React", "Shopify", "Three.js", "Tailwind CSS"],
    link: "#",
    client: "StyleMode",
    year: "2023",
  },
]

const categories = [
  "Alla",
  "Webbutveckling",
  "Apputveckling",
  "AI-lösningar",
  "Grafisk design",
  "Digital Marknadsföring",
  "E-handel",
]

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("Alla")
  
  const filteredProjects = allProjects.filter(project => {
    // Filter by category
    return activeCategory === "Alla" || project.category === activeCategory
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <>
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#1A1A2E] to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00ADB5] via-white to-[#E94560]">
                Våra Projekt
              </h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Här är några av de projekt vi arbetat med. Kontakta oss för mer information om hur vi kan hjälpa just ert företag.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="mb-8">
            <div className="flex justify-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <Filter className="h-4 w-4 text-foreground/60" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className={
                    activeCategory === category
                      ? "bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white"
                      : "border-border/50 hover:bg-[#00ADB5]/10 hover:text-[#00ADB5] hover:border-[#00ADB5]/50"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-foreground/70">Inga projekt hittades i denna kategori.</p>
              <Button 
                variant="link" 
                className="text-[#00ADB5] mt-2"
                onClick={() => setActiveCategory("Alla")}
              >
                Visa alla projekt
              </Button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${index}`}
                  variants={itemVariants}
                  className="group relative bg-[#16213E]/50 rounded-lg overflow-hidden border border-[#0F3460]/30 hover:border-[#00ADB5]/50 transition-all duration-500"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16213E] to-transparent opacity-70"></div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-[#00ADB5] text-white text-xs py-1 px-2 rounded-full">
                        {project.category}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold group-hover:text-[#00ADB5] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="text-xs text-foreground/60">
                        {project.year}
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground/70 mb-3 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-[#0F3460]/50 border border-[#0F3460]/30 py-0.5 px-2 rounded-full text-foreground/70"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs py-0.5 px-1 text-foreground/50">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <Link
                      href={project.link}
                      className="inline-flex items-center text-[#00ADB5] hover:text-[#00ADB5]/80 transition-colors duration-300 text-sm"
                    >
                      <span className="mr-1">Se projektet</span>
                      <ExternalLink size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <div className="mt-10 text-center">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto p-6 bg-[#16213E]/50 rounded-lg border border-[#0F3460]/30">
                <h2 className="text-xl font-bold mb-3">Har du ett projekt i åtanke?</h2>
                <p className="text-foreground/70 mb-5">
                  Vi hjälper dig att förvandla dina idéer till verklighet. Kontakta oss för en gratis konsultation.
                </p>
                <Button asChild className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white">
                  <Link href="/kontakt">Kontakta oss</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
} 