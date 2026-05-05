import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0F1F18] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#C9A96E] rounded-full flex items-center justify-center">
                <span className="font-display text-[#0F1F18] font-bold text-lg">M</span>
              </div>
              <div>
                <div className="font-display text-white text-xl font-bold leading-none tracking-wide">MERAKI</div>
                <div className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mt-0.5">Real Estate</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Encontramos la propiedad perfecta para ti. Con pasión, dedicación y conocimiento del mercado colombiano.
            </p>
            {/* Social */}
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'WhatsApp'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors duration-200 text-xs"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-6">Navegación</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/propiedades', label: 'Propiedades' },
                { href: '/propiedades?operacion=venta', label: 'En Venta' },
                { href: '/propiedades?operacion=arriendo', label: 'En Arriendo' },
                { href: '/contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-[#C9A96E] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-6">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span className="text-[#C9A96E] mt-0.5">📍</span>
                <span>El Poblado, Medellín<br />Antioquia, Colombia</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A96E]">📞</span>
                <a href="tel:+573001234567" className="hover:text-[#C9A96E] transition-colors">+57 300 123 4567</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A96E]">✉️</span>
                <a href="mailto:info@meraki.com.co" className="hover:text-[#C9A96E] transition-colors">info@meraki.com.co</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Meraki Real Estate. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-white/40 text-xs">
            <a href="#" className="hover:text-[#C9A96E] transition-colors">Política de privacidad</a>
            <a href="#" className="hover:text-[#C9A96E] transition-colors">Términos de uso</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
