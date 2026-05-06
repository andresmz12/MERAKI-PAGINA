import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PropertyGallery from '@/components/public/PropertyGallery'
import WhatsAppButton from '@/components/public/WhatsAppButton'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

async function getPropiedad(slug: string) {
  return prisma.propiedad.findUnique({ where: { slug } })
}

async function getSimilares(tipo: string, id: string) {
  return prisma.propiedad.findMany({
    where: { tipo, estado: 'disponible', id: { not: id } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const prop = await getPropiedad(params.slug)
  if (!prop) return { title: 'Propiedad no encontrada' }

  const description = prop.descripcion.slice(0, 155) + (prop.descripcion.length > 155 ? '...' : '')
  const images = prop.imagenes[0] ? [{ url: prop.imagenes[0], width: 1200, height: 630, alt: prop.titulo }] : []

  return {
    title: prop.titulo,
    description,
    openGraph: {
      title: `${prop.titulo} | Meraki Real Estate`,
      description,
      type: 'website',
      locale: 'es_CO',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: prop.titulo,
      description,
      images: prop.imagenes[0] ? [prop.imagenes[0]] : [],
    },
  }
}

export default async function PropiedadDetailPage({ params }: Props) {
  const prop = await getPropiedad(params.slug)
  if (!prop) notFound()

  const similares = await getSimilares(prop.tipo, prop.id)

  const stats = [
    prop.habitaciones && { icon: '🛏', label: 'Habitaciones', value: prop.habitaciones },
    prop.banos && { icon: '🚿', label: 'Baños', value: prop.banos },
    prop.garajes && { icon: '🚗', label: 'Garajes', value: prop.garajes },
    prop.area && { icon: '📐', label: 'Área', value: `${prop.area} m²` },
    prop.estrato && { icon: '⭐', label: 'Estrato', value: prop.estrato },
    prop.piso && { icon: '🏢', label: 'Piso', value: prop.piso },
  ].filter(Boolean)

  const waMessage = encodeURIComponent(
    `Hola, me interesa la propiedad: ${prop.titulo}. ¿Podría darme más información?`
  )

  const BASE_URL = process.env.NEXTAUTH_URL || 'https://meraki-pagina-production.up.railway.app'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: prop.titulo,
    description: prop.descripcion,
    url: `${BASE_URL}/propiedades/${prop.slug}`,
    image: prop.imagenes,
    offers: {
      '@type': 'Offer',
      price: prop.precio,
      priceCurrency: prop.moneda,
      availability: prop.estado === 'disponible'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: prop.ciudad,
      addressCountry: 'CO',
      ...(prop.barrio && { addressRegion: prop.barrio }),
    },
    ...(prop.area && { floorSize: { '@type': 'QuantitativeValue', value: prop.area, unitCode: 'MTK' } }),
    ...(prop.habitaciones && { numberOfRooms: prop.habitaciones }),
  }

  return (
    <div className="bg-[#F9F6F0] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <div
        className="pt-24 pb-6 px-4"
        style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 font-sans text-sm text-white/50">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/propiedades" className="hover:text-[#C9A84C] transition-colors">Propiedades</Link>
            <span>/</span>
            <span className="text-white/80 truncate max-w-xs">{prop.titulo}</span>
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

          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`font-sans text-xs font-bold px-3 py-1.5 tracking-wider ${
                  prop.estado === 'disponible' ? 'bg-green-100 text-green-700' :
                  prop.estado === 'vendido' ? 'bg-red-100 text-red-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {prop.estado.charAt(0).toUpperCase() + prop.estado.slice(1)}
                </span>
                <span className="font-sans bg-[#C9A84C] text-[#0A0A0A] text-xs font-bold px-3 py-1.5 tracking-wider">
                  {prop.operacion === 'venta' ? 'En Venta' : 'En Arriendo'}
                </span>
                <span className="font-sans bg-[#0A0A0A]/10 text-[#0A0A0A] text-xs font-semibold px-3 py-1.5 capitalize">
                  {prop.tipo}
                </span>
              </div>

              <h1 className="font-display text-[#0A0A0A] font-semibold mb-3" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                {prop.titulo}
              </h1>

              <p className="font-sans text-[#8B8B9E] text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-[#C9A84C] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {prop.ciudad}{prop.barrio ? `, ${prop.barrio}` : ''}{prop.direccion ? ` — ${prop.direccion}` : ''}
              </p>
            </div>

            {/* Stats grid */}
            {stats.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {stats.map((stat) => stat && (
                  <div key={stat.label} className="bg-white p-4 text-center shadow-sm border-b-2 border-[#C9A84C]">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="font-display text-[#0A0A0A] text-lg font-semibold leading-tight">{stat.value}</div>
                    <div className="font-sans text-[#8B8B9E] text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="bg-white p-8 shadow-sm">
              <h2 className="font-display text-[#0A0A0A] text-2xl font-semibold mb-1">Descripción</h2>
              <div className="w-8 h-0.5 bg-[#C9A84C] mb-5" />
              <p className="font-sans text-[#8B8B9E] leading-relaxed whitespace-pre-line text-sm">
                {prop.descripcion}
              </p>
            </div>

            {/* Features */}
            {prop.caracteristicas.length > 0 && (
              <div className="bg-white p-8 shadow-sm">
                <h2 className="font-display text-[#0A0A0A] text-2xl font-semibold mb-1">Características</h2>
                <div className="w-8 h-0.5 bg-[#C9A84C] mb-5" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {prop.caracteristicas.map((c) => (
                    <div key={c} className="flex items-center gap-2.5 font-sans text-sm text-[#2C2C3E]">
                      <div className="w-5 h-5 bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
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
          <div className="space-y-4">
            <div className="bg-[#0A0A0A] p-8 sticky top-24">
              <p className="font-sans text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-2">
                {prop.operacion === 'venta' ? 'Precio de venta' : 'Canon mensual'}
              </p>
              <div className="font-display text-white text-3xl font-semibold mb-1">
                {formatPrice(prop.precio, prop.moneda)}
              </div>
              {prop.operacion === 'arriendo' && (
                <div className="font-sans text-white/40 text-sm mb-6">/mes</div>
              )}

              <div className="border-t border-white/10 mt-6 pt-6 space-y-3">
                <a
                  href={`https://wa.me/573147559119?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full font-sans bg-[#C9A84C] text-[#0A0A0A] py-3.5 text-sm font-bold tracking-widest uppercase text-center flex items-center justify-center gap-2 hover:bg-[#c9a52f] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Agendar Visita
                </a>
                <a
                  href="tel:+573147559119"
                  className="w-full font-sans border border-white/20 text-white py-3.5 text-sm font-semibold tracking-widest uppercase text-center flex items-center justify-center gap-2 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Llamar Ahora
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similares */}
        {similares.length > 0 && (
          <div className="mt-20">
            <div className="flex flex-col items-center mb-10 text-center">
              <div className="w-10 h-0.5 bg-[#C9A84C] mb-4" />
              <h2 className="font-display text-[#0A0A0A] text-3xl font-light">
                Propiedades <span className="font-semibold">Similares</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similares.map((prop) => (
                <div key={prop.id}>
                  {/* Using inline import to avoid circular — just render a card */}
                  <Link href={`/propiedades/${prop.slug}`} className="group block bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {prop.imagenes[0] && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={prop.imagenes[0]}
                          alt={prop.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="font-display text-[#C9A84C] text-xl font-semibold mb-1">
                        {formatPrice(prop.precio, prop.moneda)}
                      </p>
                      <p className="font-sans text-[#2C2C3E] text-sm font-medium line-clamp-2">{prop.titulo}</p>
                      <p className="font-sans text-[#8B8B9E] text-xs mt-1">{prop.ciudad}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <WhatsAppButton />
    </div>
  )
}
