"use client"

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix för Leaflet ikoner i Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface CityData {
  city: string
  country: string
  visitors: number
  latitude: number
  longitude: number
}

interface WorldMapProps {
  data: CityData[]
}

export default function WorldMap({ data }: WorldMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Skapa kartan med mobilanpassade inställningar
    const map = L.map(mapRef.current, {
      center: [20, 0], // Centrerad på världen
      zoom: window.innerWidth < 768 ? 1 : 2, // Mindre zoom på mobil
      zoomControl: true,
      scrollWheelZoom: true,
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: false, // Inaktivera box zoom på mobil
      keyboard: false, // Inaktivera tangentbord på mobil
      dragging: true,
      tap: true, // Aktivera touch events
      tapTolerance: 15, // Större tolerans för touch
    })

    // Lägg till kartlager
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current || !data.length) return

    // Rensa befintliga markörer
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current?.removeLayer(layer)
      }
    })

    // Lägg till markörer för varje stad
    data.forEach((city) => {
      if (!city.latitude || !city.longitude || !mapInstanceRef.current) return

      // Skapa anpassad ikon baserat på antal besökare och skärmstorlek
      const isMobile = window.innerWidth < 768
      const baseSize = isMobile ? 8 : 10
      const size = Math.max(baseSize, Math.min(isMobile ? 20 : 30, city.visitors * (isMobile ? 2 : 3)))
      const color = city.visitors > 10 ? '#ef4444' : city.visitors > 5 ? '#f97316' : '#00ADB5'

      const customIcon = L.divIcon({
        html: `
          <div style="
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: ${Math.max(6, size / (isMobile ? 2.5 : 3))}px;
            font-weight: bold;
            cursor: pointer;
          ">
            ${city.visitors}
          </div>
        `,
        className: 'custom-marker',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      })

      const marker = L.marker([city.latitude, city.longitude], {
        icon: customIcon
      }).addTo(mapInstanceRef.current)

      // Lägg till popup med mobilanpassad styling
      const isMobileDevice = window.innerWidth < 768
      marker.bindPopup(`
        <div style="
          text-align: center; 
          padding: ${isMobileDevice ? '6px' : '8px'}; 
          min-width: ${isMobileDevice ? '120px' : '150px'};
          font-size: ${isMobileDevice ? '12px' : '14px'};
        ">
          <h3 style="
            margin: 0 0 ${isMobileDevice ? '4px' : '8px'} 0; 
            font-size: ${isMobileDevice ? '14px' : '16px'}; 
            font-weight: bold;
          ">
            ${city.city}
          </h3>
          <p style="
            margin: 0 0 ${isMobileDevice ? '2px' : '4px'} 0; 
            color: #666; 
            font-size: ${isMobileDevice ? '11px' : '14px'};
          ">
            ${city.country}
          </p>
          <p style="
            margin: 0; 
            font-size: ${isMobileDevice ? '12px' : '14px'}; 
            font-weight: bold; 
            color: #00ADB5;
          ">
            ${city.visitors} besökare
          </p>
        </div>
      `, {
        maxWidth: isMobileDevice ? 200 : 300,
        closeButton: true,
        autoClose: true,
        closeOnEscapeKey: true,
      })
    })

    // Anpassa zoomnivå för att visa alla markörer
    if (data.length > 0) {
      const group = new L.FeatureGroup(
        data
          .filter(city => city.latitude && city.longitude)
          .map(city => L.marker([city.latitude, city.longitude]))
      )
      
      if (group.getLayers().length > 0) {
        const isMobile = window.innerWidth < 768
        mapInstanceRef.current.fitBounds(group.getBounds(), {
          padding: [isMobile ? 10 : 20, isMobile ? 10 : 20],
          maxZoom: isMobile ? 8 : 10
        })
      }
    }
  }, [data])

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="h-[300px] md:h-[400px] w-full rounded-lg border border-border touch-pan-x touch-pan-y"
        style={{ zIndex: 1 }}
      />
      
      {/* Mobilanpassad förklaring */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-background/90 backdrop-blur-sm p-2 md:p-3 rounded-lg border border-border shadow-lg z-[1000] max-w-[140px] md:max-w-none">
        <h4 className="text-xs md:text-sm font-semibold mb-1 md:mb-2">Förklaring</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-[#00ADB5] rounded-full border border-white flex-shrink-0"></div>
            <span className="text-xs">1-5 besökare</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded-full border border-white flex-shrink-0"></div>
            <span className="text-xs">6-10 besökare</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full border border-white flex-shrink-0"></div>
            <span className="text-xs">10+ besökare</span>
          </div>
        </div>
      </div>

      {data.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
          <p className="text-muted-foreground text-sm md:text-base text-center px-4">
            Ingen geografisk data att visa
          </p>
        </div>
      )}
    </div>
  )
} 