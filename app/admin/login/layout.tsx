import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login | Skaply",
  description: "Logga in till admin-panelen",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 