import React from 'react'

interface FormattedTextProps {
  content: string
  className?: string
}

export function FormattedText({ content, className = "" }: FormattedTextProps) {
  // Dela upp texten i rader och behåll tomma rader för struktur
  const lines = content.split('\n')
  
  const renderLine = (line: string, index: number) => {
    const trimmedLine = line.trim()
    
    // Tomma rader blir små mellanrum
    if (!trimmedLine) {
      return <div key={index} className="h-2"></div>
    }
    
    // Huvudtitel med emoji (🍣 Moi Sushi – Restaurangapp...)
    if (/^🍣\s+/.test(trimmedLine)) {
      return (
        <h2 key={index} className="text-xl font-bold text-foreground mb-4">
          {trimmedLine}
        </h2>
      )
    }
    
    // Sektionsrubriker med emojis (📱 Kundfunktioner, ⚙️ Adminpanel, etc)
    if (/^[📱⚙️🛠️🎨📊🚀]\s+/.test(trimmedLine)) {
      return (
        <h3 key={index} className="text-lg font-bold text-[#00ADB5] mt-6 mb-3 first:mt-2">
          {trimmedLine}
        </h3>
      )
    }
    
    // Beskrivningstext direkt efter huvudtitel
    if (index > 0 && /^🍣\s+/.test(lines[index - 1]?.trim() || '')) {
      return (
        <p key={index} className="text-muted-foreground mb-4 text-sm leading-relaxed italic">
          {trimmedLine}
        </p>
      )
    }
    
    // Funktioner med kolon (Inloggning & säkerhet:, Digital meny & beställning:, etc)
    if (trimmedLine.includes(':') && !trimmedLine.startsWith('🍣') && 
        !trimmedLine.startsWith('📱') && !trimmedLine.startsWith('⚙️') && 
        !trimmedLine.startsWith('🛠️') && !trimmedLine.startsWith('🎨') && 
        !trimmedLine.startsWith('📊') && !trimmedLine.startsWith('🚀')) {
      
      const [label, ...rest] = trimmedLine.split(':')
      const description = rest.join(':').trim()
      
      return (
        <div key={index} className="mb-2 pl-4">
          <span className="font-semibold text-foreground">{label}:</span>
          {description && (
            <span className="text-muted-foreground ml-1">{description}</span>
          )}
        </div>
      )
    }
    
    // Vanlig text/beskrivningar
    return (
      <p key={index} className="text-muted-foreground mb-2 text-sm leading-relaxed">
        {trimmedLine}
      </p>
    )
  }
  
  return (
    <div className={`formatted-text ${className}`}>
      {lines.map((line, index) => renderLine(line, index))}
    </div>
  )
} 