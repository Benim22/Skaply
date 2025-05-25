"use client"

import { useState, useEffect } from "react"
import { supabase, Testimonial } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Pencil, Trash2, Plus, Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null)
  const { toast } = useToast()

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    content: "",
    initials: "",
    rating: 5,
    avatar_url: "",
    is_featured: false,
    is_active: true,
    sort_order: 0
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      toast({
        title: "Fel",
        description: "Kunde inte hämta omdömen",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generera initialer automatiskt om de inte är ifyllda
    const initialsToUse = formData.initials || formData.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

    const testimonialData = {
      ...formData,
      initials: initialsToUse
    }

    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', editingTestimonial.id)

        if (error) throw error
        
        toast({
          title: "Uppdaterat",
          description: "Omdömet har uppdaterats"
        })
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([testimonialData])

        if (error) throw error
        
        toast({
          title: "Skapat",
          description: "Nytt omdöme har skapats"
        })
      }

      setIsDialogOpen(false)
      resetForm()
      fetchTestimonials()
    } catch (error) {
      console.error('Error saving testimonial:', error)
      toast({
        title: "Fel",
        description: "Kunde inte spara omdömet",
        variant: "destructive"
      })
    }
  }

  const handleDeleteClick = (testimonial: Testimonial) => {
    setTestimonialToDelete(testimonial)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!testimonialToDelete) return

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', testimonialToDelete.id)

      if (error) throw error

      toast({
        title: "✅ Borttaget",
        description: `Omdömet från "${testimonialToDelete.name}" har tagits bort permanent`
      })
      
      fetchTestimonials()
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      toast({
        title: "❌ Fel",
        description: "Kunde inte ta bort omdömet. Försök igen senare.",
        variant: "destructive"
      })
    } finally {
      setDeleteConfirmOpen(false)
      setTestimonialToDelete(null)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      company: testimonial.company,
      content: testimonial.content,
      initials: testimonial.initials,
      rating: testimonial.rating,
      avatar_url: testimonial.avatar_url || "",
      is_featured: testimonial.is_featured,
      is_active: testimonial.is_active,
      sort_order: testimonial.sort_order
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setEditingTestimonial(null)
    setFormData({
      name: "",
      company: "",
      content: "",
      initials: "",
      rating: 5,
      avatar_url: "",
      is_featured: false,
      is_active: true,
      sort_order: 0
    })
  }

  const toggleActive = async (testimonial: Testimonial) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_active: !testimonial.is_active })
        .eq('id', testimonial.id)

      if (error) throw error
      
      toast({
        title: "Uppdaterat",
        description: `Omdömet är nu ${!testimonial.is_active ? 'aktivt' : 'inaktivt'}`
      })
      
      fetchTestimonials()
    } catch (error) {
      console.error('Error toggling testimonial:', error)
      toast({
        title: "Fel",
        description: "Kunde inte uppdatera omdömet",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return <div>Laddar omdömen...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Omdömen</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Lägg till omdöme
        </Button>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={!testimonial.is_active ? "opacity-50" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>
                    {testimonial.company} • {testimonial.is_active ? "Aktiv" : "Inaktiv"}
                    {testimonial.is_featured && " • ⭐ Utvald"}
                  </CardDescription>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "text-[#E94560] fill-[#E94560]" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleActive(testimonial)}
                  >
                    {testimonial.is_active ? "🟢" : "🔴"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(testimonial)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteClick(testimonial)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic">"{testimonial.content}"</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? "Redigera omdöme" : "Lägg till nytt omdöme"}
            </DialogTitle>
            <DialogDescription>
              Fyll i informationen nedan för att {editingTestimonial ? "uppdatera" : "skapa"} omdömet.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Namn</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Företag</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Omdöme</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Betyg</Label>
                <Select
                  value={formData.rating.toString()}
                  onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 stjärna</SelectItem>
                    <SelectItem value="2">2 stjärnor</SelectItem>
                    <SelectItem value="3">3 stjärnor</SelectItem>
                    <SelectItem value="4">4 stjärnor</SelectItem>
                    <SelectItem value="5">5 stjärnor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initials">Initialer (lämna tomt för automatisk)</Label>
                <Input
                  id="initials"
                  value={formData.initials}
                  onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
                  maxLength={5}
                  placeholder="T.ex. AJ"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="avatar_url">Avatar URL (valfritt)</Label>
                <Input
                  id="avatar_url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
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

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Aktiv</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="is_featured">Utvald</Label>
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
                {editingTestimonial ? "Uppdatera" : "Skapa"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleDeleteConfirm}
        title="Ta bort omdöme"
        itemName={`${testimonialToDelete?.name} (${testimonialToDelete?.company})`}
        description={`Är du säker på att du vill ta bort omdömet från "${testimonialToDelete?.name}" på "${testimonialToDelete?.company}"? Denna åtgärd kan inte ångras och all omdömesdata kommer att försvinna permanent.`}
        confirmText="Ta bort omdöme"
        cancelText="Behåll omdöme"
      />
    </div>
  )
} 