import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import PropertyCard from '@/components/public/PropertyCard'
import ContactForm from '@/components/public/ContactForm'

export const dynamic = 'force-dynamic'

async function getPropiedadesDestacadas() {
  return prisma.propiedad.findMany({
    where: { destacada: true, estado: 'disponible' },
    orderBy: { createdAt: 'desc' },
    take: 6,
  })
}

export default async function HomePage() {
  const propiedades = await getPropiedadesDestacadas()

  return (
    <div className="bg-[#F7F3EC]">
      {/* HERO */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1920&q=90"
          alt="Meraki Real Estate Hero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1F18]/70 via-[#0F1F18]/50 to-[#0F1F18]/80" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-[#C9A96E] text-xs tracking-[0.5em] uppercase mb-6 font-medium">
            Inmobiliaria de Lujo · Colombia
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-tight mb-6">
            Encuentra tu
            <br />
            <span className="text-[#C9A96E]">hogar ideal</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Propiedades únicas en las mejores ubicaciones de Colombia. Conectamos sueños con espacios extraordinarios.
          </p>

          {/* Search bar */}
          <form action="/propiedades" method="GET" className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-2 flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto">
            <select
              name="ciudad"
              className="flex-1 bg-white text-gray-700 px-4 py-3 text-sm rounded-sm border-0 focus:outline-none"
            >
              <option value="">Todas las ciudades</option>
              {['Medellín', 'Bogotá', 'Cali', 'Cartagena', 'Santa Marta'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              name="tipo"
              className="flex-1 bg-white text-gray-700 px-4 py-3 text-sm rounded-sm border-0 focus:outline-none"
            >
              <option value="">Tipo de propiedad</option>
              {['apartamento', 'casa', 'lote', 'local', 'finca', 'oficina'].map(t => (
                <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
            <select
              name="operacion"
              className="flex-1 bg-white text-gray-700 px-4 py-3 text-sm rounded-sm border-0 focus:outline-none"
            >
              <option value="">Venta o Arriendo</option>
              <option value="venta">Venta</option>
              <option value="arriendo">Arriendo</option>
            </select>
            <button
              type="submit"
              className="bg-[#C9A96E] text-[#0F1F18] font-semibold px-8 py-3 text-sm tracking-wider uppercase rounded-sm hover:bg-[#b8966a] transition-colors whitespace-nowrap"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-3">Selección exclusiva</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#1C3D2E] font-bold mb-4">
              Propiedades Destacadas
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto" />
          </div>

          {propiedades.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {propiedades.map((prop) => (
                  <PropertyCard key={prop.id} propiedad={prop} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/propiedades"
                  className="inline-block border-2 border-[#1C3D2E] text-[#1C3D2E] px-10 py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-[#1C3D2E] hover:text-white transition-colors duration-300"
                >
                  Ver todas las propiedades
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Próximamente propiedades disponibles.</p>
            </div>
          )}
        </div>
      </section>

      {/* WHY MERAKI */}
      <section className="py-24 bg-[#1C3D2E]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-3">Nuestra promesa</p>
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">
              ¿Por qué elegir Meraki?
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A96E] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: '🏆',
                title: 'Experiencia & Confianza',
                desc: 'Más de 10 años conectando familias colombianas con sus hogares ideales. Conocemos el mercado como nadie.',
              },
              {
                icon: '🔑',
                title: 'Propiedades Exclusivas',
                desc: 'Acceso a un portafolio selecto de propiedades premium que no encontrarás en ningún otro lugar.',
              },
              {
                icon: '🤝',
                title: 'Acompañamiento Total',
                desc: 'Te guiamos en cada paso del proceso, desde la búsqueda hasta la escritura. Sin complicaciones.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center group">
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="font-display text-2xl text-white font-bold mb-4">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-[#E8DCC8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Propiedades vendidas' },
              { number: '10+', label: 'Años de experiencia' },
              { number: '98%', label: 'Clientes satisfechos' },
              { number: '5', label: 'Ciudades' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl md:text-5xl text-[#1C3D2E] font-bold mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-3">Hablemos</p>
              <h2 className="font-display text-4xl md:text-5xl text-[#1C3D2E] font-bold mb-6">
                ¿Listo para encontrar tu propiedad?
              </h2>
              <div className="w-16 h-0.5 bg-[#C9A96E] mb-8" />
              <p className="text-gray-600 leading-relaxed mb-8">
                Nuestro equipo de asesores está disponible para ayudarte. Cuéntanos qué buscas y lo encontraremos.
              </p>
              <div className="space-y-4">
                <a href="tel:+573001234567" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#1C3D2E] rounded-full flex items-center justify-center group-hover:bg-[#C9A96E] transition-colors">
                    <span className="text-white text-lg">📞</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Teléfono</div>
                    <div className="text-[#1C3D2E] font-semibold">+57 300 123 4567</div>
                  </div>
                </a>
                <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#1C3D2E] rounded-full flex items-center justify-center group-hover:bg-[#C9A96E] transition-colors">
                    <span className="text-white text-lg">💬</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">WhatsApp</div>
                    <div className="text-[#1C3D2E] font-semibold">Escríbenos ahora</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
