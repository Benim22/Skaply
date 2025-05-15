"use client"

import { createContext, useContext, useState, ReactNode } from "react"

// Gemensam projekttyp som används genom applikationen
export interface ProjectItem {
  title: string
  description: string
  category: string
  image: string
  technologies: string[]
  link: string
  featured?: boolean
  client?: string
  year?: string
  status?: string
  secondaryCategory?: string
  progress?: number
}

interface ProjectContextType {
  selectedProject: ProjectItem | null
  setSelectedProject: (project: ProjectItem | null) => void
  shouldOpenModal: boolean
  setShouldOpenModal: (value: boolean) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [shouldOpenModal, setShouldOpenModal] = useState(false)

  return (
    <ProjectContext.Provider 
      value={{ 
        selectedProject, 
        setSelectedProject, 
        shouldOpenModal, 
        setShouldOpenModal 
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProject måste användas inom en ProjectProvider")
  }
  return context
} 