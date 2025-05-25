import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { Users, Eye, Globe, Clock, Wifi } from "lucide-react"

interface RealtimeData {
  active_visitors: number
  recent_pageviews: Array<{
    page: string
    country: string
    time: string
    visitor_id: string
  }>
  visitors_by_country: Array<{
    country_code: string
    country_name: string
    visitors: number
  }>
  active_pages: Array<{
    page: string
    visitors: number
  }>
}

export function RealtimeAnalytics() {
  const [data, setData] = useState<RealtimeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchRealtimeData = async () => {
    try {
      const { data: realtimeData, error } = await supabase
        .rpc('get_realtime_analytics')

      if (error) throw error

      const parsedData = typeof realtimeData === 'string' 
        ? JSON.parse(realtimeData) 
        : realtimeData

      setData(parsedData)
      setLastUpdate(new Date())
      setError(null)
    } catch (err) {
      console.error('Error fetching realtime analytics:', err)
      setError(err instanceof Error ? err.message : 'Ett fel uppstod')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRealtimeData()
    
    // Uppdatera var 30:e sekund
    const interval = setInterval(fetchRealtimeData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const formatTime = (timeString: string) => {
    const time = new Date(timeString)
    const now = new Date()
    const diffMs = now.getTime() - time.getTime()
    const diffMinutes = Math.floor(diffMs / 60000)
    
    if (diffMinutes < 1) return 'Just nu'
    if (diffMinutes === 1) return '1 min sedan'
    if (diffMinutes < 60) return `${diffMinutes} min sedan`
    
    return time.toLocaleTimeString('sv-SE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getPageDisplayName = (path: string) => {
    switch (path) {
      case '/': return 'Startsida'
      case '/om': return 'Om oss'
      case '/tjanster': return 'Tjänster'
      case '/projekt': return 'Projekt'
      case '/kontakt': return 'Kontakt'
      case '/integritetspolicy': return 'Integritetspolicy'
      default: return path
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4">
        <Card className="p-4 md:p-6">
          <div className="h-[150px] md:h-[200px] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#00ADB5]/30 border-t-[#00ADB5] rounded-full animate-spin" />
          </div>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-4 md:p-6">
        <div className="text-center text-red-500">
          <p className="text-sm md:text-base">Kunde inte ladda realtidsdata: {error}</p>
        </div>
      </Card>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Status och uppdateringsinfo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">Live-data</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Senast uppdaterad: {lastUpdate.toLocaleTimeString('sv-SE')}</span>
        </div>
      </div>

      {/* Realtidsstatistik */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Aktiva besökare</CardTitle>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-green-600">{data.active_visitors}</div>
            <p className="text-xs text-muted-foreground">
              Just nu online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Aktiva länder</CardTitle>
            <Globe className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{data.visitors_by_country.length}</div>
            <p className="text-xs text-muted-foreground">
              Länder online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Aktiva sidor</CardTitle>
            <Eye className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{data.active_pages.length}</div>
            <p className="text-xs text-muted-foreground">
              Sidor besöks nu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Senaste aktivitet</CardTitle>
            <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm md:text-lg font-bold">
              {data.recent_pageviews.length > 0 ? formatTime(data.recent_pageviews[0].time) : 'Ingen'}
            </div>
            <p className="text-xs text-muted-foreground">
              Senaste besök
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {/* Live-feed av sidvisningar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live-feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 md:space-y-3 max-h-[300px] md:max-h-[400px] overflow-y-auto">
              {data.recent_pageviews.length === 0 ? (
                <p className="text-center text-muted-foreground py-6 md:py-8 text-sm">
                  Inga senaste sidvisningar
                </p>
              ) : (
                data.recent_pageviews.map((view, index) => (
                  <div key={`${view.visitor_id}-${view.time}-${index}`} className="flex items-center justify-between p-2 md:p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm font-medium truncate">
                        {getPageDisplayName(view.page)}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="truncate">ID: {view.visitor_id}</span>
                        {view.country && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline truncate">{view.country}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                      {formatTime(view.time)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Aktiva besökare per land */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Aktiva besökare per land</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 md:space-y-3 max-h-[300px] md:max-h-[400px] overflow-y-auto">
              {data.visitors_by_country.length === 0 ? (
                <p className="text-center text-muted-foreground py-6 md:py-8 text-sm">
                  Inga aktiva besökare med geografisk data
                </p>
              ) : (
                data.visitors_by_country.map((country) => (
                  <div key={country.country_code} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-base md:text-lg flex-shrink-0">
                        {country.country_code ? 
                          String.fromCodePoint(...country.country_code.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0))) 
                          : '🌍'
                        }
                      </span>
                      <span className="text-xs md:text-sm font-medium truncate">
                        {country.country_name || 'Okänt land'}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                      {country.visitors}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Aktiva sidor */}
      {data.active_pages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Mest aktiva sidor just nu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {data.active_pages.map((page) => (
                <div key={page.page} className="flex items-center justify-between p-2 md:p-3 bg-muted/50 rounded-lg">
                  <span className="text-xs md:text-sm font-medium truncate flex-1">
                    {getPageDisplayName(page.page)}
                  </span>
                  <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                    {page.visitors} aktiva
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 