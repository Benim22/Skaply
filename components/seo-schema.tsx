"use client"

import Script from "next/script"

interface SeoSchemaProps {
  type: 'WebPage' | 'Service' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
  name: string
  description: string 
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
}

export function SeoSchema({
  type,
  name,
  description,
  url,
  image = "https://www.skaply.se/skaply_logo.png",
  datePublished = new Date().toISOString(),
  dateModified = new Date().toISOString()
}: SeoSchemaProps) {
  // Grundläggande schema som alla sidor delar
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url,
    image,
    datePublished,
    dateModified,
    inLanguage: "sv-SE",
    isPartOf: {
      "@type": "WebSite",
      name: "Skaply",
      url: "https://www.skaply.se",
    },
    publisher: {
      "@type": "Organization",
      name: "Skaply",
      logo: {
        "@type": "ImageObject",
        url: "https://www.skaply.se/skaply_logo.png",
      },
    }
  }
  
  // Specialiserad schema baserat på sidtyp
  let pageSchema = {}
  
  // WebPage är default och behöver ingen specialisering
  
  // Service-sida
  if (type === 'Service') {
    pageSchema = {
      ...baseSchema,
      provider: {
        "@type": "Organization",
        name: "Skaply",
        url: "https://www.skaply.se",
      },
      areaServed: {
        "@type": "Country",
        name: "Sweden",
      },
      serviceType: "Digital Services",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: "https://www.skaply.se/kontakt",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "SEK",
          valueAddedTaxIncluded: true,
        },
      },
    }
  }
  
  // Om oss-sida
  if (type === 'AboutPage') {
    pageSchema = {
      ...baseSchema,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", ".about-intro"],
      },
    }
  }
  
  // Kontaktsida
  if (type === 'ContactPage') {
    pageSchema = {
      ...baseSchema,
      mainEntity: {
        "@type": "Organization",
        name: "Skaply",
        url: "https://www.skaply.se",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+46762761784",
          contactType: "customer service",
          email: "info@skaply.se",
          availableLanguage: ["Swedish", "English"],
        },
      },
    }
  }
  
  // Projektsida (Kollektionssida)
  if (type === 'CollectionPage') {
    pageSchema = {
      ...baseSchema,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            url: `${url}#projekt1`,
          },
          {
            "@type": "ListItem",
            position: 2,
            url: `${url}#projekt2`,
          },
          {
            "@type": "ListItem",
            position: 3,
            url: `${url}#projekt3`,
          },
        ],
      },
    }
  }

  const schemaData = type === 'WebPage' ? baseSchema : pageSchema
  
  return (
    <Script 
      id={`schema-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
} 