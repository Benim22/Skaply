"use client"

import type * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface AnimatedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  underlineHeight?: number
  underlineColor?: string
  onClick?: () => void
}

export function AnimatedLink({
  href,
  children,
  className,
  underlineHeight = 2,
  underlineColor = "#00ADB5",
  onClick,
}: AnimatedLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={cn("relative group", className)}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00ADB5] group-hover:w-full transition-all duration-300"
        style={{ height: underlineHeight, backgroundColor: underlineColor }}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}

