import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { formatPrice } from '@/lib/utils'

async function getDashboardData() {
  const [propiedades, total, disponibles, vendidos] = await Promise.all([
    prisma.propiedad.findMany({
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.propiedad.count(),
    prisma.propiedad.count({ where: { estado: 'disponible' } }),
    prisma.propiedad.count({ where: { estado: { in: ['vendido', 'arrendado'] } } }),
  ])
  return { propiedades, total, disponibles, vendidos }
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const { propiedades, total, disponibles, vendidos } = await getDashboardData()

  const estadoColors: Record<string, string> = {
    disponible: 'bg-green-100 text-green-700',
    vendido: 'bg-red-100 text-red-700',
    arrendado: 'bg-orange-100 text-orange-700',
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="font-display text-2xl text-[#1C3D2E] font-bold">Dashboard</h1>
            <p className="text-gray-500 text-sm">Bienvenido, {session.user?.name}</p>
          </div>
          <Link
            href="/admin/propiedades/nueva"
            className="bg-[#1C3D2E] text-white text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-[#C9A96E] hover:text-[#0F1F18] transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva propiedad
          </Link>
        </header>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Total propiedades', value: total, icon: '🏠', color: 'bg-[#1C3D2E]' },
              { label: 'Disponibles', value: disponibles, icon: '✅', color: 'bg-green-600' },
              { label: 'Vendidas / Arrendadas', value: vendidos, icon: '🔑', color: 'bg-[#C9A96E]' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-sm border border-gray-200 p-6 flex items-center gap-4">
                <div className={`${stat.color} w-12 h-12 rounded-sm flex items-center justify-center text-2xl flex-shrink-0`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#1C3D2E]">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-[#1C3D2E]">Todas las propiedades</h2>
              <span className="text-gray-400 text-sm">{total} registros</span>
            </div>

            {propiedades.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🏠</div>
                <p className="text-gray-500 mb-4">No hay propiedades aún</p>
                <Link href="/admin/propiedades/nueva" className="inline-block bg-[#1C3D2E] text-white text-sm px-6 py-2.5 rounded-sm hover:bg-[#C9A96E] hover:text-[#0F1F18] transition-colors">
                  Crear primera propiedad
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Propiedad</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipo / Operación</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Precio</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {propiedades.map((prop) => (
                      <tr key={prop.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14 rounded-sm overflow-hidden flex-shrink-0 bg-gray-100">
                              {prop.imagenes[0] ? (
                                <Image
                                  src={prop.imagenes[0]}
                                  alt={prop.titulo}
                                  fill
                                  className="object-cover"
                                  sizes="56px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">🏠</div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 line-clamp-1 max-w-xs">{prop.titulo}</div>
                              <div className="text-gray-400 text-xs mt-0.5">{prop.ciudad}{prop.barrio ? `, ${prop.barrio}` : ''}</div>
                              {prop.destacada && (
                                <span className="text-[#C9A96E] text-xs font-semibold">★ Destacada</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 capitalize">
                          {prop.tipo}
                          <br />
                          <span className="text-xs text-gray-400">{prop.operacion === 'venta' ? 'En venta' : 'En arriendo'}</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#1C3D2E]">
                          {formatPrice(prop.precio, prop.moneda)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2.5 py-1 rounded-sm font-medium capitalize ${estadoColors[prop.estado] || 'bg-gray-100 text-gray-700'}`}>
                            {prop.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/propiedades/${prop.slug}`}
                              target="_blank"
                              className="p-2 text-gray-400 hover:text-[#1C3D2E] transition-colors"
                              title="Ver en sitio"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </Link>
                            <Link
                              href={`/admin/propiedades/${prop.id}/editar`}
                              className="p-2 text-gray-400 hover:text-[#1C3D2E] transition-colors"
                              title="Editar"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Link>
                            <DeleteButton id={prop.id} />
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

function DeleteButton({ id }: { id: string }) {
  async function deleteAction() {
    'use server'
    const { prisma: db } = await import('@/lib/prisma')
    const { deleteImage } = await import('@/lib/cloudinary')
    const { revalidatePath } = await import('next/cache')

    const prop = await db.propiedad.findUnique({ where: { id } })
    if (!prop) return

    for (const publicId of prop.imagenesPublicIds) {
      try { await deleteImage(publicId) } catch { /* ignore */ }
    }
    await db.propiedad.delete({ where: { id } })
    revalidatePath('/admin/dashboard')
  }

  return (
    <form action={deleteAction}>
      <button
        type="submit"
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        title="Eliminar"
        onClick={(e) => {
          if (!confirm('¿Estás seguro de eliminar esta propiedad?')) {
            e.preventDefault()
          }
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </form>
  )
}
