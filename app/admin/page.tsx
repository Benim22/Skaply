"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { 
  LayoutDashboard, 
  FolderOpen, 
  Wrench, 
  MessageSquare, 
  Star, 
  Mail,
  LogOut,
  Home,
  User,
  Activity,
  Globe,
  Menu,
  X
} from "lucide-react"
import Link from "next/link"
import { ProjectsAdmin } from "@/components/admin/projects-admin"
import { ServicesAdmin } from "@/components/admin/services-admin"
import { FAQAdmin } from "@/components/admin/faq-admin"
import { TestimonialsAdmin } from "@/components/admin/testimonials-admin"
import { NewsletterAdmin } from "@/components/admin/newsletter-admin"
import { AnalyticsOverview } from "@/components/admin/analytics-overview"
import { RealtimeAnalytics } from "@/components/admin/realtime-analytics"
import { GeographicAnalytics } from "@/components/admin/geographic-analytics"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { useAuth } from "@/contexts/auth-context"

const navigationItems = [
  { id: "overview", label: "Översikt", icon: LayoutDashboard },
  { id: "realtime", label: "Realtidsdata", icon: Activity },
  { id: "geographic", label: "Geografisk data", icon: Globe },
  { id: "projects", label: "Projekt", icon: FolderOpen },
  { id: "services", label: "Tjänster", icon: Wrench },
  { id: "faq", label: "FAQ", icon: MessageSquare },
  { id: "testimonials", label: "Omdömen", icon: Star },
  { id: "newsletter", label: "Nyhetsbrev", icon: Mail },
]

function NavigationContent({ activeTab, setActiveTab, onItemClick }: {
  activeTab: string
  setActiveTab: (tab: string) => void
  onItemClick?: () => void
}) {
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-[#0F3460]/30">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
        {user && (
          <div className="flex items-center gap-2 p-2 bg-[#0F3460]/30 rounded-lg">
            <User className="h-4 w-4 text-[#00ADB5] flex-shrink-0" />
            <div className="text-sm min-w-0">
              <p className="text-white font-medium truncate">{user.name}</p>
              <p className="text-gray-400 text-xs">{user.role}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 md:p-6 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start text-left"
              onClick={() => {
                setActiveTab(item.id)
                onItemClick?.()
              }}
            >
              <Icon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Button>
          )
        })}
      </nav>
      
      {/* Footer */}
      <div className="p-4 md:p-6 space-y-2 border-t border-[#0F3460]/30">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">Till hemsidan</span>
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-400 hover:text-red-300"
          onClick={() => {
            logout()
            onItemClick?.()
          }}
        >
          <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">Logga ut</span>
        </Button>
      </div>
    </div>
  )
}

function MobileHeader({ activeTab, onMenuClick }: {
  activeTab: string
  onMenuClick: () => void
}) {
  const currentItem = navigationItems.find(item => item.id === activeTab)
  const Icon = currentItem?.icon || LayoutDashboard

  return (
    <div className="md:hidden bg-[#16213E] border-b border-[#0F3460]/30 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="text-white hover:bg-[#0F3460]/30"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-[#00ADB5]" />
          <h1 className="text-lg font-semibold text-white">
            {currentItem?.label || "Dashboard"}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl font-bold">Välkommen till Admin Dashboard</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Hantera ditt innehåll och följ statistik
              </p>
            </div>
            
            <AnalyticsOverview />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base md:text-lg">Projekt</CardTitle>
                  <CardDescription className="text-sm">Hantera dina projekt</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xl md:text-2xl font-bold">3</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Aktiva projekt</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base md:text-lg">Tjänster</CardTitle>
                  <CardDescription className="text-sm">Dina erbjudna tjänster</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xl md:text-2xl font-bold">6</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Aktiva tjänster</p>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-1 lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base md:text-lg">Nyhetsbrev</CardTitle>
                  <CardDescription className="text-sm">Prenumeranter</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xl md:text-2xl font-bold">0</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Aktiva prenumeranter</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Snabbåtgärder</CardTitle>
                <CardDescription className="text-sm">Vanliga uppgifter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  <Button 
                    onClick={() => setActiveTab("projects")}
                    className="w-full text-sm"
                  >
                    Lägg till nytt projekt
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("faq")} 
                    variant="outline"
                    className="w-full text-sm"
                  >
                    Uppdatera FAQ
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("newsletter")} 
                    variant="outline"
                    className="w-full text-sm sm:col-span-2 lg:col-span-1"
                  >
                    Visa prenumeranter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "realtime":
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl font-bold">Realtidsdata</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Se vad som händer på din webbplats just nu
              </p>
            </div>
            <RealtimeAnalytics />
          </div>
        )
      case "geographic":
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl font-bold">Geografisk analys</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Utforska var dina besökare kommer ifrån
              </p>
            </div>
            <GeographicAnalytics />
          </div>
        )
      case "projects":
        return <ProjectsAdmin />
      case "services":
        return <ServicesAdmin />
      case "faq":
        return <FAQAdmin />
      case "testimonials":
        return <TestimonialsAdmin />
      case "newsletter":
        return <NewsletterAdmin />
      default:
        return null
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-64 bg-[#16213E] border-r border-[#0F3460]/30">
          <NavigationContent 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-64 p-0 bg-[#16213E] border-[#0F3460]/30">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <NavigationContent 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              onItemClick={() => setMobileMenuOpen(false)}
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <MobileHeader 
            activeTab={activeTab}
            onMenuClick={() => setMobileMenuOpen(true)}
          />

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="p-4 md:p-6 lg:p-8 max-w-full">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 