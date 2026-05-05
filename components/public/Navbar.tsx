'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled || !isHome
      ? 'bg-[#0F1F18]/95 backdrop-blur-sm shadow-xl py-3'
      : 'bg-transparent py-6'
  }`

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/propiedades', label: 'Propiedades' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#C9A96E] rounded-full flex items-center justify-center">
            <span className="font-display text-[#0F1F18] font-bold text-lg">M</span>
          </div>
          <div>
            <div className="font-display text-white text-xl font-bold leading-none tracking-wide">
              MERAKI
            </div>
            <div className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase leading-none mt-0.5">
              Real Estate
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wider uppercase transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-[#C9A96E]'
                  : 'text-white/80 hover:text-[#C9A96E]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="bg-[#C9A96E] text-[#0F1F18] text-sm font-semibold px-5 py-2.5 rounded-sm tracking-wider uppercase hover:bg-[#b8966a] transition-colors duration-200"
          >
            Contáctanos
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          <div className="w-6 h-0.5 bg-white mb-1.5 transition-all duration-200" style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 6px)' : 'none' }} />
          <div className="w-6 h-0.5 bg-white mb-1.5 transition-all duration-200" style={{ opacity: menuOpen ? 0 : 1 }} />
          <div className="w-6 h-0.5 bg-white transition-all duration-200" style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -6px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F1F18] border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-[#C9A96E] text-sm tracking-wider uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setMenuOpen(false)}
              className="bg-[#C9A96E] text-[#0F1F18] text-sm font-semibold px-5 py-2.5 text-center tracking-wider uppercase"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
