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
  title: "Skaply - Digitala lösningar för framtiden",
  description:
    "Skaply är en digital byrå som bygger framtidens lösningar för webben, mobilen och AI. Med teknisk spets inom React, Next.js och Supabase hjälper vi företag att växa – snabbt, snyggt och skräddarsytt.",
  generator: 'v0.dev',
  metadataBase: new URL('https://www.skaply.se'),
  keywords: ['webbutveckling', 'apputveckling', 'AI-lösningar', 'design', 'digital marknadsföring', 'e-handel', 'Stockholm'],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  openGraph: {
    title: 'Skaply - Digitala lösningar för framtiden',
    description: 'Vi bygger framtidens digitala lösningar för webben, mobilen och AI. Med teknisk spets inom React, Next.js och Supabase hjälper vi företag att växa.',
    url: 'https://www.skaply.se',
    siteName: 'Skaply',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skaply - Digitala lösningar för framtiden',
    description: 'Vi bygger framtidens digitala lösningar för webben, mobilen och AI. Med teknisk spets inom React, Next.js och Supabase hjälper vi företag att växa.',
  },
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
              "name": "Skaply",
              "url": "https://www.skaply.se",
              "logo": "https://www.skaply.se/logo.png",
              "description": "Skaply är en digital byrå som bygger framtidens lösningar för webben, mobilen och AI.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Teknikgatan 1",
                "addressLocality": "Stockholm",
                "postalCode": "12345",
                "addressCountry": "SE"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+46-70-123-45-67",
                "contactType": "customer service",
                "email": "info@skaply.se"
              },
              "sameAs": [
                "https://www.facebook.com/skaply",
                "https://www.twitter.com/skaply",
                "https://www.instagram.com/skaply",
                "https://www.linkedin.com/company/skaply"
              ],
              "offers": {
                "@type": "AggregateOffer",
                "offerCount": "6",
                "offeredItem": [
                  {
                    "@type": "Service",
                    "name": "Webbutveckling",
                    "description": "Moderna, snabba och responsiva webbplatser med React, Next.js och Supabase."
                  },
                  {
                    "@type": "Service",
                    "name": "Apputveckling",
                    "description": "Skräddarsydda mobilappar och spel med React Native för iOS och Android."
                  },
                  {
                    "@type": "Service",
                    "name": "AI-lösningar",
                    "description": "Smarta chatbottar, automationer och AI-integrationer för ditt företag."
                  },
                  {
                    "@type": "Service",
                    "name": "Grafisk design",
                    "description": "Logotyper, visuell identitet och UI/UX-design som sticker ut."
                  },
                  {
                    "@type": "Service",
                    "name": "Digital Marknadsföring",
                    "description": "Strategier för att nå din målgrupp online och öka din digitala närvaro."
                  },
                  {
                    "@type": "Service",
                    "name": "E-handel",
                    "description": "Kompletta lösningar för online-försäljning med fokus på användarvänlighet och konvertering."
                  }
                ]
              }
            }
          `}
        </Script>
      </body>
    </html>
  )
}


import './globals.css'