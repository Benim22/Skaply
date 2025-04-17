"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Namnet måste vara minst 2 tecken.",
  }),
  email: z.string().email({
    message: "Vänligen ange en giltig e-postadress.",
  }),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, {
    message: "Meddelandet måste vara minst 10 tecken.",
  }),
})

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would normally send the data to Supabase or another backend
    console.log(values)

    toast({
      title: "Tack för ditt meddelande!",
      description: "Vi återkommer till dig så snart som möjligt.",
    })

    form.reset()
    setIsSubmitting(false)
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#00ADB5]/10 via-transparent to-[#E94560]/10 rounded-lg blur-xl opacity-70 animate-pulse"
        style={{ animationDuration: "10s" }}
      />
      <motion.div
        className="relative bg-card/50 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-border/50"
        whileHover={{ boxShadow: "0 0 30px rgba(0, 173, 181, 0.1)" }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Kontakta oss
        </motion.h2>
        <motion.p
          className="text-foreground/70 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Fyll i formuläret nedan för att komma i kontakt med oss. Vi återkommer så snart som möjligt.
        </motion.p>

        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Namn *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ditt namn"
                          {...field}
                          className="transition-all duration-300 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-post *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="din.email@exempel.se"
                          {...field}
                          className="transition-all duration-300 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="070-123 45 67"
                          {...field}
                          className="transition-all duration-300 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Företag</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ditt företag"
                          {...field}
                          className="transition-all duration-300 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meddelande *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Beskriv vad du behöver hjälp med..."
                        className="min-h-[120px] transition-all duration-300 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Skickar...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Skicka
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "mirror",
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      >
                        <Send className="h-4 w-4" />
                      </motion.span>
                    </span>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </motion.form>
        </Form>
      </motion.div>
    </motion.div>
  )
}
