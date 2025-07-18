"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  List, 
  ListOrdered,
  Eye,
  Edit,
  Type,
  FileText
} from "lucide-react"
import { FormattedText } from "@/components/ui/formatted-text"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  className?: string
}

export function RichTextEditorV2({ 
  value, 
  onChange, 
  label = "Beskrivning", 
  placeholder = "Skriv din beskrivning här...",
  className 
}: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkText, setLinkText] = useState("")
  const [linkUrl, setLinkUrl] = useState("https://")
  const editorRef = useRef<HTMLDivElement>(null)
  const [currentSelection, setCurrentSelection] = useState<Range | null>(null)
  const [showStructureDialog, setShowStructureDialog] = useState(false)

  // Konvertera HTML till Markdown
  const htmlToMarkdown = (html: string): string => {
    let markdown = html
    
    // Konvertera länkar
    markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g, '[$2]($1)')
    
    // Konvertera formatering
    markdown = markdown.replace(/<strong>([^<]*)<\/strong>/g, '**$1**')
    markdown = markdown.replace(/<em>([^<]*)<\/em>/g, '*$1*')
    markdown = markdown.replace(/<u>([^<]*)<\/u>/g, '<u>$1</u>')
    
    // Konvertera listor
    markdown = markdown.replace(/<li>([^<]*)<\/li>/g, '- $1')
    markdown = markdown.replace(/<\/ul>|<ul>/g, '')
    markdown = markdown.replace(/<\/ol>|<ol>/g, '')
    
    // Konvertera radbrytningar
    markdown = markdown.replace(/<br\s*\/?>/g, '\n')
    markdown = markdown.replace(/<\/p><p>/g, '\n\n')
    markdown = markdown.replace(/<\/?p>/g, '')
    
    // Ta bort HTML-taggar
    markdown = markdown.replace(/<[^>]*>/g, '')
    markdown = markdown.replace(/&nbsp;/g, ' ')
    markdown = markdown.replace(/&amp;/g, '&')
    markdown = markdown.replace(/&lt;/g, '<')
    markdown = markdown.replace(/&gt;/g, '>')
    
    return markdown.trim()
  }

  // Konvertera Markdown till HTML för redigering
  const markdownToHtml = (markdown: string): string => {
    let html = markdown
    
    // Konvertera länkar
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" contenteditable="false" class="text-blue-500 underline">$1</a>')
    
    // Konvertera formatering
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
    html = html.replace(/<u>([^<]+)<\/u>/g, '<u>$1</u>')
    
    // Konvertera radbrytningar
    html = html.replace(/\n/g, '<br>')
    
    return html
  }

  // Uppdatera editor när värdet ändras
  useEffect(() => {
    if (editorRef.current && !isPreview) {
      const html = markdownToHtml(value)
      if (editorRef.current.innerHTML !== html) {
        editorRef.current.innerHTML = html
      }
    }
  }, [value, isPreview])

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      const markdown = htmlToMarkdown(html)
      onChange(markdown)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    handleInput()
  }

  const saveSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      setCurrentSelection(selection.getRangeAt(0))
    }
  }

  const restoreSelection = () => {
    if (currentSelection) {
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(currentSelection)
    }
  }

  const handleLinkClick = () => {
    saveSelection()
    const selection = window.getSelection()
    const selectedText = selection?.toString() || ""
    setLinkText(selectedText)
    setShowLinkDialog(true)
  }

  const insertLink = () => {
    if (linkText && linkUrl) {
      restoreSelection()
      const linkHtml = `<a href="${linkUrl}" contenteditable="false" class="text-blue-500 underline">${linkText}</a>`
      document.execCommand('insertHTML', false, linkHtml)
      handleInput()
    }
    setShowLinkDialog(false)
    setLinkText("")
    setLinkUrl("https://")
  }

  const insertList = (ordered: boolean = false) => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const listItem = document.createElement('li')
      listItem.textContent = 'Listpunkt'
      
      const list = document.createElement(ordered ? 'ol' : 'ul')
      list.appendChild(listItem)
      
      range.insertNode(list)
      handleInput()
    }
  }

  const insertStructuredTemplate = () => {
    const template = `🍣 Projektnamn – **Komplett digital lösning**
👥 Skapad för: Klientnamn
📍 Platser: Stad, Stad, Stad
🏷️ Bransch: Restaurang / Foodservice
📅 År: 2025

📘 Om projektet
Skaply har levererat ett **komplett, digitalt system** som förenar *kundvänlig e-handel* med intern automation och skalbar driftshantering. Systemet är byggt för **hög prestanda** och används idag i *skarp drift*.

💡 Funktionalitet i korthet

🧍‍♂️ För kunder:
- **Onlinebeställning** via mobil eller dator – *ingen app krävs*
- **Meny** med bilder, allergi- och tilläggsval
- **Beställningar** med leverans eller avhämtning
- **Bordsbokning** med digital bekräftelse

👨‍🍳 För personal:
- **Realtidsöversikt** av inkommande beställningar
- **Automatisk kvittoutskrift** med Rock Pi-lösning
- **Adminpanel** för meny, statistik och kampanjer
- **iPad-optimerad** terminal med notiser

🧩 Teknik & Arkitektur
⚙️ Frontend: **Next.js**, **React**, **Tailwind CSS**
🔐 Backend: **Supabase** (PostgreSQL, Auth, RLS)
⚡ Prestanda: **<2 sek** laddningstid, **PWA-stöd**, WCAG-kompatibel
🔒 Säkerhet: **HTTPS**, Row-Level Security, automatisk backup

📈 Resultat & Effekt
💰 **+15-25%** ökad försäljning via digitala beställningar
⏱️ **20-30%** effektivare orderhantering
✅ **90%** färre fel i manuella beställningar
🎯 **Högt användarvärde** och snabb intern onboarding

🔗 [Projektlänk](https://example.com)
🌐 [Skaply – Digitala lösningar](https://skaply.se)`

    if (editorRef.current) {
      editorRef.current.innerHTML = markdownToHtml(template)
      onChange(template)
    }
    setShowStructureDialog(false)
  }

  const toolbarButtons = [
    {
      icon: Bold,
      label: "Fet text",
      action: () => execCommand('bold')
    },
    {
      icon: Italic,
      label: "Kursiv text", 
      action: () => execCommand('italic')
    },
    {
      icon: Underline,
      label: "Understruken text",
      action: () => execCommand('underline')
    },
    {
      icon: Link,
      label: "Länk",
      action: handleLinkClick
    },
    {
      icon: List,
      label: "Punktlista",
      action: () => insertList(false)
    },
    {
      icon: ListOrdered,
      label: "Numrerad lista",
      action: () => insertList(true)
    },
    {
      icon: FileText,
      label: "Strukturerad mall",
      action: () => setShowStructureDialog(true)
    }
  ]

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={isPreview ? "outline" : "default"}
            size="sm"
            onClick={() => setIsPreview(false)}
          >
            <Edit className="w-4 h-4 mr-1" />
            Redigera
          </Button>
          <Button
            type="button"
            variant={isPreview ? "default" : "outline"}
            size="sm"
            onClick={() => setIsPreview(true)}
          >
            <Eye className="w-4 h-4 mr-1" />
            Förhandsgranska
          </Button>
        </div>
      </div>

      {!isPreview ? (
        <div className="space-y-2">
          {/* Verktygsfält */}
          <div className="flex flex-wrap gap-1 p-2 bg-muted/50 rounded-lg border">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                type="button"
                variant="ghost"
                size="sm"
                onClick={button.action}
                title={button.label}
                className="h-8 w-8 p-0"
              >
                <button.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          {/* Redigerbara området */}
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            className="min-h-[200px] p-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm leading-relaxed"
            style={{ whiteSpace: 'pre-wrap' }}
            suppressContentEditableWarning={true}
          />

          {/* Länk-dialog */}
          <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Lägg till länk</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="linkText">Länktext</Label>
                  <Input
                    id="linkText"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Skriv länktext här"
                  />
                </div>
                <div>
                  <Label htmlFor="linkUrl">URL</Label>
                  <Input
                    id="linkUrl"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={insertLink} className="flex-1">
                    Lägg till länk
                  </Button>
                  <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
                    Avbryt
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Strukturerad mall-dialog */}
          <Dialog open={showStructureDialog} onOpenChange={setShowStructureDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Strukturerad projektmall</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Detta kommer att ersätta allt innehåll med en strukturerad mall för projektbeskrivningar.
                </p>
                <div className="flex gap-2">
                  <Button onClick={insertStructuredTemplate} className="flex-1">
                    Använd mall
                  </Button>
                  <Button variant="outline" onClick={() => setShowStructureDialog(false)}>
                    Avbryt
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Hjälptext */}
          <div className="text-xs text-muted-foreground">
            <p>Använd verktygsfältet för att formatera text. Länkar läggs till via länk-knappen.</p>
          </div>
        </div>
      ) : (
        <div className="min-h-[200px] p-4 border rounded-lg bg-background">
          <FormattedText content={value} />
        </div>
      )}
    </div>
  )
} 