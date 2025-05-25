"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { Globe, MapPin, Users, BarChart3 } from "lucide-react"
import dynamic from 'next/dynamic'

// Dynamisk import av kartan för att undvika SSR-problem
const WorldMap = dynamic(() => import('./world-map'), { 
  ssr: false,
  loading: () => (
    <div className="h-[300px] md:h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
      <div className="w-8 h-8 border-2 border-[#00ADB5]/30 border-t-[#00ADB5] rounded-full animate-spin" />
    </div>
  )
})

interface GeographicData {
  countries: Array<{
    country_code: string
    country_name: string
    visitors: number
    pageviews: number
  }>
  cities: Array<{
    city: string
    country: string
    visitors: number
    latitude: number
    longitude: number
  }>
  regions: Array<{
    region: string
    country: string
    visitors: number
  }>
}

export function GeographicAnalytics() {
  const [data, setData] = useState<GeographicData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGeographicData() {
      try {
        const { data: geoData, error } = await supabase
          .rpc('get_geographic_analytics', { days_back: 30 })

        if (error) throw error

        const parsedData = typeof geoData === 'string' 
          ? JSON.parse(geoData) 
          : geoData

        setData(parsedData)
      } catch (err) {
        console.error('Error fetching geographic analytics:', err)
        setError(err instanceof Error ? err.message : 'Ett fel uppstod')
      } finally {
        setLoading(false)
      }
    }

    fetchGeographicData()
  }, [])

  const getCountryFlag = (countryCode: string) => {
    if (!countryCode || countryCode.length !== 2) return '🌍'
    return String.fromCodePoint(
      ...countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0))
    )
  }

  if (loading) {
    return (
      <div className="grid gap-4">
        <Card className="p-4 md:p-6">
          <div className="h-[300px] md:h-[400px] flex items-center justify-center">
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
          <p className="text-sm md:text-base">Kunde inte ladda geografisk data: {error}</p>
        </div>
      </Card>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Översiktsstatistik */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Länder</CardTitle>
            <Globe className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{data.countries.length}</div>
            <p className="text-xs text-muted-foreground">
              Unika länder
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Städer</CardTitle>
            <MapPin className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{data.cities.length}</div>
            <p className="text-xs text-muted-foreground">
              Unika städer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Regioner</CardTitle>
            <BarChart3 className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{data.regions.length}</div>
            <p className="text-xs text-muted-foreground">
              Unika regioner
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Totala besökare</CardTitle>
            <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              {data.countries.reduce((sum, country) => sum + country.visitors, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Med geo-data
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-4 min-w-[300px]">
            <TabsTrigger value="map" className="text-xs md:text-sm">Karta</TabsTrigger>
            <TabsTrigger value="countries" className="text-xs md:text-sm">Länder</TabsTrigger>
            <TabsTrigger value="cities" className="text-xs md:text-sm">Städer</TabsTrigger>
            <TabsTrigger value="regions" className="text-xs md:text-sm">Regioner</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Besökare på världskartan</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
              <WorldMap data={data.cities} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="countries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Besökare per land</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4 max-h-[400px] md:max-h-[500px] overflow-y-auto">
                {data.countries.length === 0 ? (
                  <p className="text-center text-muted-foreground py-6 md:py-8 text-sm">
                    Ingen geografisk data tillgänglig
                  </p>
                ) : (
                  data.countries.map((country) => (
                    <div key={country.country_code} className="flex items-center justify-between p-3 md:p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                        <span className="text-lg md:text-2xl flex-shrink-0">
                          {getCountryFlag(country.country_code)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm md:text-base truncate">{country.country_name}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {country.pageviews} sidvisningar
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                        {country.visitors} besökare
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Besökare per stad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4 max-h-[400px] md:max-h-[500px] overflow-y-auto">
                {data.cities.length === 0 ? (
                  <p className="text-center text-muted-foreground py-6 md:py-8 text-sm">
                    Ingen stadsdata tillgänglig
                  </p>
                ) : (
                  data.cities.map((city, index) => (
                    <div key={`${city.city}-${city.country}-${index}`} className="flex items-center justify-between p-3 md:p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                        <MapPin className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm md:text-base truncate">{city.city}</p>
                          <p className="text-xs md:text-sm text-muted-foreground truncate">
                            {city.country}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                        {city.visitors} besökare
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Besökare per region</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4 max-h-[400px] md:max-h-[500px] overflow-y-auto">
                {data.regions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-6 md:py-8 text-sm">
                    Ingen regiondata tillgänglig
                  </p>
                ) : (
                  data.regions.map((region, index) => (
                    <div key={`${region.region}-${region.country}-${index}`} className="flex items-center justify-between p-3 md:p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                        <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm md:text-base truncate">{region.region}</p>
                          <p className="text-xs md:text-sm text-muted-foreground truncate">
                            {region.country}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                        {region.visitors} besökare
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 