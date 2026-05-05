'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface UploadedImage {
  url: string
  publicId: string
}

interface ImageUploaderProps {
  images: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
  maxImages?: number
}

export default function ImageUploader({ images, onChange, maxImages = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')

  const uploadFile = async (file: File): Promise<UploadedImage | null> => {
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen')
      return null
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('El archivo no puede superar 10MB')
      return null
    }

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    if (!res.ok) throw new Error('Error al subir imagen')
    return res.json()
  }

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setError('')

    const remaining = maxImages - images.length
    if (remaining <= 0) {
      setError(`Máximo ${maxImages} imágenes permitidas`)
      return
    }

    const filesToUpload = Array.from(files).slice(0, remaining)
    setUploading(true)

    try {
      const results = await Promise.all(filesToUpload.map(uploadFile))
      const successful = results.filter((r): r is UploadedImage => r !== null)
      onChange([...images, ...successful])
    } catch {
      setError('Error al subir una o más imágenes')
    } finally {
      setUploading(false)
    }
  }, [images, maxImages, onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleRemove = async (index: number) => {
    const img = images[index]
    if (img.publicId) {
      try {
        await fetch('/api/upload', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: img.publicId }),
        })
      } catch {
        // Ignore delete errors
      }
    }
    onChange(images.filter((_, i) => i !== index))
  }

  const moveImage = (from: number, to: number) => {
    const newImages = [...images]
    const [moved] = newImages.splice(from, 1)
    newImages.splice(to, 0, moved)
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      {images.length < maxImages && (
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-sm cursor-pointer transition-colors duration-200 ${
            dragOver
              ? 'border-[#C9A96E] bg-[#C9A96E]/5'
              : 'border-gray-300 hover:border-[#1C3D2E] bg-gray-50 hover:bg-[#1C3D2E]/5'
          }`}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={uploading}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-[#1C3D2E] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-500">Subiendo imágenes...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="text-center">
                <span className="text-sm font-medium text-[#1C3D2E]">Arrastra imágenes aquí</span>
                <span className="text-sm text-gray-500"> o haz clic para seleccionar</span>
              </div>
              <span className="text-xs text-gray-400">
                {images.length}/{maxImages} imágenes · Máx. 10MB por imagen
              </span>
            </div>
          )}
        </label>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img, index) => (
            <div key={img.url} className="relative group aspect-square">
              <Image
                src={img.url}
                alt={`Imagen ${index + 1}`}
                fill
                className="object-cover rounded-sm"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm flex items-center justify-center gap-2">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index - 1)}
                    className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white text-sm"
                    title="Mover izquierda"
                  >
                    ←
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 text-lg leading-none"
                  title="Eliminar"
                >
                  ×
                </button>
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index + 1)}
                    className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white text-sm"
                    title="Mover derecha"
                  >
                    →
                  </button>
                )}
              </div>
              {index === 0 && (
                <div className="absolute top-1 left-1 bg-[#C9A96E] text-[#0F1F18] text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                  PRINCIPAL
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
