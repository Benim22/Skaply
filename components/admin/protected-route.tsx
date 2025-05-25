"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('ProtectedRoute - user:', user, 'loading:', loading)
    
    if (!loading && !user) {
      console.log('No user found, redirecting to login')
      router.push("/admin/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00ADB5]/30 border-t-[#00ADB5] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Kontrollerar autentisering...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    console.log('No user, showing null while redirecting')
    return null // Kommer att redirecta till login
  }

  console.log('User authenticated, showing dashboard')
  return <>{children}</>
} 