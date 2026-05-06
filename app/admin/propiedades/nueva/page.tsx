import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import PropertyForm from '@/components/admin/PropertyForm'
import Link from 'next/link'

export default async function NuevaPropiedadPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

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
            <h1 className="font-display text-2xl text-[#0A0A0A] font-bold">Nueva Propiedad</h1>
            <p className="text-gray-500 text-sm">Completa los datos para agregar una propiedad</p>
          </div>
        </header>

        <div className="p-8 max-w-4xl">
          <PropertyForm mode="create" />
        </div>
      </div>
    </div>
  )
}
