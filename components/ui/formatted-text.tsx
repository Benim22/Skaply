import React from 'react'
import Link from 'next/link'

interface FormattedTextProps {
  content: string
  className?: string
}

export function FormattedText({ content, className = "" }: FormattedTextProps) {
  // Dela upp texten i rader och behåll tomma rader för struktur
  const lines = content.split('\n')
  
  // Funktion för att hantera Markdown-formatering i text
  const formatText = (text: string) => {
    // Först spara alla länkar temporärt
    const linkPlaceholders: string[] = []
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
      const placeholder = `__LINK_${linkPlaceholders.length}__`
      linkPlaceholders.push(`<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#00ADB5] hover:text-[#00ADB5]/80 underline transition-colors font-semibold">${linkText}</a>`)
      return placeholder
    })
    
    // Hantera fet text **text**
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground bg-[#00ADB5]/15 px-1 py-0.5 rounded">$1</strong>')
    
    // Hantera kursiv text *text*
    text = text.replace(/\*([^*]+)\*/g, '<em class="text-[#00ADB5] font-medium">$1</em>')
    
    // Hantera understruken text <u>text</u>
    text = text.replace(/<u>([^<]+)<\/u>/g, '<u class="text-foreground decoration-[#00ADB5] decoration-2">$1</u>')
    
    // Highlight viktiga ord automatiskt (undvik att påverka länkplaceholders)
    const importantWords = ['Next\\.js', 'React', 'Tailwind', 'Supabase', 'TypeScript', 'Vercel', 'API', 'PWA', 'SEO', 'HTTPS', 'automatisk', 'realtid', 'digital', 'effektiv', 'säker', 'skalbar', 'modern', 'responsiv', 'optimerad']
    importantWords.forEach(word => {
      const regex = new RegExp(`\\b(${word})\\b(?![^<]*>)(?![^<]*__LINK_)`, 'gi')
      text = text.replace(regex, '<span class="text-[#00ADB5] font-medium">$1</span>')
    })
    
    // Återställ länkarna sist
    linkPlaceholders.forEach((link, index) => {
      text = text.replace(`__LINK_${index}__`, link)
    })
    
    return text
  }
  
  const renderLine = (line: string, index: number) => {
    const trimmedLine = line.trim()
    
    // Tomma rader blir mycket små mellanrum
    if (!trimmedLine) {
      return <div key={index} className="h-1"></div>
    }
    
    // Punktlista (börjar med -)
    if (trimmedLine.startsWith('- ')) {
      const listText = trimmedLine.substring(2)
      return (
        <div key={index} className="flex items-start gap-3 mb-1 pl-2">
          <span className="text-[#00ADB5] font-bold mt-0.5 text-lg">•</span>
          <p className="text-muted-foreground text-sm leading-relaxed flex-1" dangerouslySetInnerHTML={{ __html: formatText(listText) }} />
        </div>
      )
    }
    
    // Numrerad lista (börjar med siffra.)
    if (/^\d+\.\s/.test(trimmedLine)) {
      const match = trimmedLine.match(/^(\d+)\.\s(.*)/)
      if (match) {
        const [, number, listText] = match
        return (
          <div key={index} className="flex items-start gap-2 mb-2">
            <span className="text-[#00ADB5] font-bold mt-1 min-w-[20px]">{number}.</span>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1" dangerouslySetInnerHTML={{ __html: formatText(listText) }} />
          </div>
        )
      }
    }
    
    // Huvudtitel med emoji (🍣 Moi Sushi – Restaurangapp...)
    if (/^🍣\s+/.test(trimmedLine)) {
      return (
        <div key={index} className="bg-gradient-to-r from-[#00ADB5]/20 to-[#16213E]/20 rounded-xl p-4 mb-3 border border-[#00ADB5]/30">
          <h2 className="text-xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: formatText(trimmedLine) }}>
          </h2>
        </div>
      )
    }
    
    // Sektionsrubriker med emojis (📱 Kundfunktioner, ⚙️ Adminpanel, etc)
    if (/^[📱⚙️🛠️🎨📊🚀💡🧍‍♂️👨‍🍳🖨️🧠🧩📈🏪🔮👉🔗🌐📘🔄🖨️🧾♻️🔌💰⏱️✅🎯🧱🏯🏙️🚚🤖🎁🗺️📦]\s+/.test(trimmedLine)) {
      return (
        <div key={index} className="bg-gradient-to-r from-[#00ADB5]/10 to-transparent rounded-lg p-3 mt-3 mb-2 border-l-4 border-[#00ADB5]">
          <h3 className="text-lg font-bold text-[#00ADB5] flex items-center gap-2" dangerouslySetInnerHTML={{ __html: formatText(trimmedLine) }}>
          </h3>
        </div>
      )
    }
    
    // Beskrivningstext direkt efter huvudtitel
    if (index > 0 && /^🍣\s+/.test(lines[index - 1]?.trim() || '')) {
      return (
        <p key={index} className="text-muted-foreground mb-3 text-sm leading-relaxed italic" dangerouslySetInnerHTML={{ __html: formatText(trimmedLine) }}>
        </p>
      )
    }
    
    // Funktioner med kolon (Inloggning & säkerhet:, Digital meny & beställning:, etc)
    if (trimmedLine.includes(':') && !trimmedLine.startsWith('🍣') && 
        !/^[📱⚙️🛠️🎨📊🚀💡🧍‍♂️👨‍🍳🖨️🧠🧩📈🏪🔮👉🔗🌐📘🔄🖨️🧾♻️🔌💰⏱️✅🎯🧱🏯🏙️🚚🤖🎁🗺️📦]\s+/.test(trimmedLine)) {
      
      const [label, ...rest] = trimmedLine.split(':')
      const description = rest.join(':').trim()
      
      return (
        <div key={index} className="mb-1 pl-2 bg-muted/30 rounded-md p-2">
          <span className="font-semibold text-foreground bg-[#00ADB5]/20 px-2 py-1 rounded text-sm" dangerouslySetInnerHTML={{ __html: formatText(label) }}></span>
          {description && (
            <span className="text-muted-foreground ml-2 text-sm" dangerouslySetInnerHTML={{ __html: formatText(description) }}></span>
          )}
        </div>
      )
    }
    
    // Vanlig text/beskrivningar
    return (
      <p key={index} className="text-muted-foreground mb-2 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(trimmedLine) }}>
      </p>
    )
  }
  
  return (
    <div className={`formatted-text ${className}`}>
      {lines.map((line, index) => renderLine(line, index))}
    </div>
  )
} 