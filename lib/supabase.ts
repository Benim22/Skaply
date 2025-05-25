import { createClient } from '@supabase/supabase-js'

// Supabase miljövariabler
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Skapa Supabase-klient
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Typdefinitioner för databastabeller
export interface Project {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  technologies: string[]
  project_link?: string
  featured: boolean
  client?: string
  year?: string
  status?: 'Pågående' | 'Färdig' | 'Pausad'
  secondary_category?: string
  progress?: number
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  service_id: string
  title: string
  description: string
  icon_name: string
  color_from: string
  color_to: string
  features: string[]
  technologies: string[]
  pricing_basic?: string
  pricing_standard?: string
  pricing_premium?: string
  pricing_hourly?: string
  pricing_description?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  company: string
  content: string
  initials: string
  rating: number
  avatar_url?: string
  is_featured: boolean
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface NewsletterSubscription {
  id: string
  email: string
  is_active: boolean
  subscribed_at: string
  unsubscribed_at?: string
  ip_address?: string
  source?: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'admin' | 'editor'
  is_active: boolean
  last_login?: string
  created_at: string
  updated_at: string
} 