import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0D0D1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-5">
              <div className="font-display text-[#D4AF37] text-2xl font-bold tracking-widest leading-none">MERAKI</div>
              <div className="font-sans text-white/50 text-[9px] tracking-[0.35em] uppercase mt-0.5">Real Estate</div>
            </div>
            <p className="font-sans text-white/50 text-sm leading-relaxed mb-6">
              Nacimos con el propósito de ofrecer un servicio inmobiliario confiable y transparente para quienes buscan su primera vivienda o desean invertir con seguridad.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/meraki_real_estate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@merakirealestate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.28 8.28 0 004.84 1.56V6.84a4.85 4.85 0 01-1.07-.15z"/>
                </svg>
              </a>
              <a
                href="https://linktr.ee/grupomerakirealestate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200 font-sans text-xs font-bold"
                aria-label="Linktree"
              >
                ltr
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-6">Navegación</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/propiedades', label: 'Propiedades' },
                { href: '/#servicios', label: 'Servicios' },
                { href: '/contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-white/50 hover:text-[#D4AF37] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="font-sans text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-6">Propiedades</h4>
            <ul className="space-y-3">
              {[
                { href: '/propiedades?operacion=venta', label: 'En Venta' },
                { href: '/propiedades?operacion=arriendo', label: 'En Arriendo' },
                { href: '/propiedades?destacada=true', label: 'Destacadas' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-white/50 hover:text-[#D4AF37] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2.5">
                <span className="text-[#D4AF37] mt-0.5 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </span>
                <span className="font-sans text-white/50">Medellín, Antioquia, Colombia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#D4AF37] flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </span>
                <a href="tel:+573147559119" className="font-sans text-white/50 hover:text-[#D4AF37] transition-colors">
                  +57 314 755 9119
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#D4AF37] flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                <a href="mailto:grupomerakirealestate@gmail.com" className="font-sans text-white/50 hover:text-[#D4AF37] transition-colors break-all">
                  grupomerakirealestate@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#D4AF37]/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-white/30 text-xs">
            © {new Date().getFullYear()} Meraki Real Estate. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 font-sans text-white/30 text-xs">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Política de privacidad</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Términos de uso</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
