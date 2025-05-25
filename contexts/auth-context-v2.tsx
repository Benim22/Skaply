"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"

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
    // Kontrollera befintlig session
    checkSession()

    // Lyssna på auth-ändringar
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await loadUserProfile(session.user)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        await loadUserProfile(session.user)
      }
    } catch (error) {
      console.error('Error checking session:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUserProfile = async (authUser: User) => {
    try {
      // Hämta admin-användardata från admin_users tabellen
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, name, role')
        .eq('email', authUser.email)
        .eq('is_active', true)
        .single()

      if (error || !data) {
        console.error('Admin user not found:', error)
        await supabase.auth.signOut()
        return
      }

      setUser({
        id: data.id,
        name: data.name,
        email: authUser.email!,
        role: data.role
      })

      // Uppdatera last_login
      await supabase.rpc('update_admin_last_login', {
        user_id: data.id
      })
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)

      // Först verifiera att användaren finns i admin_users tabellen
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id, name, role, password_hash')
        .eq('email', email)
        .eq('is_active', true)
        .single()

      if (adminError || !adminData) {
        return { success: false, error: 'Användaren finns inte eller är inaktiv' }
      }

      // Verifiera lösenord med RPC-funktionen
      const { data: verifyData, error: verifyError } = await supabase.rpc('verify_admin_password', {
        user_email: email,
        user_password: password
      })

      if (verifyError || !verifyData || verifyData.length === 0) {
        return { success: false, error: 'Felaktig e-post eller lösenord' }
      }

      // Skapa en temporär användare i Supabase Auth för denna session
      // Detta ger oss 'authenticated' role för RLS
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: 'admin@temp.local', // Temporär email
        password: 'temp-password'
      })

      // Om det misslyckas, skapa användaren först
      if (signInError) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: 'admin@temp.local',
          password: 'temp-password'
        })

        if (signUpError) {
          console.error('Auth error:', signUpError)
          // Fallback: sätt användaren direkt utan Supabase Auth
          setUser({
            id: adminData.id,
            name: adminData.name,
            email: email,
            role: adminData.role
          })
          return { success: true }
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: `Något gick fel vid inloggning: ${error instanceof Error ? error.message : 'Okänt fel'}` }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
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