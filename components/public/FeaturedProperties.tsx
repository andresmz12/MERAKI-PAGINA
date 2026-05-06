import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import PropertyCard from '@/components/public/PropertyCard'

async function getDestacadas() {
  return prisma.propiedad.findMany({
    where: { destacada: true, estado: 'disponible' },
    orderBy: { createdAt: 'desc' },
    take: 6,
  })
}

export default async function FeaturedProperties() {
  const propiedades = await getDestacadas()

  return (
    <section className="py-24 px-4 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-14 text-center">
          <div className="w-10 h-0.5 bg-[#D4AF37] mb-5" />
          <p className="font-sans text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-3">
            SELECCIÓN EXCLUSIVA
          </p>
          <h2 className="font-display text-[#1A1A2E] font-light" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Propiedades <span className="font-semibold">Destacadas</span>
          </h2>
        </div>

        {propiedades.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {propiedades.map((prop) => (
                <PropertyCard key={prop.id} propiedad={prop} />
              ))}
            </div>
            <div className="text-center mt-14">
              <Link
                href="/propiedades"
                className="font-sans inline-block border-2 border-[#1A1A2E] text-[#1A1A2E] px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#1A1A2E] hover:text-white transition-all duration-300"
              >
                Ver Todas las Propiedades
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 px-8 max-w-lg mx-auto">
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mb-8" />
            <p className="font-display text-[#1A1A2E] text-2xl mb-4 font-light">
              Próximamente
            </p>
            <p className="font-sans text-[#8B8B9E] text-sm leading-relaxed mb-8">
              Pronto tendremos propiedades exclusivas para ti. Contáctanos para acceso anticipado.
            </p>
            <a
              href="https://wa.me/573147559119?text=Hola, me gustaría recibir información anticipada sobre nuevas propiedades"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans inline-block bg-[#D4AF37] text-[#1A1A2E] px-8 py-3.5 text-sm font-bold tracking-widest uppercase hover:bg-[#c9a52f] transition-colors"
            >
              Contactar Ahora
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
