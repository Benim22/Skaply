"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "Vilka typer av företag arbetar ni med?",
    answer:
      "Vi arbetar med företag i alla storlekar, från startup till storföretag. Våra lösningar anpassas efter era specifika behov och mål. Vi har erfarenhet från olika branscher som e-handel, tjänsteföretag, fintech och många andra.",
  },
  {
    question: "Hur lång tid tar det att utveckla en webbplats?",
    answer:
      "Utvecklingstiden varierar beroende på projektets omfattning och komplexitet. En enklare webbplats kan ta 4-6 veckor, medan mer komplexa lösningar som e-handelsplattformar kan ta 2-4 månader. Vi diskuterar alltid tidslinjen i detalj under vårt första möte.",
  },
  {
    question: "Hur ser er utvecklingsprocess ut?",
    answer:
      "Vi följer en agil utvecklingsmetodik med iterativa leveranser. Processen börjar med en discovery-fas där vi definierar mål och krav, följt av design, utveckling, testning och lansering. Efter lansering erbjuder vi löpande förvaltning och vidareutveckling.",
  },
  {
    question: "Använder ni några specifika teknologier?",
    answer:
      "Vi specialiserar oss på moderna JavaScript-ramverk som React, Next.js och React Native. För backend använder vi ofta Node.js och Supabase. Vårt teknikval baseras alltid på vad som passar bäst för ert specifika projekt och långsiktiga behov.",
  },
  {
    question: "Hur prissätter ni era tjänster?",
    answer:
      "Vi erbjuder transparent prissättning baserat på projektets omfattning och komplexitet. För de flesta projekt arbetar vi med fast pris efter en grundlig behovsanalys. Vi erbjuder även löpande tim-baserade avtal för kontinuerligt samarbete och vidareutveckling.",
  },
  {
    question: "Erbjuder ni support efter lansering?",
    answer:
      "Ja, vi erbjuder olika nivåer av support och underhåll efter lansering. Detta kan inkludera teknisk support, innehållsuppdateringar, säkerhetsuppdateringar och prestanda-optimeringar. Vi skräddarsyr supportavtal efter era behov.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vanliga frågor</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Här hittar du svar på de vanligaste frågorna vi får. Hittar du inte svaret du söker? Kontakta oss direkt
              så hjälper vi dig.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="mb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center bg-[#16213E]/80 hover:bg-[#16213E] p-4 rounded-lg text-left transition-colors duration-300"
                >
                  <span className="font-semibold">{item.question}</span>
                  <span>{openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-[#0F3460]/20 rounded-b-lg border-t border-[#0F3460]/30">
                        <p className="text-foreground/80">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
} 