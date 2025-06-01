"use client"

import { motion } from "framer-motion"
import { Check, X, Globe, Smartphone, Crown, Sparkles, Zap, Shield, MessageCircle, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

// Webb-prenumerationer
const webPlans = [
  {
    id: "start",
    name: "Start",
    subtitle: "Kom igång",
    price: "1 495",
    startupFee: "2 500",
    commitment: "6 månader",
    icon: Globe,
    color: "from-[#00ADB5] to-[#0F3460]",
    popular: false,
    features: [
      { text: "1 landningssida (Next.js, mobilanpassad)", included: true },
      { text: "Grunddesign enligt färdigt tema", included: true },
      { text: "Hosting & domänhantering", included: true },
      { text: "Supabase CMS för enkel innehållsredigering", included: true },
      { text: "1 språk", included: true },
      { text: "Bas-Support via e-post", included: true },
      { text: "Avancerade funktioner, API:er eller SEO", included: false },
    ],
    description: "Perfekt för nystartade företag & mindre verksamheter som vill komma online snabbt."
  },
  {
    id: "growth",
    name: "Tillväxt",
    subtitle: "Skalbar närvaro",
    price: "2 995",
    startupFee: "4 000",
    commitment: "6 månader",
    icon: Zap,
    color: "from-[#E94560] to-[#00ADB5]",
    popular: true,
    features: [
      { text: "Upp till 5 sidor (Om oss, Tjänster, Kontakt etc.)", included: true },
      { text: "Anpassad design (med er branding)", included: true },
      { text: "Grundläggande SEO & Google-indexering", included: true },
      { text: "CMS via Supabase (anpassad dashboard)", included: true },
      { text: "AI-chattbot med begränsad funktion", included: true },
      { text: "Hosting & SSL, analytics via Vercel", included: true },
      { text: "Support via e-post & chatt (vardagar)", included: true },
      { text: "Enkel AI-automatisering (autosvar, CTA)", included: true },
    ],
    description: "För små till medelstora företag som vill växa och har större ambitioner online."
  },
  {
    id: "pro",
    name: "Pro",
    subtitle: "Digital Partner",
    price: "5 995",
    startupFee: "9 000",
    commitment: "12 månader",
    icon: Crown,
    color: "from-[#0F3460] to-[#E94560]",
    popular: false,
    features: [
      { text: "Obegränsat antal sidor", included: true },
      { text: "Fullt skräddarsydd design (Figma > kod)", included: true },
      { text: "Fleranvändarstöd och inloggning", included: true },
      { text: "Flerspråkstöd", included: true },
      { text: "AI-drivna funktioner (innehåll, kundservice, automation)", included: true },
      { text: "SEO-strategi + analysrapporter varje kvartal", included: true },
      { text: "Integrationer (API:er, Zapier, Fortnox, CRM etc.)", included: true },
      { text: "Hosting, backup, övervakning", included: true },
      { text: "Prioriterad support + månadsavstämningar", included: true },
    ],
    description: "För företag med höga ambitioner & komplexitet som behöver en fullständig digital partner."
  }
]

// App-prenumerationer
const appPlans = [
  {
    id: "app-mini",
    name: "App Mini",
    subtitle: "Närvaro i fickan",
    price: "1 495",
    startupFee: "3 500",
    commitment: "6 månader",
    icon: Smartphone,
    color: "from-[#00ADB5] to-[#0F3460]",
    popular: false,
    features: [
      { text: "1-skärms app (meny, bokning, kontakt)", included: true },
      { text: "Responsiv design efter branding", included: true },
      { text: "Publicering till App Store & Google Play", included: true },
      { text: "Uppdateringar vid buggar / OS-förändringar", included: true },
      { text: "Push-notiser via Expo", included: true },
      { text: "Hosting & backend via Supabase", included: true },
      { text: "Inloggning, databas eller användarlogik", included: false },
    ],
    description: "Enkel app-närvaro för företag som vill finnas i App Store & Google Play."
  },
  {
    id: "app-flex",
    name: "App Flex",
    subtitle: "Funktionell & skalbar",
    price: "3 495",
    startupFee: "6 500",
    commitment: "6 månader",
    icon: Zap,
    color: "from-[#E94560] to-[#00ADB5]",
    popular: true,
    features: [
      { text: "Upp till 5 skärmar/sidor", included: true },
      { text: "Autentisering via Supabase Auth", included: true },
      { text: "Realtidsdatabas (Supabase tables)", included: true },
      { text: "Integration till existerande API", included: true },
      { text: "Push-notiser", included: true },
      { text: "Analytics (expo-firebase-analytics)", included: true },
      { text: "CMS via Supabase Dashboard", included: true },
      { text: "Löpande support & underhåll", included: true },
    ],
    description: "För företag som vill erbjuda funktioner & interaktion i appen."
  },
  {
    id: "app-pro",
    name: "App Pro",
    subtitle: "Fullt digitalt ekosystem",
    price: "6 995",
    startupFee: "12 000",
    commitment: "12 månader",
    icon: Crown,
    color: "from-[#0F3460] to-[#E94560]",
    popular: false,
    features: [
      { text: "Obegränsat antal skärmar", included: true },
      { text: "Skräddarsydd design i Figma (UI/UX)", included: true },
      { text: "Inloggning, roller & sessionshantering", included: true },
      { text: "Offline-stöd, cache", included: true },
      { text: "Stripe-integration för betalningar", included: true },
      { text: "Supabase Storage för bilder/filer", included: true },
      { text: "AI-integration (chatbot, rekommendationer)", included: true },
      { text: "Avancerade API-kopplingar (CRM, Fortnox)", included: true },
      { text: "Prioriterad support, månadsmöten, roadmap", included: true },
    ],
    description: "För företag med komplexa behov eller app som huvudprodukt."
  }
]

// Add-ons
const addOns = [
  { name: "AI Chatbot med röst/skrivfunktion", price: "495" },
  { name: "App-för-webb-dashboard", price: "995" },
  { name: "Multispråkstöd", price: "595" },
  { name: "Stripe-betalningar", price: "395" },
  { name: "QR-kod / scannerfunktion", price: "295" },
]

interface PlanCardProps {
  plan: any
  index: number
  type: "web" | "app"
}

function PlanCard({ plan, index, type }: PlanCardProps) {
  const containerVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative ${plan.popular ? 'z-10' : 'z-0'}`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <Badge className="bg-gradient-to-r from-[#E94560] to-[#E94560]/80 text-white border-0 shadow-lg px-4 py-1">
            <Star className="h-3 w-3 mr-1" />
            Mest populär
          </Badge>
        </div>
      )}
      
      <Card className={`relative bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl border-[#0F3460]/30 shadow-2xl overflow-hidden h-full ${
        plan.popular ? 'border-[#E94560]/50 shadow-[#E94560]/10' : 'hover:border-[#00ADB5]/50'
      } transition-all duration-500`}>
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-5`} />
        
        <CardHeader className="relative z-10 text-center pb-6">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg`}>
            <plan.icon className="h-8 w-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
          <p className="text-[#00ADB5] font-medium text-sm uppercase tracking-wide">{plan.subtitle}</p>
          
          <div className="mt-6">
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="text-foreground/70 ml-2">kr/mån</span>
            </div>
            <p className="text-sm text-foreground/60 mt-2">
              Startavgift: <span className="text-[#00ADB5] font-semibold">{plan.startupFee} kr</span>
            </p>
            <p className="text-xs text-foreground/50 mt-1">
              Bindningstid: {plan.commitment}
            </p>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 pt-0">
          <p className="text-foreground/80 text-sm mb-6 leading-relaxed text-center">
            {plan.description}
          </p>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature: any, i: number) => (
              <li key={i} className="flex items-start">
                {feature.included ? (
                  <Check className="h-5 w-5 text-[#00ADB5] mr-3 shrink-0 mt-0.5" />
                ) : (
                  <X className="h-5 w-5 text-red-400 mr-3 shrink-0 mt-0.5" />
                )}
                <span className={`text-sm ${feature.included ? 'text-foreground/90' : 'text-foreground/50 line-through'}`}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <Button 
              asChild 
              className={`w-full ${
                plan.popular 
                  ? 'bg-gradient-to-r from-[#E94560] to-[#E94560]/80 hover:from-[#E94560]/90 hover:to-[#E94560]/70' 
                  : 'bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 hover:from-[#00ADB5]/90 hover:to-[#00ADB5]/70'
              } text-white border-0 shadow-lg`}
            >
              <Link href="/kontakt">
                <MessageCircle className="h-4 w-4 mr-2" />
                Välj {plan.name}
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              className="w-full border-[#0F3460]/30 hover:bg-[#00ADB5]/10 hover:text-[#00ADB5] hover:border-[#00ADB5]/50 backdrop-blur-sm"
            >
              <Link href="/kontakt">
                Läs mer & få offert
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function SubscriptionPlans() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="space-y-24">
      {/* Webb-prenumerationer */}
      <section>
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#00ADB5]/10 border border-[#00ADB5]/20 rounded-full px-4 py-2 mb-6">
              <Globe className="h-4 w-4 text-[#00ADB5]" />
              <span className="text-sm text-[#00ADB5] font-medium">Webb som en tjänst</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ADB5] via-white to-[#E94560]">
              Prenumerera på din
              <br />
              <span className="text-white">Webbplats</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Moderna, AI-drivna och skräddarsydda webbplatser som prenumerationstjänst. 
              Utveckling, hosting, support och löpande förbättringar – utan höga startkostnader.
            </p>
          </div>
        </ScrollReveal>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {webPlans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} type="web" />
          ))}
        </motion.div>
      </section>

      {/* App-prenumerationer */}
      <section>
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#E94560]/10 border border-[#E94560]/20 rounded-full px-4 py-2 mb-6">
              <Smartphone className="h-4 w-4 text-[#E94560]" />
              <span className="text-sm text-[#E94560] font-medium">App som en tjänst</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#E94560] via-white to-[#00ADB5]">
              Prenumerera på din
              <br />
              <span className="text-white">Mobilapp</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Skalbara mobilappar utvecklade i React Native med Supabase som backend. 
              Designade med ert varumärke och tillgängliga via App Store & Google Play.
            </p>
          </div>
        </ScrollReveal>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {appPlans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} type="app" />
          ))}
        </motion.div>
      </section>

      {/* Add-ons sektion */}
      <section>
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0F3460]/20 border border-[#0F3460]/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-[#00ADB5]" />
              <span className="text-sm text-[#00ADB5] font-medium">Tilläggstjänster</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
              Utöka med Add-ons
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Lägg till extra funktionalitet för att få ännu mer ut av din prenumeration.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOns.map((addon, index) => (
            <motion.div
              key={addon.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#16213E]/60 to-[#1A1A2E]/60 backdrop-blur-xl rounded-2xl p-6 border border-[#0F3460]/30 hover:border-[#00ADB5]/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-white text-sm">{addon.name}</h3>
                <span className="text-[#00ADB5] font-bold text-sm">{addon.price} kr/mån</span>
              </div>
              <Button 
                asChild 
                variant="outline" 
                size="sm" 
                className="w-full border-[#0F3460]/30 hover:bg-[#00ADB5]/10 hover:text-[#00ADB5] text-xs"
              >
                <Link href="/kontakt">
                  Lägg till
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* App som tillägg till webb */}
      <section>
        <ScrollReveal>
          <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-[#0F3460]/30 shadow-2xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00ADB5] to-[#E94560] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Smartphone className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              App som Tilläggstjänst till Webb
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              Har du redan en webb-prenumeration? Lägg till en React Native-baserad app som speglar din hemsida 
              för endast <span className="text-[#00ADB5] font-bold">1 500 kr/mån extra</span> (för Start/Tillväxt-plan).
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              <div className="bg-[#0F3460]/20 rounded-2xl p-4">
                <Shield className="h-6 w-6 text-[#00ADB5] mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">Inkluderar</h3>
                <ul className="text-xs text-foreground/70 space-y-1">
                  <li>• Mobil app i Expo/React Native</li>
                  <li>• Supabase som backend</li>
                  <li>• UI i linje med webbdesign</li>
                  <li>• Publicering till App Store / Google Play</li>
                </ul>
              </div>
              <div className="bg-[#0F3460]/20 rounded-2xl p-4">
                <Zap className="h-6 w-6 text-[#E94560] mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">Fördelar</h3>
                <ul className="text-xs text-foreground/70 space-y-1">
                  <li>• Samma design som webben</li>
                  <li>• Enhetlig användarupplevelse</li>
                  <li>• Delad databas och innehåll</li>
                  <li>• Kostnadseffektiv lösning</li>
                </ul>
              </div>
            </div>

            <Button 
              asChild 
              className="bg-gradient-to-r from-[#00ADB5] to-[#E94560] hover:from-[#00ADB5]/90 hover:to-[#E94560]/90 text-white border-0 shadow-lg shadow-[#00ADB5]/25"
            >
              <Link href="/kontakt">
                <MessageCircle className="h-4 w-4 mr-2" />
                Lägg till app till min webb-prenumeration
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* Call to action */}
      <section>
        <ScrollReveal>
          <div className="bg-gradient-to-br from-[#16213E]/80 to-[#1A1A2E]/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-[#0F3460]/30 shadow-2xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00ADB5] to-[#00ADB5]/80 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Redo att komma igång?
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Välj den prenumeration som passar ditt företag bäst. Vi hjälper dig att komma online snabbt 
              med moderna, skalbara lösningar som växer med ditt företag.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                className="bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 hover:from-[#00ADB5]/90 hover:to-[#00ADB5]/70 text-white border-0 shadow-lg shadow-[#00ADB5]/25"
              >
                <Link href="/kontakt">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Få en kostnadsfri konsultation
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline"
                className="border-[#0F3460]/30 hover:bg-[#00ADB5]/10 hover:text-[#00ADB5] hover:border-[#00ADB5]/50 backdrop-blur-sm"
              >
                <Link href="/projekt">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Se exempel på vårt arbete
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
} 