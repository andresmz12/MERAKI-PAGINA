import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

interface Propiedad {
  id: string
  slug: string
  titulo: string
  precio: number
  moneda: string
  tipo: string
  operacion: string
  estado: string
  ciudad: string
  barrio?: string | null
  area?: number | null
  habitaciones?: number | null
  banos?: number | null
  imagenes: string[]
  destacada: boolean
}

interface PropertyCardProps {
  propiedad: Propiedad
}

export default function PropertyCard({ propiedad }: PropertyCardProps) {
  const mainImage = propiedad.imagenes[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'

  const estadoColors = {
    disponible: 'bg-green-500',
    vendido: 'bg-red-500',
    arrendado: 'bg-orange-500',
  }

  const operacionLabels = {
    venta: 'Venta',
    arriendo: 'Arriendo',
  }

  return (
    <Link href={`/propiedades/${propiedad.slug}`} className="group block">
      <div className="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={mainImage}
            alt={propiedad.titulo}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-[#0F1F18]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white bg-[#C9A96E] px-6 py-2 text-sm tracking-widest uppercase font-semibold">
              Ver más
            </span>
          </div>
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`${estadoColors[propiedad.estado as keyof typeof estadoColors] || 'bg-gray-500'} text-white text-xs px-2.5 py-1 rounded-sm font-medium capitalize`}>
              {propiedad.estado}
            </span>
            <span className="bg-[#1C3D2E] text-white text-xs px-2.5 py-1 rounded-sm font-medium">
              {operacionLabels[propiedad.operacion as keyof typeof operacionLabels] || propiedad.operacion}
            </span>
          </div>
          {propiedad.destacada && (
            <div className="absolute top-3 right-3">
              <span className="bg-[#C9A96E] text-[#0F1F18] text-xs px-2.5 py-1 font-semibold tracking-wider uppercase">
                Destacada
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="text-xs text-[#C9A96E] tracking-wider uppercase mb-1.5 font-medium capitalize">
            {propiedad.tipo} · {propiedad.ciudad}{propiedad.barrio ? `, ${propiedad.barrio}` : ''}
          </div>
          <h3 className="font-display text-[#1C3D2E] text-lg font-bold leading-tight mb-3 line-clamp-2">
            {propiedad.titulo}
          </h3>
          <div className="text-[#1C3D2E] font-bold text-xl mb-4">
            {formatPrice(propiedad.precio, propiedad.moneda)}
            {propiedad.operacion === 'arriendo' && (
              <span className="text-sm font-normal text-gray-500">/mes</span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
            {propiedad.habitaciones && (
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>{propiedad.habitaciones}</span>
              </div>
            )}
            {propiedad.banos && (
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                <span>{propiedad.banos}</span>
              </div>
            )}
            {propiedad.area && (
              <div className="flex items-center gap-1.5 ml-auto">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>{propiedad.area} m²</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
