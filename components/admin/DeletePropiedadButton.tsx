'use client'
import { deletePropiedadAction } from '@/app/admin/dashboard/actions'

export default function DeletePropiedadButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm('¿Estás seguro de eliminar esta propiedad? Esta acción no se puede deshacer.')) return
    await deletePropiedadAction(id)
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="p-2 text-[#8B8B9E] hover:text-red-500 transition-colors"
      title="Eliminar"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
    </button>
  )
}
