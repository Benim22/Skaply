import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Users, Eye, ArrowUp, ArrowDown } from "lucide-react"

interface AnalyticsData {
  total_visitors: number
  total_pageviews: number
  most_viewed_pages: Array<{
    page: string
    views: number
    unique_visitors: number
  }>
  daily_stats: Array<{
    date: string
    visitors: number
    views: number
  }>
}

export function AnalyticsOverview() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        console.log('Fetching analytics data...')
        
        const { data: analyticsData, error } = await supabase
          .rpc('get_analytics_overview', { days_back: 30 })

        console.log('Raw analytics response:', { analyticsData, error })

        if (error) {
          console.error('Supabase error:', error)
          throw error
        }

        if (!analyticsData) {
          console.log('No analytics data returned')
          setData({
            total_visitors: 0,
            total_pageviews: 0,
            most_viewed_pages: [],
            daily_stats: []
          })
          return
        }

        // Eftersom funktionen nu returnerar JSON direkt
        const parsedData = typeof analyticsData === 'string' 
          ? JSON.parse(analyticsData) 
          : analyticsData

        console.log('Parsed analytics data:', parsedData)
        setData(parsedData)
      } catch (err) {
        console.error('Error fetching analytics:', err)
        setError(err instanceof Error ? err.message : 'Ett fel uppstod vid hämtning av statistik')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4">
        <Card className="p-6">
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
          <p className="text-sm md:text-base">Kunde inte ladda statistik: {error}</p>
          <p className="text-xs md:text-sm mt-2 text-gray-500">
            Kontrollera att analytics-funktionen är korrekt konfigurerad i Supabase.
          </p>
        </div>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card className="p-4 md:p-6">
        <div className="text-center text-gray-500">
          <p className="text-sm md:text-base">Ingen statistikdata tillgänglig än.</p>
        </div>
      </Card>
    )
  }

  // Beräkna trender
  const calculateTrend = (stats: typeof data.daily_stats) => {
    if (stats.length < 2) return 0
    const latest = stats[0]
    const previous = stats[1]
    if (previous.visitors === 0) return 0
    return ((latest.visitors - previous.visitors) / previous.visitors) * 100
  }

  const visitorTrend = calculateTrend(data.daily_stats)

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Unika besökare</CardTitle>
            <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{data.total_visitors}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              {visitorTrend > 0 ? (
                <ArrowUp className="mr-1 h-3 w-3 md:h-4 md:w-4 text-green-500" />
              ) : visitorTrend < 0 ? (
                <ArrowDown className="mr-1 h-3 w-3 md:h-4 md:w-4 text-red-500" />
              ) : null}
              <span className={
                visitorTrend > 0 ? "text-green-500" : 
                visitorTrend < 0 ? "text-red-500" : 
                "text-gray-500"
              }>
                {visitorTrend !== 0 ? `${Math.abs(visitorTrend).toFixed(1)}%` : '0%'}
              </span>
              <span className="ml-1 hidden sm:inline">från igår</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Sidvisningar</CardTitle>
            <Eye className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{data.total_pageviews}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="hidden sm:inline">Senaste </span>30 dagar
            </p>
          </CardContent>
        </Card>
      </div>

      {data.daily_stats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Besökstrend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] md:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.daily_stats}>
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString('sv-SE', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                    fontSize={12}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    fontSize={12}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString('sv-SE')}
                    formatter={(value: number) => [value, 'Besökare']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#00ADB5" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {data.most_viewed_pages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Mest besökta sidor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:space-y-4">
              {data.most_viewed_pages.map((page, index) => (
                <div key={`${page.page}-${index}`} className="flex items-center justify-between">
                  <div className="flex-1 space-y-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">
                      {page.page === '/' ? 'Startsida' : page.page}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {page.unique_visitors} unika besökare
                    </p>
                  </div>
                  <div className="text-sm font-medium ml-2 flex-shrink-0">
                    {page.views} visningar
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {data.most_viewed_pages.length === 0 && data.daily_stats.length === 0 && (
        <Card className="p-4 md:p-6">
          <div className="text-center text-gray-500">
            <p className="text-sm md:text-base">Ingen besöksdata tillgänglig än.</p>
            <p className="text-xs md:text-sm mt-2">
              Besök hemsidan för att börja samla in statistik.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
} 