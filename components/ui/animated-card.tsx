"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Card, type CardProps } from "@/components/ui/card"

interface AnimatedCardProps extends CardProps {
  children: React.ReactNode
  className?: string
  hoverScale?: number
  delay?: number
}

export function AnimatedCard({ children, className, hoverScale = 1.03, delay = 0, ...props }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: hoverScale, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={cn("transition-all duration-300", className)} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}
