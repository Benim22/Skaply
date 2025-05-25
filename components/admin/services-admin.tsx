"use client"

import { useState, useEffect } from "react"
import { supabase, Service } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Pencil, Trash2, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

export function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null)
  const { toast } = useToast()

  // Form states
  const [formData, setFormData] = useState({
    service_id: "",
    title: "",
    description: "",
    icon_name: "",
    color_from: "#00ADB5",
    color_to: "#E94560",
    features: "",
    technologies: "",
    pricing_basic: "",
    pricing_standard: "",
    pricing_premium: "",
    pricing_hourly: "",
    pricing_description: "",
    sort_order: 0,
    is_active: true
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
      toast({
        title: "Fel",
        description: "Kunde inte hämta tjänster",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const serviceData = {
        ...formData,
        features: formData.features.split('\n').map(f => f.trim()).filter(Boolean),
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
      }

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id)

        if (error) throw error
        
        toast({
          title: "Uppdaterat",
          description: "Tjänsten har uppdaterats"
        })
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceData])

        if (error) throw error
        
        toast({
          title: "Skapat",
          description: "Ny tjänst har skapats"
        })
      }

      setIsDialogOpen(false)
      resetForm()
      fetchServices()
    } catch (error) {
      console.error('Error saving service:', error)
      toast({
        title: "Fel",
        description: "Kunde inte spara tjänsten",
        variant: "destructive"
      })
    }
  }

  const handleDeleteClick = (service: Service) => {
    setServiceToDelete(service)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceToDelete.id)

      if (error) throw error

      toast({
        title: "✅ Borttaget",
        description: `Tjänsten "${serviceToDelete.title}" har tagits bort permanent`
      })
      
      fetchServices()
    } catch (error) {
      console.error('Error deleting service:', error)
      toast({
        title: "❌ Fel",
        description: "Kunde inte ta bort tjänsten. Försök igen senare.",
        variant: "destructive"
      })
    } finally {
      setDeleteConfirmOpen(false)
      setServiceToDelete(null)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      service_id: service.service_id,
      title: service.title,
      description: service.description,
      icon_name: service.icon_name,
      color_from: service.color_from,
      color_to: service.color_to,
      features: service.features.join('\n'),
      technologies: service.technologies.join(', '),
      pricing_basic: service.pricing_basic || "",
      pricing_standard: service.pricing_standard || "",
      pricing_premium: service.pricing_premium || "",
      pricing_hourly: service.pricing_hourly || "",
      pricing_description: service.pricing_description || "",
      sort_order: service.sort_order,
      is_active: service.is_active
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setEditingService(null)
    setFormData({
      service_id: "",
      title: "",
      description: "",
      icon_name: "",
      color_from: "#00ADB5",
      color_to: "#E94560",
      features: "",
      technologies: "",
      pricing_basic: "",
      pricing_standard: "",
      pricing_premium: "",
      pricing_hourly: "",
      pricing_description: "",
      sort_order: 0,
      is_active: true
    })
  }

  const toggleActive = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !service.is_active })
        .eq('id', service.id)

      if (error) throw error
      
      toast({
        title: "Uppdaterat",
        description: `Tjänsten är nu ${!service.is_active ? 'aktiv' : 'inaktiv'}`
      })
      
      fetchServices()
    } catch (error) {
      console.error('Error toggling service:', error)
      toast({
        title: "Fel",
        description: "Kunde inte uppdatera tjänsten",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return <div>Laddar tjänster...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Tjänster</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Lägg till tjänst
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className={!service.is_active ? "opacity-50" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>
                    ID: {service.service_id} • {service.is_active ? "Aktiv" : "Inaktiv"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleActive(service)}
                  >
                    {service.is_active ? "🟢" : "🔴"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(service)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteClick(service)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-6 h-6 rounded"
                  style={{ background: `linear-gradient(to right, ${service.color_from}, ${service.color_to})` }}
                />
                <span className="text-sm">Icon: {service.icon_name}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {service.technologies.map((tech, i) => (
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
              {editingService ? "Redigera tjänst" : "Lägg till ny tjänst"}
            </DialogTitle>
            <DialogDescription>
              Fyll i informationen nedan för att {editingService ? "uppdatera" : "skapa"} tjänsten.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service_id">Tjänst ID</Label>
                <Input
                  id="service_id"
                  value={formData.service_id}
                  onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                  placeholder="web-development"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Titel</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beskrivning</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="icon_name">Icon namn (Lucide)</Label>
                <Input
                  id="icon_name"
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  placeholder="Globe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color_from">Färg från</Label>
                <Input
                  id="color_from"
                  type="color"
                  value={formData.color_from}
                  onChange={(e) => setFormData({ ...formData, color_from: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color_to">Färg till</Label>
                <Input
                  id="color_to"
                  type="color"
                  value={formData.color_to}
                  onChange={(e) => setFormData({ ...formData, color_to: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Funktioner (en per rad)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={4}
                placeholder="Responsiv design&#10;SEO-optimering&#10;Snabb laddningstid"
                required
              />
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
                <Label htmlFor="pricing_basic">Pris Basic</Label>
                <Input
                  id="pricing_basic"
                  value={formData.pricing_basic}
                  onChange={(e) => setFormData({ ...formData, pricing_basic: e.target.value })}
                  placeholder="4 900 kr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricing_standard">Pris Standard</Label>
                <Input
                  id="pricing_standard"
                  value={formData.pricing_standard}
                  onChange={(e) => setFormData({ ...formData, pricing_standard: e.target.value })}
                  placeholder="9 900 kr"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pricing_premium">Pris Premium</Label>
                <Input
                  id="pricing_premium"
                  value={formData.pricing_premium}
                  onChange={(e) => setFormData({ ...formData, pricing_premium: e.target.value })}
                  placeholder="19 900 kr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricing_hourly">Timpris</Label>
                <Input
                  id="pricing_hourly"
                  value={formData.pricing_hourly}
                  onChange={(e) => setFormData({ ...formData, pricing_hourly: e.target.value })}
                  placeholder="450 kr/timme"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricing_description">Prisbeskrivning</Label>
              <Textarea
                id="pricing_description"
                value={formData.pricing_description}
                onChange={(e) => setFormData({ ...formData, pricing_description: e.target.value })}
                rows={2}
                placeholder="Priserna är exklusive moms och baseras på projektets omfattning."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sorteringsordning</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Aktiv</Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsDialogOpen(false)
                resetForm()
              }}>
                Avbryt
              </Button>
              <Button type="submit">
                {editingService ? "Uppdatera" : "Skapa"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleDeleteConfirm}
        title="Ta bort tjänst"
        itemName={serviceToDelete?.title}
        description={`Är du säker på att du vill ta bort tjänsten "${serviceToDelete?.title}"? Denna åtgärd kan inte ångras och all tjänstedata kommer att försvinna permanent.`}
        confirmText="Ta bort tjänst"
        cancelText="Behåll tjänst"
      />
    </div>
  )
} 