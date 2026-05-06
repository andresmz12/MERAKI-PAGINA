'use client'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
    title: 'Compra & Venta',
    desc: 'Asesoría completa en la compra o venta de tu propiedad con acompañamiento legal y comercial en cada etapa del proceso.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
    title: 'Análisis de Mercado',
    desc: 'Valuaciones precisas, estudios de rentabilidad y análisis del mercado inmobiliario colombiano para que tomes la mejor decisión.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    title: 'Asesoría Legal',
    desc: 'Acompañamiento jurídico especializado en cada etapa del proceso para tu total tranquilidad y seguridad en la inversión.',
  },
]

export default function ServicesSection() {
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <section id="servicios" className="py-24 px-4 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center fade-up">
          <div className="w-10 h-0.5 bg-[#D4AF37] mb-5" />
          <p className="font-sans text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-3">
            LO QUE HACEMOS
          </p>
          <h2 className="font-display text-[#1A1A2E] font-light" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Nuestros <span className="font-semibold">Servicios</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`fade-up stagger-${i + 1} group border-t-4 border-[#D4AF37] bg-[#F9F6F0] p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="text-[#D4AF37] mb-6">{service.icon}</div>
              <h3 className="font-display text-[#1A1A2E] text-2xl font-semibold mb-4">
                {service.title}
              </h3>
              <p className="font-sans text-[#8B8B9E] text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
