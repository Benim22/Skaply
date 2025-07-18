"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Filter, X, Sparkles, ArrowRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FormattedText } from "@/components/ui/formatted-text"
import { ProjectGallery } from "@/components/ui/project-gallery"
import { ModalGallery } from "@/components/ui/modal-gallery"
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
  progress: project.progress,
  gallery: (project as any).image_gallery || []
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
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0A0B1E] via-[#1A1A2E] to-[#16213E] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00ADB5]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E94560]/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#00ADB5]/10 border border-[#00ADB5]/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-[#00ADB5]" />
                <span className="text-sm text-[#00ADB5] font-medium">Portfolio & Case Studies</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ADB5] via-white to-[#E94560]">
                Våra Framgångsrika
                <br />
                <span className="text-white">Projekt</span>
              </h1>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                Utforska vår portfolio av innovativa digitala lösningar som hjälpt företag att växa och lyckas. 
                Varje projekt är skräddarsytt för att möta unika behov och mål.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="mb-12">
              <div className="flex justify-center items-center gap-3 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
                <div className="flex items-center gap-2 text-foreground/60 mr-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium hidden sm:block">Filtrera:</span>
                </div>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className={
                    activeCategory === category
                        ? "bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 hover:from-[#00ADB5]/90 hover:to-[#00ADB5]/70 text-white border-0 shadow-lg shadow-[#00ADB5]/25"
                        : "border-[#0F3460]/50 hover:bg-[#00ADB5]/10 hover:text-[#00ADB5] hover:border-[#00ADB5]/50 backdrop-blur-sm bg-[#16213E]/30 transition-all duration-300"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          </ScrollReveal>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-12 max-w-xl mx-auto border border-[#0F3460]/30 shadow-2xl">
                <div className="w-12 h-12 border-3 border-[#00ADB5]/30 border-t-[#00ADB5] rounded-full animate-spin mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-white mb-2">Laddar fantastiska projekt</h3>
                <p className="text-foreground/70">Förbereder våra bästa verk för dig...</p>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl p-12 max-w-xl mx-auto border border-[#0F3460]/30 shadow-2xl">
                <div className="w-16 h-16 bg-[#00ADB5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="h-8 w-8 text-[#00ADB5]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Inga projekt i denna kategori</h3>
                <p className="text-foreground/70 mb-6">Vi arbetar kontinuerligt med nya spännande projekt. Kom gärna tillbaka snart!</p>
                <Button 
                  variant="default" 
                  className="bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 hover:from-[#00ADB5]/90 hover:to-[#00ADB5]/70 text-white border-0 shadow-lg shadow-[#00ADB5]/25"
                  onClick={() => setActiveCategory("Alla")}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Visa alla projekt
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${index}`}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-[#0F3460]/30 hover:border-[#00ADB5]/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#00ADB5]/10"
                >
                  <div className="relative h-64 overflow-hidden">
                    <ProjectGallery
                      images={project.gallery && project.gallery.length > 0 ? project.gallery : [project.image]}
                      title={project.title}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16213E] via-transparent to-transparent opacity-80"></div>
                    
                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 text-white text-xs py-2 px-3 rounded-full backdrop-blur-sm shadow-lg">
                        {project.category}
                      </div>
                    </div>
                    
                    {/* Status badge */}
                    {project.status && (
                      <div className="absolute top-4 left-4">
                        <div className={`text-white text-xs py-2 px-3 rounded-full flex items-center gap-2 backdrop-blur-sm shadow-lg ${
                          project.status === "Pågående" ? "bg-gradient-to-r from-amber-500 to-amber-600" : "bg-gradient-to-r from-emerald-500 to-emerald-600"
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            project.status === "Pågående" ? "bg-amber-300 animate-pulse" : "bg-emerald-300"
                          }`}></span>
                          {project.status}
                        </div>
                      </div>
                    )}
                    
                    {/* Progress bar for ongoing projects */}
                    {project.status === "Pågående" && project.progress !== undefined && (
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/40 backdrop-blur-sm">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-1000" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    )}
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00ADB5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold group-hover:text-[#00ADB5] transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      <div className="text-sm text-foreground/60 bg-[#0F3460]/30 px-2 py-1 rounded-md">
                        {project.year}
                      </div>
                    </div>
                    
                    <p className="text-foreground/80 mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-[#0F3460]/50 border border-[#0F3460]/30 py-1.5 px-3 rounded-full text-foreground/80 backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs py-1.5 px-2 text-[#00ADB5] font-medium">
                          +{project.technologies.length - 3} till
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link
                        href={project.link}
                        className="inline-flex items-center text-[#00ADB5] hover:text-[#00ADB5]/80 transition-all duration-300 text-sm font-medium group/link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="mr-2">Besök projekt</span>
                        <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                      </Link>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-[#0F3460]/30 hover:bg-[#00ADB5]/10 hover:text-[#00ADB5] hover:border-[#00ADB5]/50 transition-all duration-300 backdrop-blur-sm"
                        onClick={() => openModal(project)}
                      >
                        <Eye className="h-3 w-3 mr-1.5" />
                        Detaljer
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <div className="mt-20 text-center">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-3xl border border-[#0F3460]/30 shadow-2xl">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00ADB5] to-[#00ADB5]/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Har du ett projekt i åtanke?</h2>
                  <p className="text-foreground/80 text-lg leading-relaxed max-w-2xl mx-auto">
                    Vi hjälper dig att förvandla dina idéer till verklighet med skräddarsydda digitala lösningar. 
                    Låt oss skapa något extraordinärt tillsammans.
                  </p>
                </div>
                
                <div className="bg-[#00ADB5]/5 border border-[#00ADB5]/20 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">💰 Transparenta Priser</h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    Alla våra priser och paket finns tillgängliga på vår kontaktsida. 
                    Skicka en konsultationsförfrågan så får du detaljerad information om kostnader för ditt specifika projekt.
                </p>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="border-[#00ADB5]/30 hover:bg-[#00ADB5]/10 hover:text-[#00ADB5] hover:border-[#00ADB5]/50 text-xs"
                  >
                    <Link href="/kontakt">
                      Se priser & paket
                      <ArrowRight className="h-3 w-3 ml-1.5" />
                    </Link>
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 hover:from-[#00ADB5]/90 hover:to-[#00ADB5]/70 text-white border-0 shadow-lg shadow-[#00ADB5]/25"
                  >
                    <Link href="/kontakt">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Starta ditt projekt
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline"
                    className="border-[#0F3460]/30 hover:bg-[#00ADB5]/10 hover:text-[#00ADB5] hover:border-[#00ADB5]/50 backdrop-blur-sm"
                  >
                    <Link href="/tjanster">
                      Utforska våra tjänster
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Enhanced Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-[#16213E] to-[#1A1A2E] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#0F3460]/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 sm:h-96">
              <ModalGallery
                images={selectedProject.gallery && selectedProject.gallery.length > 0 ? selectedProject.gallery : [selectedProject.image]}
                title={selectedProject.title}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16213E] via-transparent to-transparent opacity-80 rounded-t-3xl pointer-events-none"></div>
              
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>
              
              <div className="absolute top-4 left-4">
                <div className="bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 text-white text-sm py-2 px-4 rounded-full backdrop-blur-sm shadow-lg">
                  {selectedProject.category}
                </div>
              </div>
              
              {selectedProject.status && (
                <div className="absolute top-16 left-4">
                  <div className={`text-white text-sm py-2 px-4 rounded-full flex items-center gap-2 backdrop-blur-sm shadow-lg ${
                    selectedProject.status === "Pågående" ? "bg-gradient-to-r from-amber-500 to-amber-600" : "bg-gradient-to-r from-emerald-500 to-emerald-600"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      selectedProject.status === "Pågående" ? "bg-amber-300 animate-pulse" : "bg-emerald-300"
                    }`}></span>
                    {selectedProject.status}
                  </div>
                </div>
              )}
              
              {selectedProject.status === "Pågående" && selectedProject.progress !== undefined && (
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/40 backdrop-blur-sm rounded-b-lg">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-1000 rounded-b-lg relative"
                    style={{ width: `${selectedProject.progress}%` }}
                  >
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-bold">
                      {selectedProject.progress}%
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                <div className="text-sm text-foreground/60 bg-[#0F3460]/30 px-3 py-1.5 rounded-lg">
                  {selectedProject.year}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-sm uppercase text-[#00ADB5] mb-2 font-semibold tracking-wider">Projektbeskrivning</h3>
                <FormattedText 
                  content={selectedProject.description} 
                  className="text-base"
                />
              </div>
              
              {selectedProject.client && (
                <div className="mb-8">
                  <h3 className="text-sm uppercase text-[#00ADB5] mb-2 font-semibold tracking-wider">Klient</h3>
                  <p className="text-foreground/90 text-lg">{selectedProject.client}</p>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-sm uppercase text-[#00ADB5] mb-3 font-semibold tracking-wider">Teknologier & Verktyg</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-sm bg-[#0F3460]/50 border border-[#0F3460]/30 py-2 px-4 rounded-full text-foreground/90 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-8">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 hover:from-[#00ADB5]/90 hover:to-[#00ADB5]/70 text-white border-0 shadow-lg shadow-[#00ADB5]/25"
                >
                  <Link href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    Besök projektet
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border-[#0F3460]/30 hover:bg-[#00ADB5]/10 hover:text-[#00ADB5] hover:border-[#00ADB5]/50 backdrop-blur-sm"
                >
                  <Link href="/kontakt">
                    <Sparkles size={16} className="mr-2" />
                    Skapa liknande projekt
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
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