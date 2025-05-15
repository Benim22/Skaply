import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integritetspolicy | Skaply",
  description: "Information om hur Skaply hanterar och skyddar dina personuppgifter.",
};

export default function IntegritetspolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 