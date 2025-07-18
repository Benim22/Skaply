"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Eye, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useProject } from "@/contexts/project-context"

interface ProjectNotificationProps {
  project: {
    title: string
    description: string
    image: string
    link?: string
    category: string
    status: string
  }
}

export function ProjectNotification({ project }: ProjectNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)
  const router = useRouter()
  const { setSelectedProject, setShouldOpenModal } = useProject()

  useEffect(() => {
    // Kolla om notisen redan visats denna session
    const shown = sessionStorage.getItem('project-notification-shown')
    if (!shown) {
      // Visa notisen efter 2 sekunder
      const timer = setTimeout(() => {
        setIsVisible(true)
        setHasBeenShown(true)
        sessionStorage.setItem('project-notification-shown', 'true')
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleViewProject = () => {
    const projectItem = {
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image,
      technologies: ["Next.js", "React", "Tailwind CSS", "Supabase"],
      link: project.link || "#",
      status: project.status,
      featured: true
    }
    
    setSelectedProject(projectItem)
    setShouldOpenModal(true)
    router.push('/projekt')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.6
          }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-gradient-to-br from-[#16213E] to-[#1A1A2E] rounded-xl border border-[#00ADB5]/30 shadow-2xl shadow-[#00ADB5]/10 backdrop-blur-sm">
            {/* Header med close button */}
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-[#00ADB5]" />
                </motion.div>
                <Badge variant="default" className="bg-[#00ADB5] text-white">
                  Nytt projekt
                </Badge>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Projekt info */}
            <div className="px-4 pb-4">
              <h3 className="text-lg font-bold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  {project.category}
                </Badge>
                <Badge 
                  variant={project.status === "Färdig" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {project.status}
                </Badge>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleViewProject}
                  size="sm"
                  className="flex-1 bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Se projekt
                </Button>
                {project.link && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-[#00ADB5]/30 hover:bg-[#00ADB5]/10"
                  >
                    <Link href={project.link} target="_blank">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Animated border */}
            <div className="absolute inset-0 rounded-xl">
              <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-[#00ADB5]/20 via-transparent to-[#00ADB5]/20 animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 