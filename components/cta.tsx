"use client"

import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { motion } from "framer-motion"

export function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-gradient-to-b from-background to-[#1A1A2E]">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto text-center">
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#00ADB5]/20 via-[#0F3460]/20 to-[#E94560]/20 rounded-lg blur-xl opacity-70 animate-pulse"
              style={{ animationDuration: "15s" }}
            />
            <motion.div
              className="relative bg-[#16213E] rounded-lg p-10 md:p-12 border border-[#0F3460]/30"
              whileHover={{ boxShadow: "0 0 30px rgba(0, 173, 181, 0.2)" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Redo att ta ditt företag till nästa nivå?</h2>
              <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
                Låt oss hjälpa dig att skapa digitala lösningar som driver tillväxt och innovation. Boka en gratis
                konsultation idag.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button asChild size="lg" className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white">
                  <Link href="/kontakt">
                    Boka gratis konsultation
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "mirror",
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
