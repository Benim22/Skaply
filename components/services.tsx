"use client"

import { useInView } from "react-intersection-observer"
import { Globe, Smartphone, Brain, Palette, Target, ShoppingCart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { motion } from "framer-motion"

const services = [
  {
    title: "Webbutveckling",
    description: "Moderna, snabba och responsiva webbplatser med React, Next.js och Supabase.",
    icon: Globe,
    color: "from-[#00ADB5] to-[#0F3460]",
  },
  {
    title: "Apputveckling",
    description: "Skräddarsydda mobilappar och spel med React Native för iOS och Android.",
    icon: Smartphone,
    color: "from-[#0F3460] to-[#00ADB5]",
  },
  {
    title: "AI-lösningar",
    description: "Smarta chatbottar, automationer och AI-integrationer för ditt företag.",
    icon: Brain,
    color: "from-[#E94560] to-[#0F3460]",
  },
  {
    title: "Grafisk design",
    description: "Logotyper, visuell identitet och UI/UX-design som sticker ut.",
    icon: Palette,
    color: "from-[#0F3460] to-[#E94560]",
  },
  {
    title: "Digital Marknadsföring",
    description: "Strategier för att nå din målgrupp online och öka din digitala närvaro.",
    icon: Target,
    color: "from-[#00ADB5] to-[#E94560]",
  },
  {
    title: "E-handel",
    description: "Kompletta lösningar för online-försäljning med fokus på användarvänlighet och konvertering.",
    icon: ShoppingCart,
    color: "from-[#E94560] to-[#00ADB5]",
  },
]

export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-background" id="services">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Våra Tjänster</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Vi erbjuder ett brett utbud av digitala tjänster för att hjälpa ditt företag att växa och nå nya höjder.
            </p>
          </div>
        </ScrollReveal>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction="up">
              <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-[#00ADB5]/30 group">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${service.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <service.icon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                  <CardTitle className="group-hover:text-[#00ADB5] transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70 mb-4">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3} direction="up">
          <div className="mt-12 text-center">
            <Button asChild className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white">
              <Link href="/tjanster">
                Se alla tjänster
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
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
