import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const BASE_URL = process.env.NEXTAUTH_URL || 'https://meraki-pagina-production.up.railway.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const propiedades = await prisma.propiedad.findMany({
    select: { slug: true, updatedAt: true },
    where: { estado: 'disponible' },
    orderBy: { updatedAt: 'desc' },
  })

  const propiedadesEntries: MetadataRoute.Sitemap = propiedades.map((p) => ({
    url: `${BASE_URL}/propiedades/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/propiedades`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...propiedadesEntries,
  ]
}
