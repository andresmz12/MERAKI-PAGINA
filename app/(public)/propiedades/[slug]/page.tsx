import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PropertyGallery from '@/components/public/PropertyGallery'
import ContactForm from '@/components/public/ContactForm'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

async function getPropiedad(slug: string) {
  return prisma.propiedad.findUnique({ where: { slug } })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const prop = await getPropiedad(params.slug)
  if (!prop) return { title: 'Propiedad no encontrada' }
  return {
    title: `${prop.titulo} | Meraki Real Estate`,
    description: prop.descripcion.slice(0, 160),
    openGraph: {
      images: prop.imagenes[0] ? [{ url: prop.imagenes[0] }] : [],
    },
  }
}

export default async function PropiedadDetailPage({ params }: Props) {
  const prop = await getPropiedad(params.slug)
  if (!prop) notFound()

  const stats = [
    prop.habitaciones && { icon: '🛏', label: 'Habitaciones', value: prop.habitaciones },
    prop.banos && { icon: '🚿', label: 'Baños', value: prop.banos },
    prop.garajes && { icon: '🚗', label: 'Garajes', value: prop.garajes },
    prop.area && { icon: '📐', label: 'Área', value: `${prop.area} m²` },
    prop.estrato && { icon: '⭐', label: 'Estrato', value: prop.estrato },
    prop.piso && { icon: '🏢', label: 'Piso', value: prop.piso },
  ].filter(Boolean)

  return (
    <div className="bg-[#F7F3EC] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#1C3D2E] pt-24 pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-[#C9A96E] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/propiedades" className="hover:text-[#C9A96E] transition-colors">Propiedades</Link>
            <span>/</span>
            <span className="text-white truncate max-w-xs">{prop.titulo}</span>
          </nav>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <PropertyGallery imagenes={prop.imagenes} titulo={prop.titulo} />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs font-medium px-3 py-1 rounded-sm ${
                  prop.estado === 'disponible' ? 'bg-green-100 text-green-700' :
                  prop.estado === 'vendido' ? 'bg-red-100 text-red-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {prop.estado.charAt(0).toUpperCase() + prop.estado.slice(1)}
                </span>
                <span className="bg-[#1C3D2E]/10 text-[#1C3D2E] text-xs font-medium px-3 py-1 rounded-sm capitalize">
                  {prop.operacion === 'venta' ? 'En Venta' : 'En Arriendo'}
                </span>
                <span className="bg-[#C9A96E]/20 text-[#1C3D2E] text-xs font-medium px-3 py-1 rounded-sm capitalize">
                  {prop.tipo}
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl text-[#1C3D2E] font-bold mb-3">
                {prop.titulo}
              </h1>
              <p className="text-gray-500 flex items-center gap-2">
                <span>📍</span>
                <span>{prop.ciudad}{prop.barrio ? `, ${prop.barrio}` : ''}{prop.direccion ? ` · ${prop.direccion}` : ''}</span>
              </p>
            </div>

            {/* Stats */}
            {stats.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {stats.map((stat) => stat && (
                  <div key={stat.label} className="bg-white rounded-sm p-4 text-center shadow-sm">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="font-bold text-[#1C3D2E] text-lg leading-tight">{stat.value}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-sm p-6 shadow-sm">
              <h2 className="font-display text-2xl text-[#1C3D2E] font-bold mb-4">Descripción</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{prop.descripcion}</p>
            </div>

            {/* Features */}
            {prop.caracteristicas.length > 0 && (
              <div className="bg-white rounded-sm p-6 shadow-sm">
                <h2 className="font-display text-2xl text-[#1C3D2E] font-bold mb-4">Características</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {prop.caracteristicas.map((c) => (
                    <div key={c} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 bg-[#1C3D2E] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price card */}
            <div className="bg-[#1C3D2E] rounded-sm p-6 text-white sticky top-24">
              <div className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-2">
                {prop.operacion === 'venta' ? 'Precio de venta' : 'Canon mensual'}
              </div>
              <div className="font-display text-3xl font-bold mb-1">
                {formatPrice(prop.precio, prop.moneda)}
              </div>
              {prop.operacion === 'arriendo' && (
                <div className="text-white/50 text-sm">/mes</div>
              )}
              <div className="border-t border-white/10 mt-6 pt-6">
                <h3 className="font-semibold mb-4 text-sm tracking-wide uppercase">¿Te interesa esta propiedad?</h3>
                <ContactForm propiedadTitulo={prop.titulo} />
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/573001234567?text=Hola, me interesa la propiedad: ${encodeURIComponent(prop.titulo)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 text-white py-4 rounded-sm font-semibold hover:bg-green-600 transition-colors"
            >
              <span className="text-2xl">💬</span>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
