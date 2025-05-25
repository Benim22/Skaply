"use client"

import { useState, useEffect } from "react"
import { supabase, NewsletterSubscription } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Trash2, Download, Search, Mail } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

export function NewsletterAdmin() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<NewsletterSubscription | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('subscribed_at', { ascending: false })

      if (error) throw error
      setSubscriptions(data || [])
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
      toast({
        title: "Fel",
        description: "Kunde inte hämta prenumerationer",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (subscription: NewsletterSubscription) => {
    setSubscriptionToDelete(subscription)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!subscriptionToDelete) return

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .delete()
        .eq('id', subscriptionToDelete.id)

      if (error) throw error

      toast({
        title: "✅ Borttaget",
        description: `Prenumerationen för "${subscriptionToDelete.email}" har tagits bort permanent`
      })
      
      fetchSubscriptions()
    } catch (error) {
      console.error('Error deleting subscription:', error)
      toast({
        title: "❌ Fel",
        description: "Kunde inte ta bort prenumerationen. Försök igen senare.",
        variant: "destructive"
      })
    } finally {
      setDeleteConfirmOpen(false)
      setSubscriptionToDelete(null)
    }
  }

  const handleUnsubscribe = async (subscription: NewsletterSubscription) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({ 
          is_active: false,
          unsubscribed_at: new Date().toISOString()
        })
        .eq('id', subscription.id)

      if (error) throw error

      toast({
        title: "Avprenumererad",
        description: `${subscription.email} har avprenumererats`
      })
      
      fetchSubscriptions()
    } catch (error) {
      console.error('Error unsubscribing:', error)
      toast({
        title: "Fel",
        description: "Kunde inte avprenumerera",
        variant: "destructive"
      })
    }
  }

  const handleResubscribe = async (subscription: NewsletterSubscription) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({ 
          is_active: true,
          unsubscribed_at: null
        })
        .eq('id', subscription.id)

      if (error) throw error

      toast({
        title: "Återprenumererad",
        description: `${subscription.email} är nu aktiv igen`
      })
      
      fetchSubscriptions()
    } catch (error) {
      console.error('Error resubscribing:', error)
      toast({
        title: "Fel",
        description: "Kunde inte återprenumerera",
        variant: "destructive"
      })
    }
  }

  const exportToCSV = () => {
    const activeSubscriptions = subscriptions.filter(sub => sub.is_active)
    const csv = [
      ['Email', 'Prenumererad datum', 'Källa', 'Taggar'],
      ...activeSubscriptions.map(sub => [
        sub.email,
        new Date(sub.subscribed_at).toLocaleDateString('sv-SE'),
        sub.source || '',
        sub.tags.join(', ')
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nyhetsbrev-prenumeranter-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "Exporterat",
      description: `${activeSubscriptions.length} prenumeranter exporterade till CSV`
    })
  }

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeCount = subscriptions.filter(sub => sub.is_active).length
  const inactiveCount = subscriptions.filter(sub => !sub.is_active).length

  if (loading) {
    return <div>Laddar prenumerationer...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Nyhetsbrev-prenumerationer</h2>
        <Button onClick={exportToCSV} disabled={activeCount === 0}>
          <Download className="mr-2 h-4 w-4" />
          Exportera aktiva ({activeCount})
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Totalt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{subscriptions.length}</p>
            <p className="text-sm text-muted-foreground">Alla prenumeranter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Aktiva</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{activeCount}</p>
            <p className="text-sm text-muted-foreground">Aktiva prenumeranter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Avprenumererade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{inactiveCount}</p>
            <p className="text-sm text-muted-foreground">Avprenumererade</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Sök efter e-postadress..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>E-postadress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prenumererad</TableHead>
                <TableHead>Källa</TableHead>
                <TableHead>Taggar</TableHead>
                <TableHead className="text-right">Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? "Inga prenumeranter hittades" : "Inga prenumeranter än"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {subscription.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={subscription.is_active ? "default" : "secondary"}>
                        {subscription.is_active ? "Aktiv" : "Avprenumererad"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(subscription.subscribed_at).toLocaleDateString('sv-SE')}
                    </TableCell>
                    <TableCell>
                      {subscription.source || "-"}
                    </TableCell>
                    <TableCell>
                      {subscription.tags.length > 0 ? (
                        <div className="flex gap-1 flex-wrap">
                          {subscription.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {subscription.is_active ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnsubscribe(subscription)}
                          >
                            Avprenumerera
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleResubscribe(subscription)}
                          >
                            Återprenumerera
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteClick(subscription)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleDeleteConfirm}
        title="Ta bort prenumeration"
        itemName={subscriptionToDelete?.email}
        description={`Är du säker på att du vill ta bort prenumerationen för "${subscriptionToDelete?.email}"? Denna åtgärd kan inte ångras och all prenumerationsdata kommer att försvinna permanent.`}
        confirmText="Ta bort prenumeration"
        cancelText="Behåll prenumeration"
      />
    </div>
  )
} 