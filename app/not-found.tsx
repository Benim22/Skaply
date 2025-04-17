"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-[#00ADB5] via-[#0F3460] to-[#E94560] bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Sidan kunde inte hittas</h2>
            <p className="text-foreground/70 max-w-md mx-auto mb-8">
              Sidan du letar efter finns inte eller har flyttats. Kontrollera URL:en eller gå tillbaka till startsidan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Tillbaka till startsidan
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5]/10"
              >
                <Link href="javascript:history.back()">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Gå tillbaka
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 