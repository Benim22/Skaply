import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Digitala Tjänster & Lösningar | Webbutveckling, Appar & AI | Skaply",
  description: "Skräddarsydda digitala tjänster för moderna företag - webbutveckling, apputveckling, AI-lösningar, design & digital marknadsföring. Kontakta oss för en kostnadsfri konsultation!",
  keywords: [
    'webbutveckling företag', 
    'mobilappar Stockholm', 
    'skräddarsydda webbplatser', 
    'AI-integration företag', 
    'e-handelslösningar',
    'responsiv webbdesign',
    'React utvecklare',
    'SEO-tjänster',
    'digital transformation'
  ],
  openGraph: {
    title: "Digitala Tjänster & Lösningar | Webbutveckling, Appar & AI | Skaply",
    description: "Skräddarsydda digitala tjänster för moderna företag - webbutveckling, apputveckling, AI-lösningar, design & digital marknadsföring. Kontakta oss för en kostnadsfri konsultation!",
    url: "https://www.skaply.se/tjanster",
    type: "website",
    images: [
      {
        url: "https://www.skaply.se/link_preview.png",
        width: 1200,
        height: 630,
        alt: "Skaply - Digitala Tjänster"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitala Tjänster & Lösningar | Webbutveckling, Appar & AI | Skaply",
    description: "Skräddarsydda digitala tjänster för moderna företag - webbutveckling, apputveckling, AI-lösningar, design & digital marknadsföring.",
    images: ["https://www.skaply.se/link_preview.png"]
  }
}

export default function TjansterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 