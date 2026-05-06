'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/propiedades', label: 'Propiedades' },
    { href: '/#servicios', label: 'Servicios' },
    { href: '/contacto', label: 'Contacto' },
  ]

  const navBg = scrolled || !isHome
    ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.3)] py-3'
    : 'bg-transparent py-5'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center group hover:opacity-90 transition-opacity">
          {logoError ? (
            <span className="flex flex-col items-start">
              <span className="font-display text-[#C9A84C] text-2xl font-bold leading-none tracking-widest">MERAKI</span>
              <span className="font-sans text-white/70 text-[9px] tracking-[0.35em] uppercase leading-none mt-0.5">Real Estate</span>
            </span>
          ) : (
            <Image
              src="/logo-meraki.png"
              alt="Meraki Real Estate"
              width={120}
              height={60}
              className="object-contain"
              onError={() => setLogoError(true)}
            />
          )}
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-sm tracking-wider uppercase transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-[#C9A84C]'
                  : 'text-white/80 hover:text-[#C9A84C]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://wa.me/573147559119?text=Hola, me gustaría agendar una asesoría con Meraki Real Estate"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans border border-[#C9A84C] text-[#C9A84C] text-sm font-semibold px-5 py-2 tracking-wider uppercase hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300"
          >
            Agendar Asesoría
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2 flex flex-col gap-1.5"
          aria-label="Menú"
        >
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-300"
            style={{ transform: menuOpen ? 'rotate(45deg) translate(3px, 7px)' : 'none' }}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-300"
            style={{ transform: menuOpen ? 'rotate(-45deg) translate(3px, -7px)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-[#0A0A0A] border-t border-white/10 px-4 py-5 flex flex-col gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-white/80 hover:text-[#C9A84C] text-sm tracking-wider uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://wa.me/573147559119?text=Hola, me gustaría agendar una asesoría con Meraki Real Estate"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="font-sans border border-[#C9A84C] text-[#C9A84C] text-sm font-semibold px-5 py-2.5 text-center tracking-wider uppercase hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300"
          >
            Agendar Asesoría
          </Link>
        </div>
      </div>
    </nav>
  )
}
