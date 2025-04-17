"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { AnimatedLink } from "@/components/ui/animated-link"
import { AnimatedIcon } from "@/components/ui/animated-icon"
import { motion } from "framer-motion"

export function Footer() {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.footer
      className="bg-[#1A1A2E] text-foreground/80 pt-16 pb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00ADB5] to-[#E94560] bg-clip-text text-transparent">
                Skaply
              </span>
            </Link>
            <p className="mb-4">
              Digitala lösningar för framtiden. Vi hjälper företag att växa med modern teknik och kreativ design.
            </p>
            <div className="flex space-x-4">
              <AnimatedIcon hoverScale={1.3} hoverRotate={5}>
                <a href="#" className="text-foreground/60 hover:text-[#00ADB5]" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
              </AnimatedIcon>
              <AnimatedIcon hoverScale={1.3} hoverRotate={5}>
                <a href="#" className="text-foreground/60 hover:text-[#00ADB5]" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </AnimatedIcon>
              <AnimatedIcon hoverScale={1.3} hoverRotate={5}>
                <a href="#" className="text-foreground/60 hover:text-[#00ADB5]" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
              </AnimatedIcon>
              <AnimatedIcon hoverScale={1.3} hoverRotate={5}>
                <a href="#" className="text-foreground/60 hover:text-[#00ADB5]" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
              </AnimatedIcon>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Tjänster</h3>
            <ul className="space-y-2">
              <li>
                <AnimatedLink href="/tjanster" className="hover:text-[#00ADB5] transition-colors">
                  Webbutveckling
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/tjanster" className="hover:text-[#00ADB5] transition-colors">
                  Apputveckling
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/tjanster" className="hover:text-[#00ADB5] transition-colors">
                  AI-lösningar
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/tjanster" className="hover:text-[#00ADB5] transition-colors">
                  Grafisk design
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/tjanster" className="hover:text-[#00ADB5] transition-colors">
                  Resurshyra
                </AnimatedLink>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Företaget</h3>
            <ul className="space-y-2">
              <li>
                <AnimatedLink href="/om-oss" className="hover:text-[#00ADB5] transition-colors">
                  Om oss
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/om-oss" className="hover:text-[#00ADB5] transition-colors">
                  Vårt team
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/kontakt" className="hover:text-[#00ADB5] transition-colors">
                  Kontakt
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#" className="hover:text-[#00ADB5] transition-colors">
                  Karriär
                </AnimatedLink>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="mr-2 h-5 w-5 text-[#00ADB5] group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-white transition-colors duration-300">
                  Teknikgatan 1, 12345 Stockholm
                </span>
              </li>
              <li className="flex items-center group">
                <Phone className="mr-2 h-5 w-5 text-[#00ADB5] group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-white transition-colors duration-300">070-123 45 67</span>
              </li>
              <li className="flex items-center group">
                <Mail className="mr-2 h-5 w-5 text-[#00ADB5] group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-white transition-colors duration-300">info@skaply.se</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div className="border-t border-[#0F3460] pt-8 text-center text-sm" variants={itemVariants}>
          <p>&copy; {new Date().getFullYear()} Skaply. Alla rättigheter förbehållna.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

