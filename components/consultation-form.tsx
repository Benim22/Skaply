"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, ArrowLeft, Check, Send, CalendarDays, Clock, Globe, Smartphone, Brain, Palette, Target, ShoppingCart } from "lucide-react"

const serviceIcons = {
  web: Globe,
  app: Smartphone,
  ai: Brain,
  design: Palette,
  "digital-marketing": Target,
  ecommerce: ShoppingCart,
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Namnet måste vara minst 2 tecken.",
  }),
  email: z.string().email({
    message: "Vänligen ange en giltig e-postadress.",
  }),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),
  service: z.string({
    required_error: "Välj en tjänst",
  }),
  serviceLevel: z.string({
    required_error: "Välj en paketnivå",
  }),
  projectStart: z.string({
    required_error: "Välj när projektet bör starta",
  }),
  budget: z.string({
    required_error: "Ange en budgetram",
  }),
  additionalServices: z.array(z.string()).optional(),
  message: z.string().min(10, {
    message: "Meddelandet måste vara minst 10 tecken.",
  }),
})

export function ConsultationForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      service: "",
      serviceLevel: "",
      projectStart: "",
      budget: "",
      additionalServices: [],
      message: "",
    },
  })

  const onServiceSelect = (value: string) => {
    setSelectedService(value)
    form.setValue("service", value)
  }

  const nextStep = () => {
    if (step === 1) {
      form.trigger(["service", "serviceLevel", "budget", "projectStart"])
      if (
        form.getFieldState("service").invalid ||
        form.getFieldState("serviceLevel").invalid ||
        form.getFieldState("budget").invalid ||
        form.getFieldState("projectStart").invalid
      ) {
        return
      }
    }
    if (step === 2) {
      form.trigger(["name", "email"])
      if (form.getFieldState("name").invalid || form.getFieldState("email").invalid) {
        return
      }
    }
    setStep(step + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would normally send the data to your backend
    console.log(values)

    toast({
      title: "Tack för din konsultationsförfrågan!",
      description: "Vi återkommer till dig inom kort med förslag på tid för en första konsultation.",
    })

    form.reset()
    setIsSubmitting(false)
    setStep(1)
  }

  const transitions = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3 },
  }

  const services = [
    {
      id: "web",
      title: "Webbutveckling",
      icon: Globe,
      description: "Moderna, snabba och responsiva webbplatser med React, Next.js och Supabase.",
      levels: [
        { id: "basic", name: "Basic", price: "12 000 kr" },
        { id: "standard", name: "Standard", price: "24 000 kr" },
        { id: "premium", name: "Premium", price: "48 000 kr" },
      ],
    },
    {
      id: "app",
      title: "Apputveckling",
      icon: Smartphone,
      description: "Skräddarsydda mobilappar och spel med React Native för iOS och Android.",
      levels: [
        { id: "basic", name: "Basic", price: "20 000 kr" },
        { id: "standard", name: "Standard", price: "35 000 kr" },
        { id: "premium", name: "Premium", price: "70 000 kr" },
      ],
    },
    {
      id: "ai",
      title: "AI-lösningar",
      icon: Brain,
      description: "Smarta chatbottar, automationer och AI-integrationer för ditt företag.",
      levels: [
        { id: "basic", name: "Basic", price: "15 000 kr" },
        { id: "standard", name: "Standard", price: "29 000 kr" },
        { id: "premium", name: "Premium", price: "55 000 kr" },
      ],
    },
    {
      id: "design",
      title: "Grafisk design",
      icon: Palette,
      description: "Logotyper, visuell identitet och UI/UX-design som sticker ut.",
      levels: [
        { id: "basic", name: "Basic", price: "5 900 kr" },
        { id: "standard", name: "Standard", price: "12 000 kr" },
        { id: "premium", name: "Premium", price: "24 000 kr" },
      ],
    },
    {
      id: "digital-marketing",
      title: "Digital Marknadsföring",
      icon: Target,
      description: "Strategier för att nå din målgrupp online och öka din digitala närvaro.",
      levels: [
        { id: "basic", name: "Basic", price: "3 900 kr/mån" },
        { id: "standard", name: "Standard", price: "9 900 kr/mån" },
        { id: "premium", name: "Premium", price: "19 900 kr/mån" },
      ],
    },
    {
      id: "ecommerce",
      title: "E-handel",
      icon: ShoppingCart,
      description: "Kompletta lösningar för online-försäljning med fokus på användarvänlighet och konvertering.",
      levels: [
        { id: "basic", name: "Basic", price: "15 000 kr" },
        { id: "standard", name: "Standard", price: "32 000 kr" },
        { id: "premium", name: "Premium", price: "65 000 kr" },
      ],
    },
  ]

  const additionalServiceOptions = [
    { id: "seo", label: "SEO-optimering" },
    { id: "content", label: "Innehållsproduktion" },
    { id: "hosting", label: "Hosting och underhåll" },
    { id: "analytics", label: "Analys och uppföljning" },
    { id: "training", label: "Utbildning" },
  ]

  const timeframeOptions = [
    { id: "asap", label: "Så snart som möjligt" },
    { id: "within-month", label: "Inom en månad" },
    { id: "1-3-months", label: "1-3 månader" },
    { id: "3-6-months", label: "3-6 månader" },
    { id: "planning", label: "Bara i planeringsstadiet" },
  ]

  const budgetOptions = [
    { id: "under-10k", label: "Under 10 000 kr" },
    { id: "10k-25k", label: "10 000 - 25 000 kr" },
    { id: "25k-50k", label: "25 000 - 50 000 kr" },
    { id: "50k-100k", label: "50 000 - 100 000 kr" },
    { id: "over-100k", label: "Över 100 000 kr" },
    { id: "not-sure", label: "Osäker/Önskar rådgivning" },
  ]

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center justify-center space-x-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === i
                  ? "bg-[#00ADB5] text-white"
                  : step > i
                  ? "bg-[#00ADB5]/80 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > i ? <Check className="h-4 w-4" /> : i}
            </div>
            {i < 3 && <div className={`w-16 h-1 ${step > i ? "bg-[#00ADB5]/80" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>
    </div>
  )

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
        {renderStepIndicator()}

        <motion.div
          key={`step-${step}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={transitions}
          className="space-y-6"
        >
          {step === 1 && (
            <>
              <motion.h2
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Vad kan vi hjälpa dig med?
              </motion.h2>

              <Form {...form}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {services.map((service) => {
                      const Icon = service.icon
                      return (
                        <motion.div
                          key={service.id}
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          onClick={() => onServiceSelect(service.id)}
                          className={`relative cursor-pointer rounded-lg border p-4
                            ${
                              selectedService === service.id
                                ? "border-[#00ADB5] ring-2 ring-[#00ADB5]/30"
                                : "border-border hover:border-[#00ADB5]/50"
                            }`}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 
                                ${
                                  selectedService === service.id
                                    ? "bg-[#00ADB5] text-white"
                                    : "bg-[#00ADB5]/10 text-[#00ADB5]"
                                }`}
                            >
                              <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-medium">{service.title}</h3>
                            <p className="text-sm text-foreground/70 mt-1 line-clamp-2">{service.description}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  {selectedService && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="serviceLevel"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Välj paketnivå</FormLabel>
                              <FormDescription>
                                Dessa är riktpriser. Vi kommer att skräddarsy en lösning efter dina behov.
                              </FormDescription>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                >
                                  {services
                                    .find((s) => s.id === selectedService)
                                    ?.levels.map((level) => (
                                      <div key={level.id} className="flex items-center space-x-2">
                                        <RadioGroupItem
                                          value={level.id}
                                          id={level.id}
                                          className="peer sr-only"
                                        />
                                        <label
                                          htmlFor={level.id}
                                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card/50 p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#00ADB5] [&:has([data-state=checked])]:border-primary w-full cursor-pointer"
                                        >
                                          <div className="font-semibold">{level.name}</div>
                                          <div className="text-[#00ADB5]">{level.price}</div>
                                        </label>
                                      </div>
                                    ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="projectStart"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>När vill du starta projektet?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Välj tidsram" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timeframeOptions.map((option) => (
                                    <SelectItem key={option.id} value={option.id}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Välj budgetram" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {budgetOptions.map((option) => (
                                    <SelectItem key={option.id} value={option.id}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="additionalServices"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Ytterligare tjänster</FormLabel>
                                <FormDescription>Välj eventuella tilläggstjänster du är intresserad av.</FormDescription>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {additionalServiceOptions.map((option) => (
                                  <FormField
                                    key={option.id}
                                    control={form.control}
                                    name="additionalServices"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={option.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(option.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...(field.value || []), option.id])
                                                  : field.onChange(
                                                      field.value?.filter((value) => value !== option.id) || []
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-normal cursor-pointer">
                                            {option.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </Form>
            </>
          )}

          {step === 2 && (
            <>
              <motion.h2
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Berätta lite om dig
              </motion.h2>

              <Form {...form}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel>Befintlig webbplats (om tillämpbart)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://din-sida.se"
                            {...field}
                            className="transition-all duration-300 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            </>
          )}

          {step === 3 && (
            <>
              <motion.h2
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Detaljer om ditt projekt
              </motion.h2>

              <Form {...form}>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Projektbeskrivning *</FormLabel>
                        <FormDescription>
                          Beskriv ditt projekt, dina mål och eventuella specifika krav eller önskemål.
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Beskriv ditt projekt här..."
                            className="min-h-[150px] transition-all duration-300 focus:border-[#00ADB5] focus:ring-[#00ADB5]/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-[#16213E]/30 rounded-lg p-4 flex items-start space-x-3">
                    <div className="bg-[#00ADB5]/20 p-2 rounded-full">
                      <CalendarDays className="h-5 w-5 text-[#00ADB5]" />
                    </div>
                    <div className="text-sm">
                      <p className="mb-1 font-medium">Efter inlämning av formuläret</p>
                      <p className="text-foreground/70">
                        Vi återkommer till dig inom 24 timmar för att boka ett gratis konsultationsmöte där vi diskuterar
                        ditt projekt och nästa steg.
                      </p>
                    </div>
                  </div>
                </div>
              </Form>
            </>
          )}
        </motion.div>

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="border-[#00ADB5] text-[#00ADB5] hover:bg-[#00ADB5]/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Föregående
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white"
              disabled={step === 1 && !selectedService}
            >
              Nästa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                className="bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white"
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
                    <Send className="mr-2 h-4 w-4" />
                    Skicka konsultationsförfrågan
                  </span>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
} 