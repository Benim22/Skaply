"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

interface PriceDialogProps {
  service: {
    id: string
    title: string
    color: string
    pricing: {
      basic: string
      standard: string
      premium: string
      hourly: string
      description: string
    }
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PriceDialog({ service, open, onOpenChange }: PriceDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      name: "Basic",
      price: service.pricing.basic,
      features: ["Grundläggande funktionalitet", "Standard design", "Enklare integrationer", "30 dagars support"],
      recommended: false,
    },
    {
      name: "Standard",
      price: service.pricing.standard,
      features: [
        "Utökad funktionalitet",
        "Anpassad design",
        "Fler integrationer",
        "90 dagars support",
        "Prestanda-optimering",
      ],
      recommended: true,
    },
    {
      name: "Premium",
      price: service.pricing.premium,
      features: [
        "Komplett funktionalitet",
        "Helt skräddarsydd design",
        "Avancerade integrationer",
        "12 månaders support",
        "Prestanda-optimering",
        "SEO-optimering",
        "Kontinuerliga uppdateringar",
      ],
      recommended: false,
    },
  ]

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeader className="p-6 pb-0 shrink-0">
          <DialogTitle className="text-2xl">Riktpriser för {service.title}</DialogTitle>
          <DialogDescription className="text-foreground/70">
            Nedan ser du våra riktpriser för {service.title.toLowerCase()}. Kontakta oss för en skräddarsydd offert.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 overflow-y-auto scrollbar-thin">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`relative rounded-lg border ${
                  selectedPlan === plan.name ? "border-[#00ADB5] ring-2 ring-[#00ADB5]" : "border-border"
                } p-4 cursor-pointer`}
                onClick={() => handleSelectPlan(plan.name)}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#00ADB5] text-white text-xs py-1 px-3 rounded-full">
                    Rekommenderad
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <div className="text-2xl font-bold mt-2">{plan.price}</div>
                </div>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-[#00ADB5] mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#16213E]/30 rounded-lg p-4 flex items-start space-x-3 mb-6">
            <Info className="h-5 w-5 text-[#00ADB5] shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="mb-2">{service.pricing.description}</p>
              <p>Vi erbjuder även löpande arbete till {service.pricing.hourly}.</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 sticky bottom-0 pt-2 bg-background">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Stäng
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button asChild className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white">
                <Link href="/kontakt">Kontakta oss för offert</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
