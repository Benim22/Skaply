"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
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

const categories = [
  "Alla",
  "Webbutveckling",
  "Apputveckling",
  "Renoverade hemsidor",
  "Pågående projekt",
  "AI-lösningar",
  "Grafisk design",
  "Digital Marknadsföring",
  "E-handel",
]

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("Alla")
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const { selectedProject: contextProject, shouldOpenModal, setShouldOpenModal } = useProject()
  
  useEffect(() => {
    fetchProjects()
  }, [])
  
  useEffect(() => {
    // Om ett projekt är valt via kontexten, öppna modalen för det projektet
    if (contextProject && shouldOpenModal) {
      setSelectedProject(contextProject)
      setShouldOpenModal(false) // Återställ flaggan
      document.body.style.overflow = 'hidden'
    }
  }, [contextProject, shouldOpenModal, setShouldOpenModal])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) {
        console.error('Error fetching projects:', error)
        return
      }

      const projectItems = data.map(convertToProjectItem)
      setProjects(projectItems)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const filteredProjects = projects.filter((project: ProjectItem) => {
    // Filter by category
    return activeCategory === "Alla" || 
           project.category === activeCategory || 
           project.secondaryCategory === activeCategory
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

  const openModal = (project: ProjectItem) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'auto'
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
          
          {loading ? (
            <div className="text-center py-12">
              <div className="bg-[#16213E]/50 rounded-lg p-8 max-w-xl mx-auto border border-[#0F3460]/30">
                <div className="w-8 h-8 border-2 border-[#00ADB5]/30 border-t-[#00ADB5] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-lg text-foreground/70">Laddar projekt...</p>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-[#16213E]/50 rounded-lg p-8 max-w-xl mx-auto border border-[#0F3460]/30">
                <p className="text-lg text-foreground/70 mb-3">Vi har för tillfället inga projekt i denna kategori.</p>
                <p className="text-sm text-foreground/60 mb-5">Besök oss gärna igen inom kort då vi kontinuerligt uppdaterar vår portfolio med nya spännande projekt.</p>
                <Button 
                  variant="default" 
                  className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white"
                  onClick={() => setActiveCategory("Alla")}
                >
                  Visa alla projekt
                </Button>
              </div>
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
                    {project.status && (
                      <div className="absolute top-3 left-3">
                        <div className={`text-white text-xs py-1 px-2 rounded-full flex items-center gap-1 ${
                          project.status === "Pågående" ? "bg-amber-500" : "bg-emerald-500"
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            project.status === "Pågående" ? "bg-amber-300 animate-pulse" : "bg-emerald-300"
                          }`}></span>
                          {project.status}
                        </div>
                      </div>
                    )}
                    {project.status === "Pågående" && project.progress !== undefined && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                        <div 
                          className="h-full bg-amber-500" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    )}
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
                    
                    <div className="flex justify-between items-center">
                      <Link
                        href={project.link}
                        className="inline-flex items-center text-[#00ADB5] hover:text-[#00ADB5]/80 transition-colors duration-300 text-sm"
                      >
                        <span className="mr-1">Se projektet</span>
                        <ExternalLink size={14} />
                      </Link>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-[#0F3460]/30 hover:bg-[#00ADB5]/10 hover:text-[#00ADB5] hover:border-[#00ADB5]/50"
                        onClick={() => openModal(project)}
                      >
                        Läs mer
                      </Button>
                    </div>
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
      
      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-[#16213E] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 sm:h-80">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16213E] to-transparent opacity-70"></div>
              <button 
                onClick={closeModal}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute top-3 left-3">
                <div className="bg-[#00ADB5] text-white text-xs py-1 px-2 rounded-full">
                  {selectedProject.category}
                </div>
              </div>
              {selectedProject.status && (
                <div className="absolute top-12 left-3">
                  <div className={`text-white text-xs py-1 px-2 rounded-full flex items-center gap-1 ${
                    selectedProject.status === "Pågående" ? "bg-amber-500" : "bg-emerald-500"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      selectedProject.status === "Pågående" ? "bg-amber-300 animate-pulse" : "bg-emerald-300"
                    }`}></span>
                    {selectedProject.status}
                  </div>
                </div>
              )}
              {selectedProject.status === "Pågående" && selectedProject.progress !== undefined && (
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/30">
                  <div 
                    className="h-full bg-amber-500" 
                    style={{ width: `${selectedProject.progress}%` }}
                  >
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-bold">{selectedProject.progress}%</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                <div className="text-sm text-foreground/60">
                  {selectedProject.year}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm uppercase text-foreground/60 mb-1">Beskrivning</h3>
                <p className="text-foreground/90">{selectedProject.description}</p>
              </div>
              
              {selectedProject.client && (
                <div className="mb-6">
                  <h3 className="text-sm uppercase text-foreground/60 mb-1">Klient</h3>
                  <p className="text-foreground/90">{selectedProject.client}</p>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-sm uppercase text-foreground/60 mb-1">Teknologier</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-sm bg-[#0F3460]/50 border border-[#0F3460]/30 py-1 px-3 rounded-full text-foreground/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button 
                  asChild
                  className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white"
                >
                  <Link href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    Besök projektet
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
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