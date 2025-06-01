"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Home,
  Layers,
  Users,
  Mail,
  ChevronRight,
  Globe,
  Smartphone,
  Brain,
  Palette,
  X,
  ExternalLink,
  Target,
  ShoppingCart,
  CreditCard,
} from "lucide-react"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const sidebarVariants = {
    hidden: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: { x: -20, opacity: 0 },
  }

  const navLinks = [
    { href: "/", label: "Hem", icon: Home },
    { href: "/tjanster", label: "Tjänster", icon: Layers },
    { href: "/tjanster/prenumerationer", label: "Prenumerationer", icon: CreditCard },
    { href: "/projekt", label: "Projekt", icon: ExternalLink },
    { href: "/om-oss", label: "Om Oss", icon: Users },
    { href: "/kontakt", label: "Kontakt", icon: Mail },
  ]

  const services = [
    { href: "/tjanster#web", label: "Webbutveckling", icon: Globe },
    { href: "/tjanster#app", label: "Apputveckling", icon: Smartphone },
    { href: "/tjanster#ai", label: "AI-lösningar", icon: Brain },
    { href: "/tjanster#design", label: "Grafisk design", icon: Palette },
    { href: "/tjanster#digital-marketing", label: "Digital Marknadsföring", icon: Target },
    { href: "/tjanster#ecommerce", label: "E-handel", icon: ShoppingCart },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 left-0 bottom-0 w-[300px] bg-gradient-to-b from-background to-background/95 z-50 shadow-2xl border-r border-border/50 backdrop-blur-xl"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-border/50"
                variants={itemVariants}
              >
                <Link href="/" className="flex items-center" onClick={onClose}>
                  <Image 
                    src="/skaply_logo.png" 
                    alt="Skaply Logo" 
                    width={100} 
                    height={35} 
                    className="h-auto"
                    priority
                  />
                </Link>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-[#00ADB5]/10">
                  <X className="h-5 w-5" />
                </Button>
              </motion.div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto scrollbar-thin py-6">
                {/* Main Navigation */}
                <div className="px-6 mb-8">
                  <motion.p
                    className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-4 pl-4"
                    variants={itemVariants}
                  >
                    Navigation
                  </motion.p>
                  <div className="space-y-2">
                    {navLinks.map((link) => (
                      <motion.div key={link.href} variants={itemVariants}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center py-3 px-4 rounded-xl transition-all duration-200",
                            pathname === link.href
                              ? "bg-[#00ADB5]/15 text-[#00ADB5] border border-[#00ADB5]/20"
                              : "hover:bg-muted/50 text-foreground/80 hover:text-foreground border border-transparent",
                          )}
                          onClick={onClose}
                        >
                          <link.icon className="h-5 w-5 mr-3" />
                          <span className="font-medium">{link.label}</span>
                          {pathname === link.href && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="ml-auto h-2 w-2 rounded-full bg-[#00ADB5]"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="px-6 mb-8">
                  <motion.p
                    className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-4 pl-4"
                    variants={itemVariants}
                  >
                    Våra Tjänster
                  </motion.p>
                  <div className="space-y-1">
                    {services.map((service, index) => (
                      <motion.div
                        key={service.href}
                        variants={itemVariants}
                        custom={index}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <Link
                          href={service.href}
                          className="flex items-center py-2.5 px-4 rounded-lg text-foreground/70 hover:text-[#00ADB5] hover:bg-[#00ADB5]/5 transition-all duration-200"
                          onClick={onClose}
                        >
                          <service.icon className="h-4 w-4 mr-3" />
                          <span className="text-sm">{service.label}</span>
                          <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <motion.div className="p-6 border-t border-border/50" variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button asChild className="w-full bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 hover:from-[#00ADB5]/90 hover:to-[#00ADB5]/70 text-white shadow-lg py-6">
                    <Link href="/kontakt" onClick={onClose}>
                      <Mail className="mr-2 h-4 w-4" />
                      Boka konsultation
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
