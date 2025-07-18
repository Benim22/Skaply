"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProjectGalleryProps {
  images: string[]
  title: string
  className?: string
}

export function ProjectGallery({ images, title, className }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Automatisk bildväxling varje 5 sekunder
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 5000)
      
      return () => clearInterval(interval)
    }
  }, [images.length])

  // Om det bara finns en bild, visa den utan carousel
  if (images.length <= 1) {
    return (
      <div className={`relative aspect-video rounded-lg overflow-hidden ${className}`}>
        <Image
          src={images[0] || "/placeholder.jpg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Huvudbild med fade-effekt */}
      <div className="relative aspect-video rounded-lg overflow-hidden">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`${title} - Bild ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ))}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Navigationspilar */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none rounded-full w-10 h-10 flex items-center justify-center transition-all hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none rounded-full w-10 h-10 flex items-center justify-center transition-all hover:scale-110"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bildräknare */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Badge variant="secondary" className="bg-black/50 text-white border-none">
          {currentIndex + 1} / {images.length}
        </Badge>
      </div>

      {/* Prickar för navigation */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-white" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
} 