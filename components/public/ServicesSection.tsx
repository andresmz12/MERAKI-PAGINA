'use client'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
    title: 'Venta Residencial',
    desc: 'Casas, apartamentos y terrenos con asesoría integral para que tu compra o venta sea rápida y segura.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    title: 'Inmuebles Comerciales',
    desc: 'Locales, oficinas y plazas comerciales para optimizar tus inversiones comerciales.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    title: 'Asesoría Legal',
    desc: 'Gestión de escrituras, contratos y trámites notariales para operaciones sin riesgos.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
    title: 'Análisis y Valuación',
    desc: 'Estudios de mercado que te ayudan a vender al mejor precio o invertir con seguridad.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
      </svg>
    ),
    title: 'Marketing Inmobiliario',
    desc: 'Fotografía profesional, recorridos virtuales y difusión en redes para maximizar la visibilidad.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
      </svg>
    ),
    title: 'Consultoría para Inversionistas',
    desc: 'Estrategias de inversión, análisis de rentabilidad y planes para maximizar tu patrimonio.',
  },
]

export default function ServicesSection() {
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <section id="servicios" className="py-24 px-4 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center fade-up">
          <div className="w-10 h-0.5 bg-[#C9A84C] mb-5" />
          <p className="font-sans text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-3">
            LO QUE HACEMOS
          </p>
          <h2 className="font-display text-[#0A0A0A] font-light" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Nuestros <span className="font-semibold">Servicios</span>
          </h2>
        </div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`fade-up stagger-${(i % 3) + 1} group border-t-4 border-[#C9A84C] bg-[#F5F0E8] p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="text-[#C9A84C] mb-5">{service.icon}</div>
              <h3 className="font-display text-[#0A0A0A] text-xl font-semibold mb-3">
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
