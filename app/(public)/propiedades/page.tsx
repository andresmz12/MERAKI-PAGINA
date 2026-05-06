import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import PropertyCard from '@/components/public/PropertyCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface SearchParams {
  tipo?: string
  operacion?: string
  ciudad?: string
  precioMin?: string
  precioMax?: string
  page?: string
}

async function getPropiedades(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || '1')
  const limit = 9
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = { estado: 'disponible' }
  if (searchParams.tipo) where.tipo = searchParams.tipo
  if (searchParams.operacion) where.operacion = searchParams.operacion
  if (searchParams.ciudad) where.ciudad = { contains: searchParams.ciudad, mode: 'insensitive' }
  if (searchParams.precioMin || searchParams.precioMax) {
    where.precio = {}
    if (searchParams.precioMin) (where.precio as Record<string, number>).gte = parseFloat(searchParams.precioMin)
    if (searchParams.precioMax) (where.precio as Record<string, number>).lte = parseFloat(searchParams.precioMax)
  }

  const [propiedades, total] = await Promise.all([
    prisma.propiedad.findMany({
      where,
      orderBy: [{ destacada: 'desc' }, { createdAt: 'desc' }],
      skip,
      take: limit,
    }),
    prisma.propiedad.count({ where }),
  ])

  return { propiedades, total, pages: Math.ceil(total / limit), page }
}

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { propiedades, total, pages, page } = await getPropiedades(searchParams)

  const buildUrl = (newParams: Record<string, string>) => {
    const params = new URLSearchParams()
    const merged = { ...searchParams, ...newParams }
    Object.entries(merged).forEach(([k, v]) => { if (v) params.set(k, v) })
    return `/propiedades?${params.toString()}`
  }

  const TIPOS = ['apartamento', 'casa', 'lote', 'local', 'finca', 'oficina']
  const CIUDADES = ['Medellín', 'Bogotá', 'Cali', 'Cartagena', 'Santa Marta', 'Barranquilla']

  return (
    <div className="bg-[#F7F3EC] min-h-screen">
      {/* Header */}
      <div className="bg-[#1C3D2E] pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-3">Nuestro portafolio</p>
          <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">
            Propiedades
          </h1>
          <p className="text-white/60 text-lg">
            {total} propiedad{total !== 1 ? 'es' : ''} disponible{total !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters */}
        <form method="GET" action="/propiedades" className="bg-white shadow-md rounded-sm p-5 mb-10 grid grid-cols-2 md:grid-cols-5 gap-3">
          <select
            name="tipo"
            defaultValue={searchParams.tipo || ''}
            className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#1C3D2E]"
          >
            <option value="">Todos los tipos</option>
            {TIPOS.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
          <select
            name="operacion"
            defaultValue={searchParams.operacion || ''}
            className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#1C3D2E]"
          >
            <option value="">Venta y Arriendo</option>
            <option value="venta">Venta</option>
            <option value="arriendo">Arriendo</option>
          </select>
          <select
            name="ciudad"
            defaultValue={searchParams.ciudad || ''}
            className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#1C3D2E]"
          >
            <option value="">Todas las ciudades</option>
            {CIUDADES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="number"
            name="precioMin"
            defaultValue={searchParams.precioMin || ''}
            placeholder="Precio mín."
            className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#1C3D2E]"
          />
          <button
            type="submit"
            className="bg-[#1C3D2E] text-white text-sm font-semibold px-4 py-2.5 rounded-sm hover:bg-[#C9A96E] hover:text-[#0F1F18] transition-colors"
          >
            Filtrar
          </button>
        </form>

        {/* Active filters */}
        {(searchParams.tipo || searchParams.operacion || searchParams.ciudad) && (
          <div className="flex flex-wrap gap-2 mb-8">
            {searchParams.tipo && (
              <span className="bg-[#1C3D2E]/10 text-[#1C3D2E] text-xs px-3 py-1.5 rounded-sm capitalize">
                {searchParams.tipo}
              </span>
            )}
            {searchParams.operacion && (
              <span className="bg-[#1C3D2E]/10 text-[#1C3D2E] text-xs px-3 py-1.5 rounded-sm capitalize">
                {searchParams.operacion}
              </span>
            )}
            {searchParams.ciudad && (
              <span className="bg-[#1C3D2E]/10 text-[#1C3D2E] text-xs px-3 py-1.5 rounded-sm">
                {searchParams.ciudad}
              </span>
            )}
            <Link href="/propiedades" className="text-red-500 text-xs px-3 py-1.5 underline">
              Limpiar filtros
            </Link>
          </div>
        )}

        {/* Grid */}
        {propiedades.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {propiedades.map((prop) => (
                <PropertyCard key={prop.id} propiedad={prop} />
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {page > 1 && (
                  <Link href={buildUrl({ page: String(page - 1) })} className="px-4 py-2 border border-[#1C3D2E] text-[#1C3D2E] text-sm hover:bg-[#1C3D2E] hover:text-white transition-colors rounded-sm">
                    Anterior
                  </Link>
                )}
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={buildUrl({ page: String(p) })}
                    className={`w-10 h-10 flex items-center justify-center text-sm rounded-sm transition-colors ${
                      p === page
                        ? 'bg-[#1C3D2E] text-white'
                        : 'border border-gray-300 text-gray-600 hover:border-[#1C3D2E] hover:text-[#1C3D2E]'
                    }`}
                  >
                    {p}
                  </Link>
                ))}
                {page < pages && (
                  <Link href={buildUrl({ page: String(page + 1) })} className="px-4 py-2 border border-[#1C3D2E] text-[#1C3D2E] text-sm hover:bg-[#1C3D2E] hover:text-white transition-colors rounded-sm">
                    Siguiente
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="font-display text-2xl text-[#1C3D2E] font-bold mb-3">No encontramos propiedades</h3>
            <p className="text-gray-500 mb-8">Intenta con otros filtros o explora todo nuestro portafolio.</p>
            <Link href="/propiedades" className="inline-block bg-[#1C3D2E] text-white px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-[#C9A96E] hover:text-[#0F1F18] transition-colors">
              Ver todas las propiedades
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
