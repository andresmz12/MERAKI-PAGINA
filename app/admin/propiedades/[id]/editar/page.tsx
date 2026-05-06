import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AdminSidebar from '@/components/admin/AdminSidebar'
import PropertyForm from '@/components/admin/PropertyForm'
import Link from 'next/link'

interface Props {
  params: { id: string }
}

export default async function EditarPropiedadPage({ params }: Props) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const propiedad = await prisma.propiedad.findUnique({ where: { id: params.id } })
  if (!propiedad) notFound()

  const initialData = {
    id: propiedad.id,
    titulo: propiedad.titulo,
    descripcion: propiedad.descripcion,
    precio: String(propiedad.precio),
    moneda: propiedad.moneda,
    tipo: propiedad.tipo,
    operacion: propiedad.operacion,
    estado: propiedad.estado,
    ciudad: propiedad.ciudad,
    barrio: propiedad.barrio || '',
    direccion: propiedad.direccion || '',
    area: propiedad.area ? String(propiedad.area) : '',
    habitaciones: propiedad.habitaciones ? String(propiedad.habitaciones) : '',
    banos: propiedad.banos ? String(propiedad.banos) : '',
    garajes: propiedad.garajes ? String(propiedad.garajes) : '',
    estrato: propiedad.estrato ? String(propiedad.estrato) : '',
    piso: propiedad.piso ? String(propiedad.piso) : '',
    destacada: propiedad.destacada,
    caracteristicas: propiedad.caracteristicas.join(', '),
    imagenes: propiedad.imagenes.map((url, i) => ({
      url,
      publicId: propiedad.imagenesPublicIds[i] || '',
    })),
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center gap-4 sticky top-0 z-10">
          <Link href="/admin/dashboard" className="text-gray-400 hover:text-[#C9A84C] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="font-display text-2xl text-[#0A0A0A] font-bold">Editar Propiedad</h1>
            <p className="text-gray-500 text-sm line-clamp-1">{propiedad.titulo}</p>
          </div>
        </header>

        <div className="p-8 max-w-4xl">
          <PropertyForm mode="edit" initialData={initialData} />
        </div>
      </div>
    </div>
  )
}
