"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Kontrollera om användaren redan accepterat cookies
    const hasConsented = localStorage.getItem("cookie-consent")
    if (!hasConsented) {
      // Visa bannern efter en kort fördröjning
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true")
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "false")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:max-w-md z-50"
        >
          <div className="bg-[#16213E] border border-[#0F3460]/30 rounded-lg p-5 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold">Cookies och sekretess</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-foreground/70 hover:text-foreground"
                onClick={() => setIsVisible(false)}
              >
                <X size={18} />
              </Button>
            </div>
            <p className="text-sm text-foreground/80 mb-4">
              Vi använder cookies för att förbättra din upplevelse på vår webbplats. Genom att fortsätta använda
              webbplatsen samtycker du till vår användning av cookies.{" "}
              <Link href="/integritetspolicy" className="text-[#00ADB5] hover:underline">
                Läs vår integritetspolicy
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                className="border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5]/10"
                onClick={handleDecline}
              >
                Avböj
              </Button>
              <Button
                size="sm"
                className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white"
                onClick={handleAccept}
              >
                Acceptera
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 