"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
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
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-background z-50 shadow-xl border-r border-border/50"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-4 border-b border-border/50"
                variants={itemVariants}
              >
                <Link href="/" className="flex items-center" onClick={onClose}>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#00ADB5] to-[#E94560] bg-clip-text text-transparent">
                    Skaply
                  </span>
                </Link>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </motion.div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto scrollbar-thin py-4">
                {/* Main Navigation */}
                <div className="px-4 mb-6">
                  <motion.p
                    className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 pl-4"
                    variants={itemVariants}
                  >
                    Navigation
                  </motion.p>
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <motion.div key={link.href} variants={itemVariants}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center py-2 px-4 rounded-lg transition-colors",
                            pathname === link.href
                              ? "bg-[#00ADB5]/10 text-[#00ADB5]"
                              : "hover:bg-muted text-foreground/80 hover:text-foreground",
                          )}
                          onClick={onClose}
                        >
                          <link.icon className="h-5 w-5 mr-3" />
                          <span>{link.label}</span>
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
                <div className="px-4 mb-6">
                  <motion.p
                    className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-2 pl-4"
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
                          className="flex items-center py-2 px-4 rounded-lg text-foreground/80 hover:text-[#00ADB5] transition-colors"
                          onClick={onClose}
                        >
                          <service.icon className="h-4 w-4 mr-3" />
                          <span>{service.label}</span>
                          <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <motion.div className="p-4 border-t border-border/50" variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button asChild className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white">
                    <Link href="/kontakt" onClick={onClose}>
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
