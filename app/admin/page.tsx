"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  FolderOpen, 
  Wrench, 
  MessageSquare, 
  Star, 
  Mail,
  LogOut,
  Home,
  User
} from "lucide-react"
import Link from "next/link"
import { ProjectsAdmin } from "@/components/admin/projects-admin"
import { ServicesAdmin } from "@/components/admin/services-admin"
import { FAQAdmin } from "@/components/admin/faq-admin"
import { TestimonialsAdmin } from "@/components/admin/testimonials-admin"
import { NewsletterAdmin } from "@/components/admin/newsletter-admin"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { useAuth } from "@/contexts/auth-context"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-[#16213E] border-r border-[#0F3460]/30">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
            {user && (
              <div className="flex items-center gap-2 mb-6 p-2 bg-[#0F3460]/30 rounded-lg">
                <User className="h-4 w-4 text-[#00ADB5]" />
                <div className="text-sm">
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-gray-400 text-xs">{user.role}</p>
                </div>
              </div>
            )}
          
            <nav className="space-y-2">
              <Button
                variant={activeTab === "overview" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Översikt
              </Button>
              
              <Button
                variant={activeTab === "projects" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("projects")}
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                Projekt
              </Button>
              
              <Button
                variant={activeTab === "services" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("services")}
              >
                <Wrench className="mr-2 h-4 w-4" />
                Tjänster
              </Button>
              
              <Button
                variant={activeTab === "faq" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("faq")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                FAQ
              </Button>
              
              <Button
                variant={activeTab === "testimonials" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("testimonials")}
              >
                <Star className="mr-2 h-4 w-4" />
                Omdömen
              </Button>
              
              <Button
                variant={activeTab === "newsletter" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("newsletter")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Nyhetsbrev
              </Button>
            </nav>
            
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Till hemsidan
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-400 hover:text-red-300"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logga ut
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-3xl font-bold mb-6">Välkommen till Admin Dashboard</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Projekt</CardTitle>
                      <CardDescription>Hantera dina projekt</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Aktiva projekt</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Tjänster</CardTitle>
                      <CardDescription>Dina erbjudna tjänster</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">6</p>
                      <p className="text-sm text-muted-foreground">Aktiva tjänster</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Nyhetsbrev</CardTitle>
                      <CardDescription>Prenumeranter</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Aktiva prenumeranter</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Snabbåtgärder</CardTitle>
                    <CardDescription>Vanliga uppgifter</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button onClick={() => setActiveTab("projects")}>Lägg till nytt projekt</Button>
                    <Button onClick={() => setActiveTab("faq")} variant="outline">Uppdatera FAQ</Button>
                    <Button onClick={() => setActiveTab("newsletter")} variant="outline">Visa prenumeranter</Button>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "projects" && <ProjectsAdmin />}
            {activeTab === "services" && <ServicesAdmin />}
            {activeTab === "faq" && <FAQAdmin />}
            {activeTab === "testimonials" && <TestimonialsAdmin />}
            {activeTab === "newsletter" && <NewsletterAdmin />}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 