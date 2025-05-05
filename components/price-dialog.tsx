"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

interface PriceDialogProps {
  service: {
    id: string
    title: string
    color: string
    pricing: {
      basic: string
      standard: string
      premium: string
      hourly: string
      description: string
    }
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PriceDialog({ service, open, onOpenChange }: PriceDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  // Skapa specifika paket för Webbutveckling
  let plans = [];
  
  if (service.id === "web") {
    plans = [
      {
        name: "Basic",
        price: service.pricing.basic,
        features: [
          "5-7 sidor med responsiv design",
          "Professionell copywriting för grundläggande innehåll", 
          "SEO-grundoptimering", 
          "Kontaktformulär",
          "Integration med sociala medier",
          "Grundläggande Google Analytics",
          "30 dagars support efter lansering",
          "1 revision av design"
        ],
        recommended: false,
      },
      {
        name: "Standard",
        price: service.pricing.standard,
        features: [
          "Innehåller allt från Basic-paketet",
          "8-12 sidor istället för 5-7",
          "Omfattande copywriting anpassad för din målgrupp", 
          "Avancerad SEO-optimering", 
          "Anpassade formulär och funktioner",
          "CMS-integration för enkel innehållshantering",
          "Bloggsystem",
          "Grundläggande e-handelsfunktioner",
          "90 dagars support efter lansering",
          "3 revisioner av design"
        ],
        recommended: true,
      },
      {
        name: "Premium",
        price: service.pricing.premium,
        features: [
          "Innehåller allt från Standard-paketet",
          "Obegränsat antal sidor",
          "Professionell copywriting av contentspecialist",
          "Komplett SEO-strategi och implementering",
          "Avancerade formulär och interaktiva element",
          "Skräddarsytt CMS-system",
          "E-handelslösning med flera betalningsmetoder",
          "Kundportal/Inloggningssystem",
          "Prestanda-optimering för snabb laddningstid",
          "12 månaders prioriterad support",
          "Obegränsat antal revisioner",
          "Månatlig analys och optimeringsrapport"
        ],
        recommended: false,
      },
    ];
  } else if (service.id === "app") {
    plans = [
      {
        name: "Basic",
        price: service.pricing.basic,
        features: [
          "För en plattform (iOS eller Android)",
          "Upp till 5 skärmar med grundläggande funktioner",
          "Grundläggande användarhantering",
          "Lokal datalagring",
          "Enkelriktade push-notifikationer",
          "App Store/Google Play-publicering",
          "30 dagars support",
          "1 designrevision"
        ],
        recommended: false,
      },
      {
        name: "Standard",
        price: service.pricing.standard,
        features: [
          "Innehåller allt från Basic-paketet +",
          "Både iOS och Android",
          "Upp till 10 skärmar",
          "Anpassad UI/UX med användartester",
          "Molnbaserad datalagring",
          "Offline-synkronisering",
          "Sociala medier-integrationer",
          "Enklare betalningslösningar",
          "90 dagars support",
          "3 designrevisioner"
        ],
        recommended: true,
      },
      {
        name: "Premium",
        price: service.pricing.premium,
        features: [
          "Innehåller allt från Standard-paketet +",
          "Webb-app utöver mobilplattformar",
          "Obegränsat antal skärmar",
          "Avancerad UI/UX med animationer",
          "Realtidsdatabas och synkronisering",
          "Geo-tjänster och kartfunktioner",
          "API-integrationer med tredjepartssystem",
          "Fullständiga betalningslösningar",
          "AI/ML-funktioner",
          "Community-funktioner",
          "1 års prioriterad support",
          "Obegränsade designrevisioner"
        ],
        recommended: false,
      },
    ];
  } else if (service.id === "ai") {
    plans = [
      {
        name: "Basic",
        price: service.pricing.basic,
        features: [
          "1 AI-funktion (chatbot/dataanalys/prediktion)",
          "Träning på grundläggande data",
          "Enkel integration med befintliga system",
          "Regelbundna uppdateringar (månadsvis)",
          "Användarvänligt gränssnitt",
          "Grundläggande dataanalys",
          "30 dagars support",
          "Upp till 1000 användarinteraktioner/mån"
        ],
        recommended: false,
      },
      {
        name: "Standard",
        price: service.pricing.standard,
        features: [
          "Innehåller allt från Basic-paketet +",
          "2-3 AI-funktioner",
          "Anpassad träning på egen data",
          "Avancerade integrationer",
          "Automatisk ompträning (veckovis)",
          "Dashboard för resultatanalys",
          "90 dagars support",
          "Upp till 5000 användarinteraktioner/mån"
        ],
        recommended: true,
      },
      {
        name: "Premium",
        price: service.pricing.premium,
        features: [
          "Innehåller allt från Standard-paketet +",
          "Obegränsat antal AI-funktioner",
          "Kontinuerlig träning och förbättring",
          "Skräddarsydda modeller",
          "Högskaliga API-integrationer",
          "Realtidsuppföljning och -analys",
          "1 års prioriterad support",
          "Obegränsade användarinteraktioner"
        ],
        recommended: false,
      },
    ];
  } else if (service.id === "design") {
    plans = [
      {
        name: "Basic",
        price: service.pricing.basic,
        features: [
          "Logotyp (2 koncept, 2 revisioner)",
          "Grundläggande färgpalett",
          "Typografirekommendationer",
          "Enkla visitkort/brevpapper",
          "Digitala mallar (social media)",
          "Leverans i standardformat",
          "30 dagars support",
          "Upphovsrätt överlåts till kunden"
        ],
        recommended: false,
      },
      {
        name: "Standard",
        price: service.pricing.standard,
        features: [
          "Innehåller allt från Basic-paketet +",
          "Logotyp (4 koncept, 3 revisioner)",
          "Utökad färgpalett och mönster",
          "Fullständigt typografisystem",
          "Komplett tryckt material",
          "UI-komponenter för digital närvaro",
          "Varumärkesguide (10-15 sidor)",
          "90 dagars support"
        ],
        recommended: true,
      },
      {
        name: "Premium",
        price: service.pricing.premium,
        features: [
          "Innehåller allt från Standard-paketet +",
          "Logotyp (obegränsade revisioner)",
          "Animerad logotyp för digital användning",
          "Omfattande designsystem",
          "Produktförpackningsmockups",
          "Fullständigt UI-kit för webb/app",
          "Omfattande varumärkesmanual",
          "1 års support och uppdateringar"
        ],
        recommended: false,
      },
    ];
  } else if (service.id === "digital-marketing") {
    plans = [
      {
        name: "Basic",
        price: service.pricing.basic,
        features: [
          "1 plattform (valfri social media)",
          "Grundläggande strategi",
          "4 inlägg per månad",
          "Månatlig uppföljning",
          "Grundläggande annonsering",
          "Enkel målgruppsanalys",
          "Rapportering kvartalsvis",
          "E-postsupport"
        ],
        recommended: false,
      },
      {
        name: "Standard",
        price: service.pricing.standard,
        features: [
          "Innehåller allt från Basic-paketet +",
          "3 plattformar",
          "12 inlägg per månad",
          "Innehållskalender",
          "Avancerad annonshantering",
          "Community management",
          "Månatlig rapportering",
          "E-post- och telefonsupport"
        ],
        recommended: true,
      },
      {
        name: "Premium",
        price: service.pricing.premium,
        features: [
          "Innehåller allt från Standard-paketet +",
          "Obegränsat antal plattformar",
          "Daglig innehållshantering",
          "Influencer-samarbeten",
          "A/B-testning av kampanjer",
          "Skräddarsydd innehållsstrategi",
          "Veckovis rapportering",
          "Prioriterad support dygnet runt"
        ],
        recommended: false,
      },
    ];
  } else if (service.id === "ecommerce") {
    plans = [
      {
        name: "Basic",
        price: service.pricing.basic,
        features: [
          "Upp till 50 produkter",
          "Responsiv produktkatalog",
          "Grundläggande checkout",
          "2 betalningsmetoder",
          "SEO-grundoptimering",
          "Order- och lagerhantering",
          "30 dagars support",
          "Enkel analys"
        ],
        recommended: false,
      },
      {
        name: "Standard",
        price: service.pricing.standard,
        features: [
          "Innehåller allt från Basic-paketet +",
          "Upp till 500 produkter",
          "Multivaluta och språkstöd",
          "5+ betalningsmetoder",
          "Kundkonton och recensioner",
          "Rabattkoder och kampanjer",
          "90 dagars support",
          "Avancerad analysrapportering"
        ],
        recommended: true,
      },
      {
        name: "Premium",
        price: service.pricing.premium,
        features: [
          "Innehåller allt från Standard-paketet +",
          "Obegränsat antal produkter",
          "Integrerade leveranssystem",
          "Alla större betalningslösningar",
          "Kundlojalitetsprogram",
          "Prenumerationshantering",
          "1 års prioriterad support",
          "Fullständig ERP-integration"
        ],
        recommended: false,
      },
    ];
  } else {
    plans = [
      {
        name: "Basic",
        price: service.pricing.basic,
        features: ["Grundläggande funktionalitet", "Standard design", "Enklare integrationer", "30 dagars support"],
        recommended: false,
      },
      {
        name: "Standard",
        price: service.pricing.standard,
        features: [
          "Utökad funktionalitet",
          "Anpassad design",
          "Fler integrationer",
          "90 dagars support",
          "Prestanda-optimering",
        ],
        recommended: true,
      },
      {
        name: "Premium",
        price: service.pricing.premium,
        features: [
          "Komplett funktionalitet",
          "Helt skräddarsydd design",
          "Avancerade integrationer",
          "12 månaders support",
          "Prestanda-optimering",
          "SEO-optimering",
          "Kontinuerliga uppdateringar",
        ],
        recommended: false,
      },
    ];
  }

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeader className="p-6 pb-0 shrink-0">
          <DialogTitle className="text-2xl">Riktpriser för {service.title}</DialogTitle>
          <DialogDescription className="text-foreground/70">
            {service.id === "web" ? (
              <>
                Nedan ser du våra paket för webbutveckling. Varje paket är utformat för att uppfylla olika behov och budgetar.
                Alla webbplatser vi skapar är responsiva, snabba och SEO-optimerade som standard.
              </>
            ) : service.id === "app" ? (
              <>
                Nedan ser du våra paket för apputveckling. Varje paket är skräddarsytt för att möta olika krav på funktionalitet och design.
                Alla våra appar utvecklas med React Native för att säkerställa smidig funktion och enhetlig kodbase.
              </>
            ) : service.id === "ai" ? (
              <>
                Nedan ser du våra paket för AI-lösningar. Varje paket är skräddarsytt för att möta olika krav på funktionalitet och design.
                Alla våra AI-lösningar utvecklas med hög kvalitet och anpassas efter dina specifika behov och önskemål.
              </>
            ) : service.id === "design" ? (
              <>
                Nedan ser du våra paket för Grafisk Design. Varje paket är skräddarsytt för att möta olika krav på funktionalitet och design.
                Alla våra grafiska designlösningar utvecklas med hög kvalitet och anpassas efter dina specifika behov och önskemål.
              </>
            ) : service.id === "digital-marketing" ? (
              <>
                Nedan ser du våra paket för Digital Marknadsföring. Varje paket är skräddarsytt för att möta olika krav på funktionalitet och design.
                Alla våra digitala marknadsföringslösningar utvecklas med hög kvalitet och anpassas efter dina specifika behov och önskemål.
              </>
            ) : service.id === "ecommerce" ? (
              <>
                Nedan ser du våra paket för E-handel. Varje paket är skräddarsytt för att möta olika krav på funktionalitet och design.
                Alla våra e-handelslösningar utvecklas med hög kvalitet och anpassas efter dina specifika behov och önskemål.
              </>
            ) : (
              <>
                Nedan ser du våra riktpriser för {service.title.toLowerCase()}. Kontakta oss för en skräddarsydd offert.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 overflow-y-auto scrollbar-thin">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`relative rounded-lg border ${
                  selectedPlan === plan.name ? "border-[#00ADB5] ring-2 ring-[#00ADB5]" : "border-border"
                } p-4 cursor-pointer h-full flex flex-col`}
                onClick={() => handleSelectPlan(plan.name)}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#00ADB5] text-white text-xs py-1 px-3 rounded-full">
                    Rekommenderad
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <div className="text-2xl font-bold mt-2">{plan.price}</div>
                </div>
                <ul className="space-y-2 mb-4 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-[#00ADB5] mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#16213E]/30 rounded-lg p-4 flex items-start space-x-3 mb-6">
            <Info className="h-5 w-5 text-[#00ADB5] shrink-0 mt-0.5" />
            <div className="text-sm">
              {service.id === "web" ? (
                <>
                  <p className="mb-2">Alla priser är riktpriser. Varje webbprojekt är unikt och vi anpassar vår offert baserat på dina specifika behov och önskemål. I alla paket ingår:</p>
                  <ul className="list-disc pl-5 mb-2 space-y-1">
                    <li>Mötesbokning och behovsanalys</li>
                    <li>Design som följer din grafiska profil</li>
                    <li>Mobilanpassad och responsiv design</li>
                    <li>Webbhotell och domänregistrering (första året)</li>
                    <li>SSL-certifikat för säker anslutning</li>
                  </ul>
                  <p>Vi erbjuder även löpande webbutveckling till {service.pricing.hourly}.</p>
                </>
              ) : service.id === "app" ? (
                <>
                  <p className="mb-2">Alla priser är riktpriser. Apputveckling anpassas alltid efter dina behov, målgrupp och tekniska krav. I alla paket ingår:</p>
                  <ul className="list-disc pl-5 mb-2 space-y-1">
                    <li>Grundlig behovsanalys och specifikation</li>
                    <li>Wireframing och prototyper</li>
                    <li>Användartester och kvalitetssäkring</li>
                    <li>Backend-infrastruktur (databas/API)</li>
                    <li>Teknisk support vid lansering</li>
                    <li>Publicering på App Store och/eller Google Play</li>
                  </ul>
                  <p>Vi erbjuder även löpande apputveckling och underhåll till {service.pricing.hourly}.</p>
                </>
              ) : service.id === "ai" ? (
                <>
                  <p className="mb-2">Alla priser är riktpriser. AI-lösningar anpassas alltid efter dina behov, målgrupp och tekniska krav. I alla paket ingår:</p>
                  <ul className="list-disc pl-5 mb-2 space-y-1">
                    <li>Grundlig behovsanalys och specifikation</li>
                    <li>AI-modellutveckling och träning</li>
                    <li>Integrering med befintliga system</li>
                    <li>Regelbundna uppdateringar</li>
                    <li>Användarvänligt gränssnitt</li>
                    <li>Grundläggande dataanalys</li>
                  </ul>
                  <p>Vi erbjuder även löpande AI-lösningar och underhåll till {service.pricing.hourly}.</p>
                </>
              ) : service.id === "design" ? (
                <>
                  <p className="mb-2">Alla priser är riktpriser. Grafisk design anpassas alltid efter dina behov, målgrupp och tekniska krav. I alla paket ingår:</p>
                  <ul className="list-disc pl-5 mb-2 space-y-1">
                    <li>Grundlig behovsanalys och specifikation</li>
                    <li>Logotyputveckling och -design</li>
                    <li>Färgpalett och mönsterdesign</li>
                    <li>Typografi- och tryckdesign</li>
                    <li>Digital och tryckt materialdesign</li>
                    <li>UI- och UX-design</li>
                    <li>Varumärkesguide</li>
                  </ul>
                  <p>Vi erbjuder även löpande grafisk design och underhåll till {service.pricing.hourly}.</p>
                </>
              ) : service.id === "digital-marketing" ? (
                <>
                  <p className="mb-2">Alla priser är riktpriser. Digital marknadsföring anpassas alltid efter dina behov, målgrupp och tekniska krav. I alla paket ingår:</p>
                  <ul className="list-disc pl-5 mb-2 space-y-1">
                    <li>Grundlig behovsanalys och strategi</li>
                    <li>Innehållsplanering och -skapande</li>
                    <li>Sociala medier-hantering</li>
                    <li>SEO-optimering</li>
                    <li>Annonsering och kampanjanalys</li>
                    <li>Community-hantering</li>
                  </ul>
                  <p>Vi erbjuder även löpande digital marknadsföring och underhåll till {service.pricing.hourly}.</p>
                </>
              ) : service.id === "ecommerce" ? (
                <>
                  <p className="mb-2">Alla priser är riktpriser. E-handel anpassas alltid efter dina behov, målgrupp och tekniska krav. I alla paket ingår:</p>
                  <ul className="list-disc pl-5 mb-2 space-y-1">
                    <li>Grundlig behovsanalys och specifikation</li>
                    <li>Produktinlägg och kataloghantering</li>
                    <li>Checkout-process och lagerhantering</li>
                    <li>Betalningshantering</li>
                    <li>Kundrelaterad analys</li>
                    <li>ERP-integration</li>
                  </ul>
                  <p>Vi erbjuder även löpande e-handel och underhåll till {service.pricing.hourly}.</p>
                </>
              ) : (
                <>
                  <p className="mb-2">{service.pricing.description}</p>
                  <p>Vi erbjuder även löpande arbete till {service.pricing.hourly}.</p>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 sticky bottom-0 pt-2 bg-background">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Stäng
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white">
                <Link href="/kontakt">Kontakta oss för offert</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
