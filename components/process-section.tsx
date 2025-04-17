"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MessageSquare, Lightbulb, Code, Rocket, BarChart } from "lucide-react"

export function ProcessSection() {
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

  const steps = [
    {
      icon: MessageSquare,
      title: "Konsultation",
      description: "Vi börjar med att förstå dina behov, mål och utmaningar genom en grundlig konsultation.",
      color: "bg-[#00ADB5]",
    },
    {
      icon: Lightbulb,
      title: "Strategi & Design",
      description: "Vi utvecklar en strategi och skapar designkoncept som möter dina specifika krav.",
      color: "bg-[#0F3460]",
    },
    {
      icon: Code,
      title: "Utveckling",
      description: "Vårt team bygger din lösning med modern teknik och bästa praxis för kodkvalitet.",
      color: "bg-[#E94560]",
    },
    {
      icon: Rocket,
      title: "Lansering",
      description: "Vi lanserar din produkt och säkerställer en smidig övergång till den nya lösningen.",
      color: "bg-[#00ADB5]",
    },
    {
      icon: BarChart,
      title: "Support & Optimering",
      description: "Vi fortsätter att stödja, underhålla och optimera din lösning för långsiktig framgång.",
      color: "bg-[#0F3460]",
    },
  ]

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Vår Arbetsprocess</h2>
        <p className="text-foreground/70">
          Vi följer en beprövad process för att säkerställa att varje projekt levereras med högsta kvalitet, i tid och
          inom budget.
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative max-w-3xl mx-auto"
      >
        {/* Timeline line */}
        <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-border" />

        {steps.map((step, index) => (
          <motion.div key={index} variants={itemVariants} className="relative flex gap-6 mb-12 last:mb-0">
            <div className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center shrink-0 z-10`}>
              <step.icon className="h-6 w-6 text-white" />
            </div>
            <div className="pt-2">
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-foreground/70">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 p-6 bg-[#16213E]/50 rounded-lg border border-[#0F3460]/30">
        <h3 className="text-xl font-bold mb-4">Agil utvecklingsmetodik</h3>
        <p className="text-foreground/80 mb-4">
          Vi arbetar enligt agila principer med regelbundna avstämningar och iterationer. Detta ger dig som kund full
          insyn i projektet och möjlighet att påverka under hela utvecklingsprocessen.
        </p>
        <p className="text-foreground/80">
          Genom att arbeta i korta sprintar kan vi snabbt anpassa oss till förändrade krav och prioriteringar, vilket
          resulterar i en slutprodukt som verkligen möter dina behov.
        </p>
      </div>
    </section>
  )
}
