"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FormattedText } from "@/components/ui/formatted-text"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useProject, ProjectItem } from "@/contexts/project-context"
import { supabase, Project } from "@/lib/supabase"

// Konvertera Supabase Project till ProjectItem
const convertToProjectItem = (project: Project): ProjectItem => ({
  title: project.title,
  description: project.description,
  category: project.category,
  image: project.image_url,
  technologies: project.technologies,
  link: project.project_link || "#",
  featured: project.featured,
  client: project.client,
  year: project.year,
  status: project.status,
  secondaryCategory: project.secondary_category,
  progress: project.progress
})

export function PortfolioSection() {
  const router = useRouter()
  const { setSelectedProject, setShouldOpenModal } = useProject()
  const [portfolioItems, setPortfolioItems] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProjects()
  }, [])

  const fetchFeaturedProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('sort_order', { ascending: true })
        .limit(3)

      if (error) {
        console.error('Error fetching featured projects:', error)
        return
      }

      const projectItems = data.map(convertToProjectItem)
      setPortfolioItems(projectItems)
    } catch (error) {
      console.error('Error fetching featured projects:', error)
    } finally {
      setLoading(false)
    }
  }
  
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

  const handleProjectClick = (item: ProjectItem, e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedProject(item)
    setShouldOpenModal(true)
    router.push('/projekt')
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

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-[#00ADB5]/30 border-t-[#00ADB5] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-foreground/70">Laddar projekt...</p>
          </div>
        ) : (
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
                <div className="absolute top-4 right-4 bg-[#00ADB5] text-white text-xs py-1 px-3 rounded-full">
                  {item.category}
                </div>
                {item.status && (
                  <div className="absolute top-4 left-4">
                    <div className={`text-white text-xs py-1 px-2 rounded-full flex items-center gap-1 ${
                      item.status === "Pågående" ? "bg-amber-500" : "bg-emerald-500"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        item.status === "Pågående" ? "bg-amber-300 animate-pulse" : "bg-emerald-300"
                      }`}></span>
                      {item.status}
                    </div>
                  </div>
                )}
                {item.status === "Pågående" && item.progress !== undefined && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                    <div 
                      className="h-full bg-amber-500" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-[#00ADB5] transition-colors duration-300">
                    {item.title}
                  </h3>
                  {item.year && (
                    <div className="text-xs text-foreground/60">
                      {item.year}
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <p className="text-foreground/70 text-sm line-clamp-2 leading-relaxed">
                    {item.description.split('\n').find(line => 
                      line.trim() && 
                      !line.match(/^[🍣📱⚙️🛠️🎨📊🚀]/) && 
                      !line.includes(':') &&
                      line.length > 20
                    ) || item.description.split('\n')[0]}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#0F3460]/50 border border-[#0F3460]/30 py-0.5 px-2 rounded-full text-foreground/70"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 3 && (
                    <span className="text-xs py-0.5 px-1 text-foreground/50">
                      +{item.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#00ADB5] hover:text-[#00ADB5]/80 transition-colors duration-300 text-sm"
                    onClick={(e) => {
                      e.preventDefault()
                      window.open(item.link, '_blank')
                    }}
                  >
                    <span className="mr-1">Se projektet</span>
                    <ExternalLink size={14} />
                  </a>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-[#0F3460]/30 hover:bg-[#00ADB5]/10 hover:text-[#00ADB5] hover:border-[#00ADB5]/50"
                    onClick={(e) => handleProjectClick(item, e)}
                  >
                    Läs mer
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        )}

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