import { prisma } from '@/lib/prisma'
import PropertyCard from '@/components/public/PropertyCard'
import WhatsAppButton from '@/components/public/WhatsAppButton'
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

const TIPOS = ['apartamento', 'casa', 'lote', 'local', 'finca', 'oficina']
const CIUDADES = ['Medellín', 'Bogotá', 'Cali', 'Cartagena', 'Santa Marta', 'Barranquilla']

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

export default async function PropiedadesPage({ searchParams }: { searchParams: SearchParams }) {
  const { propiedades, total, pages, page } = await getPropiedades(searchParams)

  const buildUrl = (newParams: Record<string, string>) => {
    const params = new URLSearchParams()
    const merged = { ...searchParams, ...newParams }
    Object.entries(merged).forEach(([k, v]) => { if (v) params.set(k, v) })
    return `/propiedades?${params.toString()}`
  }

  const hasFilters = searchParams.tipo || searchParams.operacion || searchParams.ciudad || searchParams.precioMin

  return (
    <div className="bg-[#F9F6F0] min-h-screen">
      {/* Hero header */}
      <div
        className="pt-32 pb-20 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D4E 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="font-sans text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-4">
            NUESTRO PORTAFOLIO
          </p>
          <h1 className="font-display text-white font-light mb-3" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Nuestras <span className="font-semibold">Propiedades</span>
          </h1>
          <p className="font-sans text-white/50 text-base">
            {total} propiedad{total !== 1 ? 'es' : ''} disponible{total !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white shadow-sm sticky top-24 p-6">
              <h2 className="font-display text-[#1A1A2E] text-xl font-semibold mb-1">Filtros</h2>
              <div className="w-8 h-0.5 bg-[#D4AF37] mb-6" />

              <form method="GET" action="/propiedades" className="space-y-5">
                <div>
                  <label className="font-sans text-xs text-[#8B8B9E] tracking-wider uppercase block mb-2">Operación</label>
                  <select
                    name="operacion"
                    defaultValue={searchParams.operacion || ''}
                    className="w-full font-sans border border-[#E8E0D0] px-3 py-2.5 text-sm text-[#2C2C3E] focus:outline-none focus:border-[#D4AF37] transition-colors bg-transparent"
                  >
                    <option value="">Todas</option>
                    <option value="venta">Venta</option>
                    <option value="arriendo">Arriendo</option>
                  </select>
                </div>

                <div>
                  <label className="font-sans text-xs text-[#8B8B9E] tracking-wider uppercase block mb-2">Tipo</label>
                  <select
                    name="tipo"
                    defaultValue={searchParams.tipo || ''}
                    className="w-full font-sans border border-[#E8E0D0] px-3 py-2.5 text-sm text-[#2C2C3E] focus:outline-none focus:border-[#D4AF37] transition-colors bg-transparent"
                  >
                    <option value="">Todos</option>
                    {TIPOS.map((t) => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-sans text-xs text-[#8B8B9E] tracking-wider uppercase block mb-2">Ciudad</label>
                  <select
                    name="ciudad"
                    defaultValue={searchParams.ciudad || ''}
                    className="w-full font-sans border border-[#E8E0D0] px-3 py-2.5 text-sm text-[#2C2C3E] focus:outline-none focus:border-[#D4AF37] transition-colors bg-transparent"
                  >
                    <option value="">Todas</option>
                    {CIUDADES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-sans text-xs text-[#8B8B9E] tracking-wider uppercase block mb-2">Precio mínimo</label>
                  <input
                    type="number"
                    name="precioMin"
                    defaultValue={searchParams.precioMin || ''}
                    placeholder="Ej: 200000000"
                    className="w-full font-sans border border-[#E8E0D0] px-3 py-2.5 text-sm text-[#2C2C3E] focus:outline-none focus:border-[#D4AF37] transition-colors bg-transparent placeholder-[#8B8B9E]"
                  />
                </div>

                <div>
                  <label className="font-sans text-xs text-[#8B8B9E] tracking-wider uppercase block mb-2">Precio máximo</label>
                  <input
                    type="number"
                    name="precioMax"
                    defaultValue={searchParams.precioMax || ''}
                    placeholder="Ej: 800000000"
                    className="w-full font-sans border border-[#E8E0D0] px-3 py-2.5 text-sm text-[#2C2C3E] focus:outline-none focus:border-[#D4AF37] transition-colors bg-transparent placeholder-[#8B8B9E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-sans bg-[#1A1A2E] text-white text-sm font-semibold py-3 tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#1A1A2E] transition-all duration-300"
                >
                  Filtrar
                </button>

                {hasFilters && (
                  <Link
                    href="/propiedades"
                    className="w-full font-sans border border-[#E8E0D0] text-[#8B8B9E] text-sm py-2.5 tracking-wider uppercase text-center block hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                  >
                    Limpiar filtros
                  </Link>
                )}
              </form>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {/* Active filters */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchParams.operacion && (
                  <span className="font-sans bg-[#1A1A2E] text-white text-xs px-3 py-1.5 capitalize">
                    {searchParams.operacion}
                  </span>
                )}
                {searchParams.tipo && (
                  <span className="font-sans bg-[#1A1A2E] text-white text-xs px-3 py-1.5 capitalize">
                    {searchParams.tipo}
                  </span>
                )}
                {searchParams.ciudad && (
                  <span className="font-sans bg-[#1A1A2E] text-white text-xs px-3 py-1.5">
                    {searchParams.ciudad}
                  </span>
                )}
              </div>
            )}

            <p className="font-sans text-[#8B8B9E] text-sm mb-6">
              Mostrando {propiedades.length} de {total} propiedades
            </p>

            {propiedades.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {propiedades.map((prop) => (
                    <PropertyCard key={prop.id} propiedad={prop} />
                  ))}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    {page > 1 && (
                      <Link
                        href={buildUrl({ page: String(page - 1) })}
                        className="font-sans px-5 py-2.5 border border-[#1A1A2E] text-[#1A1A2E] text-sm tracking-wider uppercase hover:bg-[#1A1A2E] hover:text-white transition-colors"
                      >
                        ← Anterior
                      </Link>
                    )}
                    {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={buildUrl({ page: String(p) })}
                        className={`font-sans w-10 h-10 flex items-center justify-center text-sm transition-colors ${
                          p === page
                            ? 'bg-[#1A1A2E] text-white'
                            : 'border border-[#E8E0D0] text-[#8B8B9E] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                        }`}
                      >
                        {p}
                      </Link>
                    ))}
                    {page < pages && (
                      <Link
                        href={buildUrl({ page: String(page + 1) })}
                        className="font-sans px-5 py-2.5 border border-[#1A1A2E] text-[#1A1A2E] text-sm tracking-wider uppercase hover:bg-[#1A1A2E] hover:text-white transition-colors"
                      >
                        Siguiente →
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24">
                <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mb-8" />
                <h3 className="font-display text-[#1A1A2E] text-3xl font-light mb-4">
                  Sin resultados
                </h3>
                <p className="font-sans text-[#8B8B9E] text-sm mb-8 max-w-sm mx-auto">
                  No encontramos propiedades con esos filtros. Intenta con otras opciones.
                </p>
                <Link
                  href="/propiedades"
                  className="font-sans inline-block bg-[#1A1A2E] text-white px-8 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-[#1A1A2E] transition-all duration-300"
                >
                  Ver todas las propiedades
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  )
}
