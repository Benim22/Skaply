"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface AnimatedIconProps {
  children: React.ReactNode
  className?: string
  hoverScale?: number
  hoverRotate?: number
}

export function AnimatedIcon({ children, className, hoverScale = 1.2, hoverRotate = 0 }: AnimatedIconProps) {
  return (
    <motion.div
      className={cn("inline-flex", className)}
      whileHover={{
        scale: hoverScale,
        rotate: hoverRotate,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.div>
  )
}
