import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsent } from "@/components/cookie-consent"
import { ProjectProvider } from "@/contexts/project-context"
import "./globals.css"
import Script from "next/script"
import Head from 'next/head'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Skaply - Ledande Digitalbyrå | Webbutveckling, AI & App-lösningar",
  description:
    "Skaply är Sveriges innovativa digitalbyrå för framtidens webblösningar, mobilappar och AI-tjänster. Vi levererar skräddarsydda digitala lösningar med React, Next.js och Supabase för företag som vill växa. Kontakta oss för ett kostnadsfritt möte!",
  generator: 'v0.dev',
  metadataBase: new URL('https://www.skaply.se'),
  keywords: [
    'webbutveckling Stockholm', 
    'app utveckling', 
    'AI-lösningar företag', 
    'digital design byrå', 
    'Nextjs utvecklare', 
    'React webbapplikationer', 
    'e-handelslösningar', 
    'snabb webbplats', 
    'responsiv design', 
    'SEO-optimering', 
    'digital transformation', 
    'Supabase experter', 
    'mobilapplikationer',
    'UX/UI design',
    'digitalbyrå Stockholm'
  ],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  alternates: {
    canonical: 'https://www.skaply.se',
    languages: {
      'sv-SE': 'https://www.skaply.se',
      'en-US': 'https://www.skaply.se/en'
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1
    }
  },
  authors: [
    { name: 'Lucas & Daniel', url: 'https://www.skaply.se/om-oss' }
  ],
  openGraph: {
    title: 'Skaply - Sveriges ledande digitalbyrå för framtidens digitala lösningar',
    description: 'Vi levererar moderna webbplatser, mobilappar och AI-lösningar med teknisk spetskompetens inom React, Next.js och Supabase. Boka ett kostnadsfritt möte idag!',
    url: 'https://www.skaply.se',
    siteName: 'Skaply',
    locale: 'sv_SE',
    type: 'website',
    images: [
      {
        url: 'https://www.skaply.se/link_preview.png',
        width: 1200,
        height: 630,
        alt: 'Skaply - Digitala lösningar för framtiden'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skaply - Sveriges ledande digitalbyrå för framtidens digitala lösningar',
    description: 'Vi levererar moderna webbplatser, mobilappar och AI-lösningar med teknisk spetskompetens inom React, Next.js och Supabase. Boka ett kostnadsfritt möte idag!',
    images: [
      'https://www.skaply.se/link_preview.png'
    ],
    creator: '@skaply',
    site: '@skaply'
  },
  verification: {
    google: 'lägg_till_din_verifieringskod_här',
    yandex: 'lägg_till_din_verifieringskod_här',
    yahoo: 'lägg_till_din_verifieringskod_här'
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/favicon/favicon-32x32.png',
    apple: { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    other: [
      { rel: 'mask-icon', url: '/favicon/safari-pinned-tab.svg', color: '#00ADB5' }
    ]
  },
  manifest: '/site.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="#00ADB5" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="skaply-theme"
          forcedTheme={undefined}
          disableTransitionOnChange
        >
          <ProjectProvider>
            {children}
            <Toaster />
            <CookieConsent />
          </ProjectProvider>
        </ThemeProvider>
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.skaply.se/#organization",
              "name": "Skaply",
              "url": "https://www.skaply.se",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.skaply.se/skaply_logo.png",
                "width": "512",
                "height": "512"
              },
              "slogan": "Digitala lösningar för framtiden",
              "description": "Skaply är en modern digitalbyrå som bygger framtidens lösningar för webben, mobilen och AI med teknisk spets inom React, Next.js och Supabase.",
              "foundingDate": "2022",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Lucas"
                },
                {
                  "@type": "Person",
                  "name": "Daniel"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Teknikgatan 1",
                "addressLocality": "Stockholm",
                "postalCode": "12345",
                "addressCountry": "SE",
                "addressRegion": "Stockholm"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+46-70-123-45-67",
                  "contactType": "customer service",
                  "email": "info@skaply.se",
                  "availableLanguage": ["Swedish", "English"],
                  "contactOption": "TollFree",
                  "hoursAvailable": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday"
                    ],
                    "opens": "08:00",
                    "closes": "17:00"
                  }
                }
              ],
              "sameAs": [
                "https://www.facebook.com/skaply",
                "https://www.twitter.com/skaply",
                "https://www.instagram.com/skaply",
                "https://www.linkedin.com/company/skaply",
                "https://www.github.com/skaply"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Digitala Tjänster",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Webbutveckling",
                      "description": "Moderna, snabba och responsiva webbplatser med React, Next.js och Supabase som ökar konvertering och användarvänlighet.",
                      "serviceType": "Webbutveckling"
                    },
                    "areaServed": {
                      "@type": "Country",
                      "name": "Sweden"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Apputveckling",
                      "description": "Skräddarsydda mobilappar och spel med React Native för iOS och Android som ger ditt varumärke en stark digital närvaro.",
                      "serviceType": "Apputveckling"
                    },
                    "areaServed": {
                      "@type": "Country",
                      "name": "Sweden"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI-lösningar",
                      "description": "Smarta chatbottar, automationer och AI-integrationer som effektiviserar ditt företags processer och kundinteraktioner.",
                      "serviceType": "AI-utveckling"
                    },
                    "areaServed": {
                      "@type": "Country",
                      "name": "Sweden"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Grafisk design",
                      "description": "Logotyper, visuell identitet och UI/UX-design som sticker ut och skapar igenkänning för ditt varumärke.",
                      "serviceType": "Design"
                    },
                    "areaServed": {
                      "@type": "Country",
                      "name": "Sweden"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Digital Marknadsföring",
                      "description": "Datadriven strategi för att nå din målgrupp online genom SEO, SEM och social media, vilket ökar trafik och leads.",
                      "serviceType": "Digital marknadsföring"
                    },
                    "areaServed": {
                      "@type": "Country",
                      "name": "Sweden"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "E-handel",
                      "description": "Kompletta e-handelslösningar med fokus på användarvänlig design, smidiga betalningslösningar och optimerad konvertering.",
                      "serviceType": "E-handel"
                    },
                    "areaServed": {
                      "@type": "Country",
                      "name": "Sweden"
                    }
                  }
                ]
              },
              "potentialAction": {
                "@type": "ContactAction",
                "name": "Boka gratis konsultation",
                "url": "https://www.skaply.se/kontakt"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Maria Andersson"
                  },
                  "reviewBody": "Skaply hjälpte vårt företag att skapa en fantastisk webbplats som har ökat vår försäljning med 45%. Rekommenderas starkt!",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  }
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Johan Karlsson"
                  },
                  "reviewBody": "Professionella och kunniga. Levererade vår app i tid och med alla funktioner vi önskade.",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  }
                }
              ]
            }
          `}
        </Script>
        <Script id="faq-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Vad kostar det att utveckla en webbplats med Skaply?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Kostnaden för att utveckla en webbplats varierar beroende på projektets omfattning och komplexitet. Vi erbjuder skräddarsydda lösningar anpassade efter dina specifika behov och budget. Kontakta oss för en kostnadsfri konsultation där vi kan diskutera ditt projekt och ge dig en prisuppskattning."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Hur lång tid tar det att utveckla en mobilapp?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Utvecklingstiden för en mobilapp beror på appens komplexitet, antal funktioner och plattformar. En enklare app kan ta 6-8 veckor medan mer komplexa projekt kan ta 3-6 månader. Vi arbetar agilt och levererar kontinuerligt för att du ska få se resultat under hela processen."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Hur kan AI-lösningar hjälpa mitt företag?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AI-lösningar kan hjälpa ditt företag genom att automatisera repetitiva uppgifter, förbättra kundupplevelsen med chatbottar, analysera stora mängder data för bättre beslutsfattande, personalisera kundinteraktioner och optimera interna processer. Detta leder till kostnadsbesparingar, ökad effektivitet och förbättrad kundnöjdhet."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Kan Skaply hjälpa till med att förbättra en befintlig webbplats?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja, vi hjälper gärna till med att förbättra din befintliga webbplats! Vi kan modernisera designen, förbättra användarupplevelsen, optimera prestandan, implementera SEO-strategier och lägga till nya funktioner. Vi börjar med en grundlig analys av din nuvarande webbplats för att identifiera förbättringsområden."
                  }
                }
              ]
            }
          `}
        </Script>
        <Script id="local-business-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.skaply.se/#localbusiness",
              "name": "Skaply Digitalbyrå",
              "image": "https://www.skaply.se/link_preview.png",
              "url": "https://www.skaply.se",
              "telephone": "+46-70-123-45-67",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Teknikgatan 1",
                "addressLocality": "Stockholm",
                "postalCode": "12345",
                "addressCountry": "SE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "59.3293",
                "longitude": "18.0686"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "08:00",
                  "closes": "17:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/skaply",
                "https://www.linkedin.com/company/skaply"
              ]
            }
          `}
        </Script>
      </body>
    </html>
  )
}


import './globals.css'