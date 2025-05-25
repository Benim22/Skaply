"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Check, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import confetti from "canvas-confetti"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()

  // Konfetti-funktion
  const triggerConfetti = () => {
    // Första konfetti-explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00ADB5', '#E94560', '#FFD700', '#FF6B6B', '#4ECDC4']
    })
    
    // Andra konfetti-explosion med fördröjning
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#00ADB5', '#E94560', '#FFD700']
      })
    }, 200)
    
    // Tredje konfetti-explosion från höger
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#00ADB5', '#E94560', '#FFD700']
      })
    }, 400)
  }

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
    
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{
          email: email,
          source: 'homepage',
          tags: ['general']
        }])

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Redan prenumerant",
            description: "Du är redan prenumerant på vårt nyhetsbrev.",
            variant: "destructive",
          })
        } else {
          throw error
        }
      } else {
        setSuccess(true)
        
        // Trigga konfetti-effekt
        triggerConfetti()
        
        toast({
          title: "🎉 Tack för din anmälan!",
          description: "Du är nu prenumerant på vårt nyhetsbrev. Välkommen till familjen!",
        })
        
        // Återställ formuläret efter några sekunder
        setTimeout(() => {
          setEmail("")
          setSuccess(false)
        }, 5000)
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      toast({
        title: "Något gick fel",
        description: "Kunde inte prenumerera på nyhetsbrevet. Försök igen senare.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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
              
              {/* Tackmeddelande */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="relative max-w-md mx-auto mb-6 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 10 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4"
                      >
                        <Heart className="w-8 h-8 text-green-400" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl font-bold text-green-400 mb-2"
                      >
                        Tack så mycket! 🎉
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-green-300/80"
                      >
                        Du är nu prenumerant på vårt nyhetsbrev. Vi ser fram emot att dela spännande nyheter med dig!
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center mt-3"
                      >
                        <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {!success && (
                  <motion.form 
                    onSubmit={handleSubmit} 
                    className="relative max-w-md mx-auto"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
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
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
} 