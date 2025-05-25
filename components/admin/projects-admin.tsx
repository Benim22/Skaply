"use client"

import { useState, useEffect } from "react"
import { supabase, Project } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Pencil, Trash2, Plus, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

export function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const { toast } = useToast()

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Webbutveckling",
    image_url: "",
    technologies: "",
    project_link: "",
    featured: false,
    client: "",
    year: new Date().getFullYear().toString(),
    status: "Pågående" as const,
    secondary_category: "",
    progress: 0,
    sort_order: 0
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      toast({
        title: "Fel",
        description: "Kunde inte hämta projekt",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        progress: formData.status === 'Pågående' ? formData.progress : null
      }

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id)

        if (error) throw error
        
        toast({
          title: "Uppdaterat",
          description: "Projektet har uppdaterats"
        })
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData])

        if (error) throw error
        
        toast({
          title: "Skapat",
          description: "Nytt projekt har skapats"
        })
      }

      setIsDialogOpen(false)
      resetForm()
      fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
      toast({
        title: "Fel",
        description: "Kunde inte spara projektet",
        variant: "destructive"
      })
    }
  }

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete.id)

      if (error) throw error

      toast({
        title: "✅ Borttaget",
        description: `Projektet "${projectToDelete.title}" har tagits bort permanent`
      })
      
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      toast({
        title: "❌ Fel",
        description: "Kunde inte ta bort projektet. Försök igen senare.",
        variant: "destructive"
      })
    } finally {
      setDeleteConfirmOpen(false)
      setProjectToDelete(null)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image_url: project.image_url,
      technologies: project.technologies.join(', '),
      project_link: project.project_link || "",
      featured: project.featured,
      client: project.client || "",
      year: project.year || new Date().getFullYear().toString(),
      status: project.status || "Pågående",
      secondary_category: project.secondary_category || "",
      progress: project.progress || 0,
      sort_order: project.sort_order
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setEditingProject(null)
    setFormData({
      title: "",
      description: "",
      category: "Webbutveckling",
      image_url: "",
      technologies: "",
      project_link: "",
      featured: false,
      client: "",
      year: new Date().getFullYear().toString(),
      status: "Pågående",
      secondary_category: "",
      progress: 0,
      sort_order: 0
    })
  }

  if (loading) {
    return <div>Laddar projekt...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Projekt</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Lägg till projekt
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>
                    {project.category} • {project.year} • {project.status}
                    {project.featured && " • ⭐ Utvald"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(project)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteClick(project)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="text-xs bg-secondary px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Redigera projekt" : "Lägg till nytt projekt"}
            </DialogTitle>
            <DialogDescription>
              Fyll i informationen nedan för att {editingProject ? "uppdatera" : "skapa"} projektet.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titel</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Klient</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beskrivning</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Webbutveckling">Webbutveckling</SelectItem>
                    <SelectItem value="Apputveckling">Apputveckling</SelectItem>
                    <SelectItem value="AI-lösningar">AI-lösningar</SelectItem>
                    <SelectItem value="E-handel">E-handel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "Pågående" | "Färdig" | "Pausad") => 
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pågående">Pågående</SelectItem>
                    <SelectItem value="Färdig">Färdig</SelectItem>
                    <SelectItem value="Pausad">Pausad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.status === 'Pågående' && (
              <div className="space-y-2">
                <Label htmlFor="progress">Progress ({formData.progress}%)</Label>
                <Input
                  id="progress"
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image_url">Bild URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="/images/projekt.png"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_link">Projekt länk</Label>
                <Input
                  id="project_link"
                  value={formData.project_link}
                  onChange={(e) => setFormData({ ...formData, project_link: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technologies">Teknologier (kommaseparerade)</Label>
              <Input
                id="technologies"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="React, Next.js, Tailwind CSS"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">År</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  maxLength={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sort_order">Sorteringsordning</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Utvalt projekt</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsDialogOpen(false)
                resetForm()
              }}>
                Avbryt
              </Button>
              <Button type="submit">
                {editingProject ? "Uppdatera" : "Skapa"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleDeleteConfirm}
        title="Ta bort projekt"
        itemName={projectToDelete?.title}
        description={`Är du säker på att du vill ta bort projektet "${projectToDelete?.title}"? Denna åtgärd kan inte ångras och all projektdata kommer att försvinna permanent.`}
        confirmText="Ta bort projekt"
        cancelText="Behåll projekt"
      />
    </div>
  )
} 