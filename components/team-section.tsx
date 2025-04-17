"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail } from "lucide-react"

const team = [
  {
    name: "Lucas Andersson",
    role: "Grundare & Teknisk Ledare",
    bio: "Lucas har över 8 års erfarenhet av webbutveckling med fokus på React och Next.js. Han är passionerad om att skapa snabba, användarvänliga och tillgängliga webbapplikationer.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      github: "#",
      email: "lucas@skaply.se",
    },
  },
  {
    name: "Daniel Svensson",
    role: "Grundare & Kreativ Ledare",
    bio: "Daniel är en erfaren designer och utvecklare med öga för detaljer. Han specialiserar sig på UI/UX-design och frontend-utveckling, med fokus på att skapa vackra och funktionella användargränssnitt.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      linkedin: "#",
      github: "#",
      email: "daniel@skaply.se",
    },
  },
]

export function TeamSection() {
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
        <h2 className="text-2xl font-bold mb-4">Vårt Team</h2>
        <p className="text-foreground/70">
          Möt personerna bakom Skaply. Vi är ett litet men dedikerat team med passion för att skapa digitala lösningar
          som gör skillnad.
        </p>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {team.map((member, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="aspect-square relative overflow-hidden bg-[#16213E]">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-[#00ADB5] mb-4">{member.role}</p>
                <p className="text-foreground/70 mb-6">{member.bio}</p>
                <div className="flex space-x-4">
                  <a
                    href={member.social.linkedin}
                    className="text-foreground/60 hover:text-[#00ADB5]"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={member.social.github}
                    className="text-foreground/60 hover:text-[#00ADB5]"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-foreground/60 hover:text-[#00ADB5]"
                    aria-label="Email"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
