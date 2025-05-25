"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Lock, Mail, LogIn } from "lucide-react"
import Link from "next/link"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast({
        title: "Fält saknas",
        description: "Vänligen fyll i både e-post och lösenord.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    
    const result = await login(email, password)
    
    if (result.success) {
      toast({
        title: "Inloggad",
        description: "Välkommen till admin-panelen!",
      })
      router.push("/admin")
    } else {
      toast({
        title: "Inloggning misslyckades",
        description: result.error || "Något gick fel",
        variant: "destructive",
      })
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Skaply Admin</h1>
          <p className="text-gray-400">Logga in för att hantera innehåll</p>
        </div>

        <Card className="bg-[#16213E]/80 backdrop-blur-sm border-[#0F3460]/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Logga in</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Ange dina inloggningsuppgifter för att komma åt admin-panelen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">E-postadress</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@skaply.se"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-[#0F3460]/50 border-[#0F3460]/50 text-white placeholder:text-gray-400 focus:border-[#00ADB5]"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Lösenord</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ditt lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-[#0F3460]/50 border-[#0F3460]/50 text-white placeholder:text-gray-400 focus:border-[#00ADB5]"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00ADB5] hover:bg-[#00ADB5]/80 text-white"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Loggar in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Logga in
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                href="/" 
                className="text-sm text-gray-400 hover:text-[#00ADB5] transition-colors"
              >
                ← Tillbaka till hemsidan
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AdminLogin() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  )
} 