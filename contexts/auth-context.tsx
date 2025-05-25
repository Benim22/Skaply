"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { supabase } from "@/lib/supabase"

interface AdminUser {
  id: string
  name: string
  email: string
  role: 'super_admin' | 'admin' | 'editor'
}

interface AuthContextType {
  user: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Kontrollera om användaren är inloggad vid sidladdning
    const savedUser = localStorage.getItem('admin_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('admin_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      
      console.log('Attempting login for:', email)
      
      // Anropa Supabase-funktionen för att verifiera lösenord
      const { data, error } = await supabase.rpc('verify_admin_password', {
        user_email: email,
        user_password: password
      })

      console.log('Supabase response:', { data, error })

      if (error) {
        console.error('Login error:', error)
        
        // Specifika felmeddelanden
        if (error.code === 'PGRST116') {
          return { success: false, error: 'Admin-funktioner är inte konfigurerade. Kontakta systemadministratör.' }
        }
        
        return { success: false, error: `Tekniskt fel: ${error.message || 'Okänt fel'}` }
      }

      if (!data || data.length === 0) {
        return { success: false, error: 'Felaktig e-post eller lösenord' }
      }

      const userData = data[0]
      console.log('User data received:', userData)
      
      const adminUser: AdminUser = {
        id: userData.user_id,
        name: userData.user_name,
        email: email,
        role: userData.user_role
      }

      // Uppdatera last_login
      try {
        const { error: updateError } = await supabase.rpc('update_admin_last_login', {
          user_id: userData.user_id
        })

        if (updateError) {
          console.warn('Could not update last_login:', updateError)
        }
      } catch (updateErr) {
        console.warn('Last login update failed:', updateErr)
      }

      setUser(adminUser)
      localStorage.setItem('admin_user', JSON.stringify(adminUser))
      
      console.log('Login successful, user set:', adminUser)
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: `Något gick fel vid inloggning: ${error instanceof Error ? error.message : 'Okänt fel'}` }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('admin_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 