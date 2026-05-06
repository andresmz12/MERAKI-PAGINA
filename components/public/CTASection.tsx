'use client'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function CTASection() {
  const ref = useScrollAnimation<HTMLElement>()

  return (
    <section
      className="py-24 px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D4E 100%)' }}
      ref={ref}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="fade-up">
          <p className="font-sans text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-6">
            ✦ DAR EL SIGUIENTE PASO ✦
          </p>
          <h2
            className="font-display text-white font-light mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            ¿Listo para Encontrar tu{' '}
            <span className="font-semibold">Propiedad Ideal?</span>
          </h2>
          <p className="font-sans text-white/60 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Nuestro equipo de asesores está listo para acompañarte en cada paso. Cuéntanos qué buscas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/propiedades"
              className="font-sans bg-[#D4AF37] text-[#1A1A2E] px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-[#c9a52f] transition-colors duration-300"
            >
              Ver Propiedades
            </a>
            <a
              href="https://wa.me/573147559119?text=Hola, me gustaría información sobre propiedades en Meraki Real Estate"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans border border-white text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-[#1A1A2E] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
