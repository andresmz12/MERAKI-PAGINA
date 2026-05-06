import ContactForm from '@/components/public/ContactForm'
import WhatsAppButton from '@/components/public/WhatsAppButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto | Meraki Real Estate',
  description: 'Contáctanos para encontrar tu propiedad ideal en Colombia. Medellín, Antioquia.',
}

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    title: 'Ubicación',
    lines: ['Medellín, Antioquia', 'Colombia'],
    href: null,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    ),
    title: 'Teléfono / WhatsApp',
    lines: ['+57 314 755 9119'],
    href: 'tel:+573147559119',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    title: 'Email',
    lines: ['grupomerakirealestate@gmail.com'],
    href: 'mailto:grupomerakirealestate@gmail.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Horario de atención',
    lines: ['Lunes a Viernes: 8am – 6pm', 'Sábados: 9am – 2pm'],
    href: null,
  },
]

export default function ContactoPage() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen">
      {/* Header */}
      <div
        className="pt-32 pb-20 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D4E 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <p className="font-sans text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-4">ESTAMOS AQUÍ</p>
          <h1 className="font-display text-white font-light mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Hablemos <span className="font-semibold">Hoy</span>
          </h1>
          <p className="font-sans text-white/50 text-base max-w-xl mx-auto">
            Cuéntanos qué buscas y nuestro equipo te ayudará a encontrar la propiedad perfecta.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info */}
          <div>
            <h2 className="font-display text-[#1A1A2E] text-3xl font-semibold mb-1">
              Información de contacto
            </h2>
            <div className="w-10 h-0.5 bg-[#D4AF37] mb-10" />

            <div className="space-y-8">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div className="w-12 h-12 bg-[#1A1A2E] flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-[#1A1A2E] text-sm mb-1 tracking-wider uppercase">
                      {item.title}
                    </h3>
                    {item.lines.map((line) =>
                      item.href ? (
                        <a
                          key={line}
                          href={item.href}
                          className="font-sans text-[#8B8B9E] text-sm hover:text-[#D4AF37] transition-colors block"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="font-sans text-[#8B8B9E] text-sm">{line}</p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-10">
              <p className="font-sans text-xs text-[#8B8B9E] tracking-[0.3em] uppercase mb-4">Síguenos</p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/meraki_real_estate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-[#1A1A2E] border border-[#E8E0D0] px-4 py-2 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@merakirealestate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-[#1A1A2E] border border-[#E8E0D0] px-4 py-2 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  TikTok
                </a>
                <a
                  href="https://linktr.ee/grupomerakirealestate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-[#1A1A2E] border border-[#E8E0D0] px-4 py-2 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  Linktree
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/573147559119?text=Hola, me gustaría información sobre propiedades en Meraki Real Estate"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 font-sans inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 font-semibold hover:bg-[#1da851] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="bg-white p-10 shadow-sm">
            <h2 className="font-display text-[#1A1A2E] text-2xl font-semibold mb-1">Envíanos un mensaje</h2>
            <div className="w-8 h-0.5 bg-[#D4AF37] mb-8" />
            <ContactForm />
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  )
}
