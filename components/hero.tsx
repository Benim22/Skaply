"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Code, Cpu, Globe, Palette } from "lucide-react"
import { useTheme } from "next-themes"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Funktion för att starta videouppspelning
  const startVideo = () => {
    const videoElement = videoRef.current
    if (!videoElement || isVideoPlaying) return

    try {
      // Säkerställ att alla nödvändiga attribut är satta
      videoElement.loop = true
      videoElement.muted = true
      videoElement.playsInline = true
      videoElement.setAttribute('playsinline', '')
      videoElement.setAttribute('webkit-playsinline', '')
      videoElement.setAttribute('muted', '')
      videoElement.setAttribute('autoplay', '')

      // Försök spela upp videon
      const playPromise = videoElement.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true)
            console.log('Video started playing successfully')
          })
          .catch(error => {
            console.error('Autoplay failed:', error)
          })
      }
    } catch (error) {
      console.error('Video play error:', error)
    }
  }

  // Hantera interaktioner för att starta video
  const handleUserInteraction = () => {
    if (hasInteracted) return
    setHasInteracted(true)
    startVideo()
  }

  useEffect(() => {
    setMounted(true)

    // Starta video när komponenten har monterats
    if (mounted) {
      // Kort timeout för att säkerställa att DOM är helt redo
      const timer = setTimeout(() => {
        startVideo()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [mounted])

  // Lägg till event listeners för användarinteraktioner
  useEffect(() => {
    if (!mounted) return

    const events = ['touchstart', 'click', 'scroll', 'keydown']
    
    const handleInteraction = () => {
      handleUserInteraction()
      
      // Ta bort alla event listeners efter första interaktionen
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction)
      })
    }
    
    // Lägg till event listeners
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true })
    })
    
    // Hantera video loop och återstart
    const videoElement = videoRef.current
    if (videoElement) {
      const handleEnded = () => {
        videoElement.currentTime = 0
        videoElement.play().catch(error => {
          console.error('Video restart failed:', error)
        })
      }
      
      videoElement.addEventListener('ended', handleEnded)
      
      return () => {
        // Cleanup
        videoElement.removeEventListener('ended', handleEnded)
        events.forEach(event => {
          document.removeEventListener(event, handleInteraction)
        })
      }
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <section className="relative py-0 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onError={(e) => console.error('Video error:', e)}
          onCanPlay={() => startVideo()}
          onTouchStart={() => handleUserInteraction()}
          onClick={() => handleUserInteraction()}
        >
          <source src="https://videos.pexels.com/video-files/946146/946146-hd_1920_1080_30fps.mp4" type="video/mp4" />
          {/* Alternativ källa om den första inte fungerar */}
          <source src="https://cdn.pixabay.com/vimeo/328240476/digital-network-24227.mp4" type="video/mp4" />
          Din webbläsare stöder inte HTML5-video.
        </video>
      </div>

      {/* Animated Gradients */}
      <div className="absolute inset-0 opacity-40 z-0">
        <div
          className="absolute top-1/4 -left-4 w-96 h-96 bg-[#0F3460] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute top-1/3 -right-4 w-96 h-96 bg-[#00ADB5] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDuration: "12s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#E94560] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-[#FFD460] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "9s" }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 h-full flex flex-col items-center justify-center pt-16 md:pt-0">
        <div className="max-w-5xl mx-auto text-center px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            <span className="hidden md:inline-block py-1 px-3 mb-4 rounded-full bg-[#00ADB5]/20 border border-[#00ADB5]/30 text-[#00ADB5] text-sm">
              Upptäck Nästa Generation av Digitala Lösningar
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#00ADB5] via-white to-[#E94560] mt-10 md:mt-0">
              Digitala Lösningar För Framtiden
            </h1>
          </motion.div>

          {/* Tagline */}
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
            <p className="text-base md:text-xl lg:text-2xl text-white mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
              Vi hjälper företag att växa med innovativa digitala lösningar, från <span>Webbapplikationer</span> och <span>Mobilappar</span> till <span>AI-driven utveckling</span> och <span>Skräddarsydd design</span>.
            </p>
          </motion.div>

          {/* Service Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mb-10"
          >
            {[
              { icon: <Globe className="h-6 w-6 mb-2" />, label: "Webbutveckling", color: "#00ADB5" },
              { icon: <Palette className="h-6 w-6 mb-2" />, label: "UI/UX Design", color: "#E94560" },
              { icon: <Cpu className="h-6 w-6 mb-2" />, label: "AI-lösningar", color: "#FFD460" },
              { icon: <Code className="h-6 w-6 mb-2" />, label: "Apputveckling", color: "#0F3460" },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="bg-[#16213E]/60 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center border border-white/10 hover:border-[#00ADB5]/50 transition-all hover:transform hover:scale-105"
                style={{ color: service.color }}
              >
                {service.icon}
                <span className="text-white text-sm font-medium">{service.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white px-8 py-6 text-lg shadow-lg shadow-[#00ADB5]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#00ADB5]/30">
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
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className={
                theme === "dark"
                  ? "border-white text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm"
                  : "border-[#0F3460] text-[#0F3460] hover:bg-[#0F3460]/10 px-8 py-6 text-lg backdrop-blur-sm"
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
