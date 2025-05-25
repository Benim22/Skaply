"use client"

import { useState, useEffect } from "react"
import { supabase, FAQItem } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Pencil, Trash2, Plus, GripVertical } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

export function FAQAdmin() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [faqToDelete, setFaqToDelete] = useState<FAQItem | null>(null)
  const { toast } = useToast()

  // Form states
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
    sort_order: 0,
    is_active: true
  })

  useEffect(() => {
    fetchFAQItems()
  }, [])

  const fetchFAQItems = async () => {
    try {
      const { data, error } = await supabase
        .from('faq_items')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) throw error
      setFaqItems(data || [])
    } catch (error) {
      console.error('Error fetching FAQ items:', error)
      toast({
        title: "Fel",
        description: "Kunde inte hämta FAQ",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingFAQ) {
        const { error } = await supabase
          .from('faq_items')
          .update(formData)
          .eq('id', editingFAQ.id)

        if (error) throw error
        
        toast({
          title: "Uppdaterat",
          description: "FAQ har uppdaterats"
        })
      } else {
        const { error } = await supabase
          .from('faq_items')
          .insert([formData])

        if (error) throw error
        
        toast({
          title: "Skapat",
          description: "Ny FAQ har skapats"
        })
      }

      setIsDialogOpen(false)
      resetForm()
      fetchFAQItems()
    } catch (error) {
      console.error('Error saving FAQ:', error)
      toast({
        title: "Fel",
        description: "Kunde inte spara FAQ",
        variant: "destructive"
      })
    }
  }

  const handleDeleteClick = (faq: FAQItem) => {
    setFaqToDelete(faq)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!faqToDelete) return

    try {
      const { error } = await supabase
        .from('faq_items')
        .delete()
        .eq('id', faqToDelete.id)

      if (error) throw error

      toast({
        title: "✅ Borttaget",
        description: `FAQ-frågan "${faqToDelete.question}" har tagits bort permanent`
      })
      
      fetchFAQItems()
    } catch (error) {
      console.error('Error deleting FAQ:', error)
      toast({
        title: "❌ Fel",
        description: "Kunde inte ta bort FAQ. Försök igen senare.",
        variant: "destructive"
      })
    } finally {
      setDeleteConfirmOpen(false)
      setFaqToDelete(null)
    }
  }

  const handleEdit = (faq: FAQItem) => {
    setEditingFAQ(faq)
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "",
      sort_order: faq.sort_order,
      is_active: faq.is_active
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setEditingFAQ(null)
    setFormData({
      question: "",
      answer: "",
      category: "",
      sort_order: 0,
      is_active: true
    })
  }

  const toggleActive = async (faq: FAQItem) => {
    try {
      const { error } = await supabase
        .from('faq_items')
        .update({ is_active: !faq.is_active })
        .eq('id', faq.id)

      if (error) throw error
      
      toast({
        title: "Uppdaterat",
        description: `FAQ är nu ${!faq.is_active ? 'aktiv' : 'inaktiv'}`
      })
      
      fetchFAQItems()
    } catch (error) {
      console.error('Error toggling FAQ:', error)
      toast({
        title: "Fel",
        description: "Kunde inte uppdatera FAQ",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return <div>Laddar FAQ...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Vanliga frågor (FAQ)</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Lägg till FAQ
        </Button>
      </div>

      <div className="grid gap-4">
        {faqItems.map((faq) => (
          <Card key={faq.id} className={!faq.is_active ? "opacity-50" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                  <CardDescription>
                    Ordning: {faq.sort_order} • {faq.is_active ? "Aktiv" : "Inaktiv"}
                    {faq.category && ` • ${faq.category}`}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-move"
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleActive(faq)}
                  >
                    {faq.is_active ? "🟢" : "🔴"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(faq)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteClick(faq)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingFAQ ? "Redigera FAQ" : "Lägg till ny FAQ"}
            </DialogTitle>
            <DialogDescription>
              Fyll i informationen nedan för att {editingFAQ ? "uppdatera" : "skapa"} FAQ.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Fråga</Label>
              <Input
                id="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">Svar</Label>
              <Textarea
                id="answer"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori (valfritt)</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="T.ex. Priser, Teknik"
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
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Aktiv</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsDialogOpen(false)
                resetForm()
              }}>
                Avbryt
              </Button>
              <Button type="submit">
                {editingFAQ ? "Uppdatera" : "Skapa"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleDeleteConfirm}
        title="Ta bort FAQ"
        itemName={faqToDelete?.question}
        description={`Är du säker på att du vill ta bort FAQ-frågan "${faqToDelete?.question}"? Denna åtgärd kan inte ångras och all FAQ-data kommer att försvinna permanent.`}
        confirmText="Ta bort FAQ"
        cancelText="Behåll FAQ"
      />
    </div>
  )
} 