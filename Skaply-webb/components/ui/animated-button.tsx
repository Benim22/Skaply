"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
  className?: string
  hoverScale?: number
}

export function AnimatedButton({ children, className, hoverScale = 1.05, ...props }: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button className={cn("relative overflow-hidden group", className)} {...props}>
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00ADB5]/20 to-[#E94560]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  )
}

