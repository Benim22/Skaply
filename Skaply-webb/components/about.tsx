"use client"

import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { motion } from "framer-motion"

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-gradient-to-b from-background to-[#1A1A2E]/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div
                className="absolute -inset-4 bg-gradient-to-r from-[#00ADB5]/20 to-[#E94560]/20 rounded-lg blur-lg opacity-70 animate-pulse"
                style={{ animationDuration: "10s" }}
              />
              <div className="relative bg-[#16213E] rounded-lg p-6 md:p-8 border border-[#0F3460]/30 hover:border-[#00ADB5]/50 transition-colors duration-500">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Om Skaply</h2>
                <p className="text-foreground/80 mb-4">
                  Skaply är en digital byrå grundad av Lucas och Daniel, två passionerade utvecklare med en vision om
                  att skapa digitala lösningar som gör skillnad.
                </p>
                <p className="text-foreground/80 mb-6">
                  Med vår tekniska expertis inom React, Next.js och Supabase hjälper vi företag att bygga moderna,
                  snabba och användarvänliga digitala produkter.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button asChild className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white">
                    <Link href="/om-oss">
                      Läs mer om oss
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
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4">
            <ScrollReveal direction="right" delay={0.1}>
              <motion.div
                className="bg-[#0F3460]/20 rounded-lg p-6 border border-[#0F3460]/30 hover:border-[#0F3460]/70 transition-colors duration-300"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold mb-2">Vår Vision</h3>
                <p className="text-foreground/70">
                  Att skapa digitala lösningar som kombinerar teknisk excellens med användarvänlighet.
                </p>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <motion.div
                className="bg-[#00ADB5]/20 rounded-lg p-6 border border-[#00ADB5]/30 hover:border-[#00ADB5]/70 transition-colors duration-300"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold mb-2">Vår Metod</h3>
                <p className="text-foreground/70">
                  Agil utveckling med fokus på kvalitet, kommunikation och kontinuerlig förbättring.
                </p>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <motion.div
                className="bg-[#E94560]/20 rounded-lg p-6 border border-[#E94560]/30 hover:border-[#E94560]/70 transition-colors duration-300"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold mb-2">Våra Värderingar</h3>
                <p className="text-foreground/70">
                  Transparens, innovation och långsiktiga relationer med våra kunder.
                </p>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <motion.div
                className="bg-[#16213E] rounded-lg p-6 border border-[#0F3460]/30 hover:border-[#0F3460]/70 transition-colors duration-300"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold mb-2">Vårt Team</h3>
                <p className="text-foreground/70">
                  Erfarna utvecklare och designers med passion för digitalt hantverk.
                </p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

