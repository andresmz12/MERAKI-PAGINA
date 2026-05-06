'use server'
import { prisma } from '@/lib/prisma'
import { deleteImage } from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache'

export async function deletePropiedadAction(id: string) {
  const prop = await prisma.propiedad.findUnique({ where: { id } })
  if (!prop) return

  for (const publicId of prop.imagenesPublicIds) {
    try { await deleteImage(publicId) } catch { /* ignore */ }
  }
  await prisma.propiedad.delete({ where: { id } })
  revalidatePath('/admin/dashboard')
}
