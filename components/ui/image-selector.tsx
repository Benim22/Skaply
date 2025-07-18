"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageSelectorProps {
  selectedImages: string[]
  onImagesChange: (images: string[]) => void
  multiple?: boolean
  className?: string
}

// Tillgängliga bilder från public-mappen
const PUBLIC_IMAGES = [
  "/barberhaus.png",
  "/skaply_logo.png",
  "/placeholder-logo.png",
  "/placeholder-user.jpg",
  "/placeholder.jpg",
  "/placeholders/placeholder-moi.png",
  "/placeholders/Placeholder-maxcor.png",
  "/link_preview.png",
  "/moi1.png",
  "/moi2.png",
  "/moi3.png",
  "/moi4.png",
  "/moi5.png"
]

export function ImageSelector({ selectedImages, onImagesChange, multiple = false, className }: ImageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [customUrl, setCustomUrl] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleImageSelect = (imageUrl: string) => {
    if (multiple) {
      if (selectedImages.includes(imageUrl)) {
        // Ta bort bilden om den redan är vald
        onImagesChange(selectedImages.filter(img => img !== imageUrl))
      } else {
        // Lägg till bilden
        onImagesChange([...selectedImages, imageUrl])
      }
    } else {
      // Ersätt den enda bilden
      onImagesChange([imageUrl])
      setIsOpen(false)
    }
  }

  const handleCustomUrlAdd = () => {
    if (customUrl.trim()) {
      if (multiple) {
        if (!selectedImages.includes(customUrl.trim())) {
          onImagesChange([...selectedImages, customUrl.trim()])
        }
      } else {
        onImagesChange([customUrl.trim()])
        setIsOpen(false)
      }
      setCustomUrl("")
    }
  }

  const handleRemoveImage = (imageUrl: string) => {
    onImagesChange(selectedImages.filter(img => img !== imageUrl))
  }

  // Filtrera bilder baserat på sökterm
  const filteredImages = PUBLIC_IMAGES.filter(image => 
    image.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={className}>
      <Label className="text-sm font-medium">
        {multiple ? "Bilder för galleri" : "Bild"}
      </Label>
      
      {selectedImages.length > 0 && (
        <div className="mt-2 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Label className="text-sm text-muted-foreground">Valda bilder:</Label>
            <Badge variant="outline">{selectedImages.length} st</Badge>
          </div>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-muted/20 rounded-lg">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative group">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-border hover:border-primary/50 transition-colors">
                  <Image
                    src={image}
                    alt={`Selected ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  <button
                    onClick={() => handleRemoveImage(image)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <Badge variant="secondary" className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs px-1">
                  {index + 1}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {multiple ? "Lägg till bilder" : "Välj bild"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {multiple ? "Välj bilder för galleri" : "Välj bild"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 overflow-y-auto flex-1 pr-2">
            {/* Anpassad URL */}
            <div className="space-y-2">
              <Label>Anpassad URL</Label>
              <div className="flex gap-2">
                <Input
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg eller /path/to/image.jpg"
                />
                <Button onClick={handleCustomUrlAdd} variant="outline">
                  Lägg till
                </Button>
              </div>
            </div>

            {/* Bilder från public-mappen */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Bilder från public-mappen</Label>
                <Badge variant="secondary">{filteredImages.length} av {PUBLIC_IMAGES.length} bilder</Badge>
              </div>
              
              {/* Sökfält */}
              <div className="relative">
                <Input
                  placeholder="Sök efter bilder..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
                <ImageIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              
              <div className="max-h-[400px] overflow-y-auto border rounded-lg p-3 bg-muted/20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {filteredImages.map((image) => (
                    <div
                      key={image}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                        selectedImages.includes(image)
                          ? "border-primary ring-2 ring-primary/20 shadow-lg"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleImageSelect(image)}
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={image}
                          alt={image}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                        {selectedImages.includes(image) && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <Badge variant="default" className="text-xs">✓</Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-2 bg-background/95 backdrop-blur-sm">
                        <p className="text-xs text-muted-foreground truncate font-medium">
                          {image.split('/').pop()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 