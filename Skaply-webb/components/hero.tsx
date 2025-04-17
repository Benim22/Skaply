"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative pt-36 pb-36 md:pt-52 md:pb-52 overflow-hidden min-h-[85vh]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="https://videos.pexels.com/video-files/946146/946146-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 opacity-30 z-0">
        <div
          className="absolute top-0 -left-4 w-72 h-72 bg-[#0F3460] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute top-0 -right-4 w-72 h-72 bg-[#00ADB5] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "12s" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#E94560] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "10s" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 h-full flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ADB5] via-white to-[#E94560]">
              Digitala lösningar för framtiden
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
          >
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
              Vi bygger framtidens digitala lösningar för webben, mobilen och AI. Med teknisk spets inom React, Next.js
              och Supabase hjälper vi företag att växa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              type: "spring",
              stiffness: 100,
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
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
            <Button
              asChild
              size="lg"
              variant="outline"
              className={
                theme === "dark"
                  ? "border-white text-white hover:bg-white/10"
                  : "border-[#0F3460] text-[#0F3460] hover:bg-[#0F3460]/10"
              }
            >
              <Link href="/tjanster">Utforska våra tjänster</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

