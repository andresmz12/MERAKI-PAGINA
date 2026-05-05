'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from './ImageUploader'

interface UploadedImage {
  url: string
  publicId: string
}

interface PropiedadFormData {
  titulo: string
  descripcion: string
  precio: string
  moneda: string
  tipo: string
  operacion: string
  estado: string
  ciudad: string
  barrio: string
  direccion: string
  area: string
  habitaciones: string
  banos: string
  garajes: string
  estrato: string
  piso: string
  destacada: boolean
  caracteristicas: string
  imagenes: UploadedImage[]
}

interface PropertyFormProps {
  initialData?: Partial<PropiedadFormData> & { id?: string }
  mode: 'create' | 'edit'
}

const TIPOS = ['apartamento', 'casa', 'lote', 'local', 'finca', 'oficina']
const CIUDADES = ['Medellín', 'Bogotá', 'Cali', 'Cartagena', 'Barranquilla', 'Santa Marta', 'Bucaramanga', 'Pereira']

export default function PropertyForm({ initialData, mode }: PropertyFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<PropiedadFormData>({
    titulo: initialData?.titulo || '',
    descripcion: initialData?.descripcion || '',
    precio: initialData?.precio || '',
    moneda: initialData?.moneda || 'COP',
    tipo: initialData?.tipo || 'apartamento',
    operacion: initialData?.operacion || 'venta',
    estado: initialData?.estado || 'disponible',
    ciudad: initialData?.ciudad || 'Medellín',
    barrio: initialData?.barrio || '',
    direccion: initialData?.direccion || '',
    area: initialData?.area || '',
    habitaciones: initialData?.habitaciones || '',
    banos: initialData?.banos || '',
    garajes: initialData?.garajes || '',
    estrato: initialData?.estrato || '',
    piso: initialData?.piso || '',
    destacada: initialData?.destacada || false,
    caracteristicas: initialData?.caracteristicas || '',
    imagenes: initialData?.imagenes || [],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const payload = {
        ...formData,
        caracteristicas: formData.caracteristicas
          ? formData.caracteristicas.split(',').map(c => c.trim()).filter(Boolean)
          : [],
        imagenes: formData.imagenes.map(i => i.url),
        imagenesPublicIds: formData.imagenes.map(i => i.publicId),
      }

      const url = mode === 'create' ? '/api/propiedades' : `/api/propiedades/${initialData?.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al guardar')
      }

      router.push('/admin/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1C3D2E] focus:ring-1 focus:ring-[#1C3D2E] bg-white transition-colors"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5"
  const selectClass = inputClass

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
          {error}
        </div>
      )}

      {/* Basic info */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-[#1C3D2E] mb-5 pb-3 border-b border-gray-100">
          Información básica
        </h2>
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Título *</label>
            <input type="text" name="titulo" required value={formData.titulo} onChange={handleChange} className={inputClass} placeholder="Ej: Apartamento Moderno en El Poblado" />
          </div>
          <div>
            <label className={labelClass}>Descripción *</label>
            <textarea name="descripcion" required rows={5} value={formData.descripcion} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Descripción detallada de la propiedad..." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Tipo *</label>
              <select name="tipo" value={formData.tipo} onChange={handleChange} className={selectClass}>
                {TIPOS.map(t => <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Operación *</label>
              <select name="operacion" value={formData.operacion} onChange={handleChange} className={selectClass}>
                <option value="venta">Venta</option>
                <option value="arriendo">Arriendo</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Estado</label>
              <select name="estado" value={formData.estado} onChange={handleChange} className={selectClass}>
                <option value="disponible">Disponible</option>
                <option value="vendido">Vendido</option>
                <option value="arrendado">Arrendado</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-[#1C3D2E] mb-5 pb-3 border-b border-gray-100">Precio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Precio *</label>
            <input type="number" name="precio" required min="0" value={formData.precio} onChange={handleChange} className={inputClass} placeholder="450000000" />
          </div>
          <div>
            <label className={labelClass}>Moneda</label>
            <select name="moneda" value={formData.moneda} onChange={handleChange} className={selectClass}>
              <option value="COP">COP (Pesos colombianos)</option>
              <option value="USD">USD (Dólares)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-[#1C3D2E] mb-5 pb-3 border-b border-gray-100">Ubicación</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Ciudad *</label>
            <select name="ciudad" value={formData.ciudad} onChange={handleChange} className={selectClass}>
              {CIUDADES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Barrio</label>
            <input type="text" name="barrio" value={formData.barrio} onChange={handleChange} className={inputClass} placeholder="El Poblado, Laureles..." />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Dirección</label>
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className={inputClass} placeholder="Calle 10 #43A-50" />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-[#1C3D2E] mb-5 pb-3 border-b border-gray-100">Detalles</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Área (m²)</label>
            <input type="number" name="area" min="0" value={formData.area} onChange={handleChange} className={inputClass} placeholder="120" />
          </div>
          <div>
            <label className={labelClass}>Habitaciones</label>
            <input type="number" name="habitaciones" min="0" value={formData.habitaciones} onChange={handleChange} className={inputClass} placeholder="3" />
          </div>
          <div>
            <label className={labelClass}>Baños</label>
            <input type="number" name="banos" min="0" value={formData.banos} onChange={handleChange} className={inputClass} placeholder="2" />
          </div>
          <div>
            <label className={labelClass}>Garajes</label>
            <input type="number" name="garajes" min="0" value={formData.garajes} onChange={handleChange} className={inputClass} placeholder="1" />
          </div>
          <div>
            <label className={labelClass}>Estrato</label>
            <input type="number" name="estrato" min="1" max="6" value={formData.estrato} onChange={handleChange} className={inputClass} placeholder="5" />
          </div>
          <div>
            <label className={labelClass}>Piso</label>
            <input type="number" name="piso" min="1" value={formData.piso} onChange={handleChange} className={inputClass} placeholder="10" />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelClass}>Características (separadas por coma)</label>
          <input
            type="text"
            name="caracteristicas"
            value={formData.caracteristicas}
            onChange={handleChange}
            className={inputClass}
            placeholder="Piscina, Gimnasio, Vigilancia 24h, Terraza"
          />
          <p className="text-xs text-gray-400 mt-1">Ej: Piscina, Gimnasio, Vigilancia 24h, Parqueadero</p>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                name="destacada"
                checked={formData.destacada}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${formData.destacada ? 'bg-[#1C3D2E]' : 'bg-gray-200'}`} />
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${formData.destacada ? 'translate-x-7' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm font-medium text-gray-700">Marcar como propiedad destacada</span>
          </label>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-sm border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-[#1C3D2E] mb-2 pb-3 border-b border-gray-100">
          Imágenes ({formData.imagenes.length}/10)
        </h2>
        <p className="text-xs text-gray-400 mb-4">La primera imagen será la imagen principal. Puedes reordenar usando las flechas.</p>
        <ImageUploader
          images={formData.imagenes}
          onChange={(imgs) => setFormData(prev => ({ ...prev, imagenes: imgs }))}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm rounded-sm hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-2.5 bg-[#1C3D2E] text-white text-sm font-semibold rounded-sm hover:bg-[#C9A96E] hover:text-[#0F1F18] transition-colors duration-200 disabled:opacity-50"
        >
          {saving ? 'Guardando...' : mode === 'create' ? 'Crear propiedad' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  )
}
