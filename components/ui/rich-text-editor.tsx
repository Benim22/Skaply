"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  List, 
  ListOrdered,
  Eye,
  Edit
} from "lucide-react"
import { FormattedText } from "@/components/ui/formatted-text"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  className?: string
}

export function RichTextEditor({ 
  value, 
  onChange, 
  label = "Beskrivning", 
  placeholder = "Skriv din beskrivning här...",
  className 
}: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange(newText)
    
    // Sätt fokus och markering efter infogning
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const insertLink = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    // Prompt användaren för URL och text
    const linkUrl = prompt("Ange URL:", "https://example.com")
    if (!linkUrl) return // Användaren avbröt
    
    const linkText = selectedText || prompt("Ange länktext:", "klicka här") || "länk"
    
    const newText = value.substring(0, start) + `[${linkText}](${linkUrl})` + value.substring(end)
    onChange(newText)
    
    setTimeout(() => {
      textarea.focus()
      // Placera markören efter länken
      const newCursorPos = start + `[${linkText}](${linkUrl})`.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const toolbarButtons = [
    {
      icon: Bold,
      label: "Fet text",
      action: () => insertText("**", "**")
    },
    {
      icon: Italic,
      label: "Kursiv text", 
      action: () => insertText("*", "*")
    },
    {
      icon: Underline,
      label: "Understruken text",
      action: () => insertText("<u>", "</u>")
    },
    {
      icon: Link,
      label: "Länk",
      action: insertLink
    },
    {
      icon: List,
      label: "Punktlista",
      action: () => insertText("- ")
    },
    {
      icon: ListOrdered,
      label: "Numrerad lista",
      action: () => insertText("1. ")
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

          {/* Textområde */}
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={8}
            className="min-h-[200px] font-mono text-sm"
          />

          {/* Hjälptext */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Formatering:</strong></p>
            <p>**fet text** • *kursiv text* • &lt;u&gt;understruken&lt;/u&gt;</p>
            <p>- punktlista • 1. numrerad lista</p>
            <p><strong>Länkar:</strong> Klicka på länk-knappen för att lägga till en länk med dialogruta</p>
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