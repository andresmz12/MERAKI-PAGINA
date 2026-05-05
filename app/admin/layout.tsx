import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Login page doesn't need sidebar
  return (
    <div>
      {children}
    </div>
  )
}
