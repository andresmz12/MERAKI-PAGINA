'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PropertyGalleryProps {
  imagenes: string[]
  titulo: string
}

export default function PropertyGallery({ imagenes, titulo }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (imagenes.length === 0) {
    return (
      <div className="h-[500px] bg-gradient-to-br from-[#1A1A2E] to-[#2D2D4E] flex items-center justify-center">
        <span className="font-display text-[#D4AF37] text-5xl font-bold tracking-widest opacity-20">MERAKI</span>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[500px]">
        {/* Main image */}
        <div
          className="relative cursor-pointer overflow-hidden group"
          onClick={() => { setActiveIndex(0); setLightboxOpen(true) }}
        >
          <Image
            src={imagenes[0]}
            alt={`${titulo} — imagen principal`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="50vw"
            priority
          />
          <div className="absolute inset-0 bg-[#0D0D1A]/0 group-hover:bg-[#0D0D1A]/20 transition-all duration-300" />
          {imagenes.length > 1 && (
            <div className="absolute bottom-4 right-4 font-sans bg-[#1A1A2E]/80 text-white text-xs px-3 py-1.5 tracking-wider">
              Ver todas ({imagenes.length})
            </div>
          )}
        </div>

        {/* Secondary images */}
        {imagenes.length > 1 && (
          <div className={`grid gap-2 ${imagenes.length > 2 ? 'grid-rows-2' : 'grid-rows-1'}`}>
            {imagenes.slice(1, 3).map((img, idx) => (
              <div
                key={idx}
                className="relative cursor-pointer overflow-hidden group"
                onClick={() => { setActiveIndex(idx + 1); setLightboxOpen(true) }}
              >
                <Image
                  src={img}
                  alt={`${titulo} — imagen ${idx + 2}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-[#0D0D1A]/0 group-hover:bg-[#0D0D1A]/20 transition-all duration-300" />
                {idx === 1 && imagenes.length > 3 && (
                  <div className="absolute inset-0 bg-[#1A1A2E]/50 flex items-center justify-center">
                    <span className="font-display text-white text-2xl font-semibold">+{imagenes.length - 3} más</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {imagenes.length > 3 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
          {imagenes.map((img, idx) => (
            <button
              key={idx}
              onClick={() => { setActiveIndex(idx); setLightboxOpen(true) }}
              className={`relative w-16 h-16 flex-shrink-0 overflow-hidden transition-all duration-200 ${
                idx === activeIndex ? 'ring-2 ring-[#D4AF37]' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`${titulo} ${idx + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 font-sans text-white/60 hover:text-[#D4AF37] transition-colors z-50 text-4xl leading-none"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#D4AF37] transition-colors z-50 text-5xl leading-none disabled:opacity-20"
            disabled={activeIndex === 0}
            onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => i - 1) }}
          >
            ‹
          </button>
          <div
            className="relative w-full max-w-5xl h-[80vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imagenes[activeIndex]}
              alt={`${titulo} — ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#D4AF37] transition-colors z-50 text-5xl leading-none disabled:opacity-20"
            disabled={activeIndex === imagenes.length - 1}
            onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => i + 1) }}
          >
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-white/40 text-sm">
            {activeIndex + 1} / {imagenes.length}
          </div>
        </div>
      )}
    </>
  )
}
