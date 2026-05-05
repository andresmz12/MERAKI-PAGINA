import slugify from 'slugify'
import { prisma } from './prisma'

export async function generateUniqueSlug(titulo: string): Promise<string> {
  const base = slugify(titulo, { lower: true, strict: true, locale: 'es' })

  const existing = await prisma.propiedad.findUnique({ where: { slug: base } })
  if (!existing) return base

  let counter = 2
  while (true) {
    const candidate = `${base}-${counter}`
    const exists = await prisma.propiedad.findUnique({ where: { slug: candidate } })
    if (!exists) return candidate
    counter++
  }
}
