"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { motion } from "framer-motion"
import { supabase, Testimonial as SupabaseTestimonial } from "@/lib/supabase"

interface Testimonial {
  name: string
  company: string
  content: string
  initials: string
  rating: number
}

// Konvertera Supabase Testimonial till lokal testimonial-typ
const convertToTestimonial = (testimonial: SupabaseTestimonial): Testimonial => ({
  name: testimonial.name,
  company: testimonial.company,
  content: testimonial.content,
  initials: testimonial.initials,
  rating: testimonial.rating
})

// Fallback data om inga testimonials finns i databasen
const fallbackTestimonials: Testimonial[] = [
  {
    name: "Anna Johansson",
    company: "TechStart AB",
    content:
      "Skaply hjälpte oss att bygga en modern webbplats som verkligen representerar vårt varumärke. Deras tekniska kunskap och kreativa lösningar överträffade våra förväntningar.",
    initials: "AJ",
    rating: 5,
  },
  {
    name: "Erik Lindberg",
    company: "Innovate Solutions",
    content:
      "Vi anlitade Skaply för att utveckla vår företagsapp och resultatet blev fantastiskt. Appen är snabb, användarvänlig och har fått mycket positiv feedback från våra kunder.",
    initials: "EL",
    rating: 5,
  },
  {
    name: "Maria Svensson",
    company: "Digital Growth",
    content:
      "Skaply levererade en AI-chatbot som har revolutionerat vår kundtjänst. Deras förståelse för våra behov och tekniska kompetens var imponerande.",
    initials: "MS",
    rating: 4,
  },
]

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) {
        console.error('Error fetching testimonials:', error)
        setTestimonials(fallbackTestimonials)
        return
      }

      if (data && data.length > 0) {
        const testimonialsConverted = data.map(convertToTestimonial)
        setTestimonials(testimonialsConverted)
      } else {
        setTestimonials(fallbackTestimonials)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setTestimonials(fallbackTestimonials)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vad våra kunder säger</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Vi är stolta över att ha hjälpt många företag att nå sina digitala mål. Här är vad några av dem har att
              säga.
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-[#00ADB5]/30 border-t-[#00ADB5] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-foreground/70">Laddar omdömen...</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction="up">
              <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-[#E94560]/30">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i, duration: 0.3 }}
                        >
                          <Star
                            className={`h-5 w-5 ${
                              i < testimonial.rating ? "text-[#E94560] fill-[#E94560]" : "text-gray-300"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-foreground/80 italic">"{testimonial.content}"</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3 bg-[#0F3460]">
                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-foreground/60">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
