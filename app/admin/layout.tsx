import { Metadata } from "next"
import { AuthProvider } from "@/contexts/auth-context"

export const metadata: Metadata = {
  title: "Admin Dashboard | Skaply",
  description: "Administrera innehåll på Skaply webbplats",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </AuthProvider>
  )
} 