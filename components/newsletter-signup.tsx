"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { useToast } from "@/components/ui/use-toast"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: "E-post saknas",
        description: "Vänligen ange din e-postadress.",
        variant: "destructive",
      })
      return
    }
    
    setLoading(true)
    
    // Simulera API-anrop
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setLoading(false)
    setSuccess(true)
    
    toast({
      title: "Tack för din anmälan!",
      description: "Du är nu prenumerant på vårt nyhetsbrev.",
    })
    
    // Återställ formuläret efter några sekunder
    setTimeout(() => {
      setEmail("")
      setSuccess(false)
    }, 3000)
  }

  return (
    <section className="py-16 bg-[#16213E]">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Prenumerera på vårt nyhetsbrev</h2>
            <p className="text-foreground/70 mb-8 max-w-lg mx-auto">
              Få de senaste nyheterna, tips och specialerbjudanden direkt i din inkorg. Vi skickar max ett nyhetsbrev per månad.
            </p>
            
            <div className="relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#00ADB5]/20 via-transparent to-[#E94560]/20 rounded-lg blur-xl opacity-70 animate-pulse"
                style={{ animationDuration: "10s" }}
              />
              
              <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Din e-postadress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-card/30 backdrop-blur-sm border border-[#0F3460]/50 focus:border-[#00ADB5] transition-all duration-300 rounded-l-md h-12"
                    disabled={loading || success}
                  />
                  <Button 
                    type="submit" 
                    className={`h-12 px-5 rounded-r-md ${success ? 'bg-green-600 hover:bg-green-700' : 'bg-[#00ADB5] hover:bg-[#00ADB5]/80'}`}
                    disabled={loading || success}
                  >
                    {loading ? (
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Send size={18} />
                      </motion.div>
                    ) : success ? (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Check size={18} />
                      </motion.div>
                    ) : (
                      <Send size={18} />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-foreground/50 mt-2 text-left">
                  Vi respekterar din integritet och delar aldrig dina uppgifter med tredje part.
                </p>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
} 