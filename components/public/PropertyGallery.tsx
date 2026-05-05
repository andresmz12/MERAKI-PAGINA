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
      <div className="h-[500px] bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400 text-lg">Sin imágenes disponibles</span>
      </div>
    )
  }

  return (
    <>
      {/* Main gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[500px]">
        {/* Main image */}
        <div
          className="relative cursor-pointer overflow-hidden"
          onClick={() => { setActiveIndex(0); setLightboxOpen(true) }}
        >
          <Image
            src={imagenes[0]}
            alt={`${titulo} - Imagen principal`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="50vw"
            priority
          />
          {imagenes.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-sm">
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
                className="relative cursor-pointer overflow-hidden"
                onClick={() => { setActiveIndex(idx + 1); setLightboxOpen(true) }}
              >
                <Image
                  src={img}
                  alt={`${titulo} - Imagen ${idx + 2}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="25vw"
                />
                {idx === 1 && imagenes.length > 3 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">+{imagenes.length - 3} más</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-[#C9A96E] transition-colors z-50"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-[#C9A96E] transition-colors z-50 disabled:opacity-30"
            disabled={activeIndex === 0}
            onClick={(e) => { e.stopPropagation(); setActiveIndex(i => i - 1) }}
          >
            ‹
          </button>
          <div
            className="relative w-full max-w-5xl h-[80vh] mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imagenes[activeIndex]}
              alt={`${titulo} - ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-[#C9A96E] transition-colors z-50 disabled:opacity-30"
            disabled={activeIndex === imagenes.length - 1}
            onClick={(e) => { e.stopPropagation(); setActiveIndex(i => i + 1) }}
          >
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {activeIndex + 1} / {imagenes.length}
          </div>
        </div>
      )}
    </>
  )
}
