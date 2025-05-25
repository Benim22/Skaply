import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

// Funktion för att hämta geografisk data från IP
async function getGeoData(ip: string) {
  try {
    // Använd ipapi.co för geografisk data (gratis upp till 1000 requests/dag)
    const response = await fetch(`https://ipapi.co/${ip}/json/`)
    if (!response.ok) return null
    
    const data = await response.json()
    
    return {
      country_code: data.country_code || null,
      country_name: data.country_name || null,
      region: data.region || null,
      city: data.city || null,
      latitude: data.latitude ? parseFloat(data.latitude) : null,
      longitude: data.longitude ? parseFloat(data.longitude) : null,
      timezone: data.timezone || null
    }
  } catch (error) {
    console.error('Error fetching geo data:', error)
    return null
  }
}

// Funktion för att få verklig IP-adress
function getRealIP(request: NextRequest): string {
  // Försök olika headers för att få verklig IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(',')[0].trim()
  
  return request.ip || '127.0.0.1'
}

export async function middleware(request: NextRequest) {
  // Ignorera admin-sidor, API-anrop och statiska filer
  if (
    request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.') ||
    request.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

  // Hämta eller skapa visitor_id
  let visitorId = request.cookies.get('visitor_id')?.value
  if (!visitorId) {
    visitorId = uuidv4()
    response.cookies.set('visitor_id', visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365 // 1 år
    })
  }

  // Hämta IP-adress och geografisk data
  const clientIP = getRealIP(request)
  const userAgent = request.headers.get('user-agent') || ''
  const referrer = request.headers.get('referer') || ''
  
  try {
    // Hämta geografisk data (endast för nya IP-adresser för att spara API-anrop)
    let geoData = null
    if (clientIP !== '127.0.0.1' && clientIP !== '::1') {
      // Kontrollera om vi redan har geo-data för denna IP
      const { data: existingGeo } = await supabase
        .from('page_views')
        .select('country_code, country_name, region, city, latitude, longitude, timezone')
        .eq('ip_address', clientIP)
        .not('country_code', 'is', null)
        .limit(1)
        .single()

      if (existingGeo) {
        geoData = existingGeo
      } else {
        geoData = await getGeoData(clientIP)
      }
    }

    // Spara sidvisning i Supabase
    await supabase.from('page_views').insert({
      page_path: request.nextUrl.pathname,
      visitor_id: visitorId,
      ip_address: clientIP,
      user_agent: userAgent,
      referrer: referrer,
      country_code: geoData?.country_code,
      country_name: geoData?.country_name,
      region: geoData?.region,
      city: geoData?.city,
      latitude: geoData?.latitude,
      longitude: geoData?.longitude,
      timezone: geoData?.timezone
    })

    // Uppdatera aktiv session för realtidsdata
    await supabase.rpc('update_active_session', {
      p_visitor_id: visitorId,
      p_current_page: request.nextUrl.pathname,
      p_ip_address: clientIP,
      p_country_code: geoData?.country_code,
      p_country_name: geoData?.country_name,
      p_user_agent: userAgent
    })

  } catch (error) {
    console.error('Error tracking page view:', error)
  }

  return response
}

// Matcha alla sidor utom statiska filer
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /icons (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|fonts|icons|[\\w-]+\\.\\w+).*)',
  ],
} 