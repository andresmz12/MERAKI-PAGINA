export const dynamic = 'force-dynamic'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import AdminSidebar from '@/components/admin/AdminSidebar'
import DeletePropiedadButton from '@/components/admin/DeletePropiedadButton'
import { formatPrice } from '@/lib/utils'

async function getDashboardData() {
  const [propiedades, total, disponibles, vendidos, destacadas] = await Promise.all([
    prisma.propiedad.findMany({ orderBy: { updatedAt: 'desc' } }),
    prisma.propiedad.count(),
    prisma.propiedad.count({ where: { estado: 'disponible' } }),
    prisma.propiedad.count({ where: { estado: { in: ['vendido', 'arrendado'] } } }),
    prisma.propiedad.count({ where: { destacada: true } }),
  ])
  return { propiedades, total, disponibles, vendidos, destacadas }
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const { propiedades, total, disponibles, vendidos, destacadas } = await getDashboardData()

  const estadoColors: Record<string, string> = {
    disponible: 'bg-green-100 text-green-700',
    vendido: 'bg-red-100 text-red-700',
    arrendado: 'bg-orange-100 text-orange-700',
  }

  const stats = [
    { label: 'Total', value: total, icon: '🏠', color: 'bg-[#0A0A0A]' },
    { label: 'Disponibles', value: disponibles, icon: '✅', color: 'bg-emerald-600' },
    { label: 'Vendidas / Arrendadas', value: vendidos, icon: '🔑', color: 'bg-[#C9A84C]' },
    { label: 'Destacadas', value: destacadas, icon: '⭐', color: 'bg-purple-600' },
  ]

  return (
    <div className="flex min-h-screen bg-[#F9F6F0]">
      <AdminSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <p className="font-sans text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase mb-0.5">Panel Administrativo</p>
            <h1 className="font-display text-[#0A0A0A] text-3xl font-light tracking-wide">Dashboard</h1>
          </div>
          <Link
            href="/admin/propiedades/nueva"
            className="font-sans bg-[#C9A84C] text-[#0A0A0A] text-sm font-bold px-6 py-2.5 tracking-widest uppercase hover:bg-[#c9a52f] transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
            </svg>
            Nueva Propiedad
          </Link>
        </header>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white border border-gray-100 shadow-sm p-6 flex items-center gap-4">
                <div className={`${stat.color} w-12 h-12 flex items-center justify-center text-xl flex-shrink-0`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="font-display text-[#0A0A0A] text-3xl font-semibold leading-none">{stat.value}</div>
                  <div className="font-sans text-[#8B8B9E] text-xs mt-1 tracking-wider uppercase">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-display text-[#0A0A0A] text-lg font-semibold">Todas las propiedades</h2>
              <span className="font-sans text-[#8B8B9E] text-sm">{total} registros</span>
            </div>

            {propiedades.length === 0 ? (
              <div className="text-center py-20">
                <div className="font-display text-[#C9A84C] text-6xl mb-4 opacity-30">M</div>
                <p className="font-sans italic text-[#8B8B9E] text-sm mb-6">No hay propiedades aún</p>
                <Link
                  href="/admin/propiedades/nueva"
                  className="font-sans inline-block bg-[#0A0A0A] text-white text-sm px-6 py-3 tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300"
                >
                  Crear primera propiedad
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F9F6F0] border-b border-gray-100">
                    <tr>
                      <th className="font-sans text-left px-6 py-3 text-xs font-semibold text-[#8B8B9E] uppercase tracking-widest">Propiedad</th>
                      <th className="font-sans text-left px-6 py-3 text-xs font-semibold text-[#8B8B9E] uppercase tracking-widest">Tipo / Operación</th>
                      <th className="font-sans text-left px-6 py-3 text-xs font-semibold text-[#8B8B9E] uppercase tracking-widest">Precio</th>
                      <th className="font-sans text-left px-6 py-3 text-xs font-semibold text-[#8B8B9E] uppercase tracking-widest">Estado</th>
                      <th className="font-sans text-right px-6 py-3 text-xs font-semibold text-[#8B8B9E] uppercase tracking-widest">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {propiedades.map((prop) => (
                      <tr key={prop.id} className="hover:bg-[#F9F6F0]/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14 overflow-hidden flex-shrink-0 bg-[#F9F6F0]">
                              {prop.imagenes[0] ? (
                                <Image
                                  src={prop.imagenes[0]}
                                  alt={prop.titulo}
                                  fill
                                  className="object-cover"
                                  sizes="56px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-display text-[#C9A84C] text-xl font-bold opacity-30">M</div>
                              )}
                            </div>
                            <div>
                              <div className="font-sans font-medium text-[#2C2C3E] line-clamp-1 max-w-xs">{prop.titulo}</div>
                              <div className="font-sans text-[#8B8B9E] text-xs mt-0.5">
                                {prop.ciudad}{prop.barrio ? `, ${prop.barrio}` : ''}
                              </div>
                              {prop.destacada && (
                                <span className="font-sans text-[#C9A84C] text-xs font-semibold">★ Destacada</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-sans text-[#2C2C3E] capitalize">{prop.tipo}</div>
                          <div className="font-sans text-[#8B8B9E] text-xs mt-0.5">
                            {prop.operacion === 'venta' ? 'En venta' : 'En arriendo'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-display text-[#0A0A0A] font-semibold">
                            {formatPrice(prop.precio, prop.moneda)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-sans text-xs px-2.5 py-1 font-semibold capitalize ${estadoColors[prop.estado] || 'bg-gray-100 text-gray-700'}`}>
                            {prop.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/propiedades/${prop.slug}`}
                              target="_blank"
                              className="p-2 text-[#8B8B9E] hover:text-[#0A0A0A] transition-colors"
                              title="Ver en sitio"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                              </svg>
                            </Link>
                            <Link
                              href={`/admin/propiedades/${prop.id}/editar`}
                              className="p-2 text-[#8B8B9E] hover:text-[#0A0A0A] transition-colors"
                              title="Editar"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                              </svg>
                            </Link>
                            <DeletePropiedadButton id={prop.id} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

