"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Target, Users } from "lucide-react"

export function VisionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Vår Vision</h2>
        <p className="text-foreground/70">
          På Skaply drivs vi av en passion för att skapa digitala lösningar som kombinerar teknisk excellens med
          användarvänlighet.
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#00ADB5]/20 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-[#00ADB5]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-foreground/70">
                Vi strävar efter att ligga i framkant av teknologisk utveckling och att ständigt utforska nya
                möjligheter för att skapa bättre digitala upplevelser.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#0F3460]/20 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-[#0F3460]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Kvalitet</h3>
              <p className="text-foreground/70">
                Vi kompromissar aldrig med kvaliteten. Varje projekt vi tar oss an genomförs med noggrannhet, precision
                och ett öga för detaljer.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#E94560]/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#E94560]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Partnerskap</h3>
              <p className="text-foreground/70">
                Vi ser våra kunder som partners. Genom öppen kommunikation och samarbete bygger vi långsiktiga
                relationer baserade på förtroende och gemensam framgång.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="mt-12 p-6 bg-[#16213E]/50 rounded-lg border border-[#0F3460]/30">
        <h3 className="text-xl font-bold mb-4">Vår långsiktiga vision</h3>
        <p className="text-foreground/80 mb-4">
          Vi strävar efter att bli den ledande digitala partnern för innovativa företag i Sverige. Genom att kombinera
          teknisk expertis med kreativitet vill vi hjälpa våra kunder att inte bara möta dagens utmaningar, utan också
          vara redo för morgondagens möjligheter.
        </p>
        <p className="text-foreground/80">
          Vår vision är att skapa digitala lösningar som är hållbara, skalbara och som verkligen gör skillnad för våra
          kunder och deras användare. Vi tror på att teknologi, när den används rätt, kan förbättra människors liv och
          hjälpa företag att nå sin fulla potential.
        </p>
      </div>
    </section>
  )
}
