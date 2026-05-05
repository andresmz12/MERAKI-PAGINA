import ContactForm from '@/components/public/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto | Meraki Real Estate',
  description: 'Contáctanos para encontrar tu propiedad ideal en Colombia.',
}

export default function ContactoPage() {
  return (
    <div className="bg-[#F7F3EC] min-h-screen">
      {/* Header */}
      <div className="bg-[#1C3D2E] pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-3">Estamos aquí</p>
          <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">Contáctanos</h1>
          <p className="text-white/60 text-lg max-w-xl">
            Cuéntanos qué buscas y nuestro equipo te ayudará a encontrar la propiedad perfecta.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="font-display text-3xl text-[#1C3D2E] font-bold mb-6">Información de contacto</h2>
            <div className="w-12 h-0.5 bg-[#C9A96E] mb-8" />

            <div className="space-y-8">
              {[
                {
                  icon: '📍',
                  title: 'Oficina principal',
                  lines: ['El Poblado, Medellín', 'Antioquia, Colombia'],
                },
                {
                  icon: '📞',
                  title: 'Teléfono',
                  lines: ['+57 300 123 4567', '+57 604 123 4567'],
                },
                {
                  icon: '✉️',
                  title: 'Email',
                  lines: ['info@meraki.com.co', 'ventas@meraki.com.co'],
                },
                {
                  icon: '⏰',
                  title: 'Horario de atención',
                  lines: ['Lunes a Viernes: 8am - 6pm', 'Sábados: 9am - 2pm'],
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div className="w-12 h-12 bg-[#1C3D2E] rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C3D2E] mb-1">{item.title}</h3>
                    {item.lines.map((line) => (
                      <p key={line} className="text-gray-600 text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-sm font-semibold hover:bg-green-600 transition-colors"
            >
              <span className="text-2xl">💬</span>
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="bg-white p-8 shadow-lg rounded-sm">
            <h2 className="font-display text-2xl text-[#1C3D2E] font-bold mb-6">Envíanos un mensaje</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
