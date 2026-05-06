'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', { email, password, redirect: false })

    if (result?.error) {
      setError('Credenciales inválidas. Verifica tu email y contraseña.')
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
      router.refresh()
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{ background: 'linear-gradient(135deg, #111111 0%, #0A0A0A 50%, #111111 100%)' }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex flex-col items-center">
            <div className="w-16 h-16 border-2 border-[#C9A84C] flex items-center justify-center mb-4">
              <span className="font-display text-[#C9A84C] font-bold text-3xl">M</span>
            </div>
            <h1 className="font-display text-white text-3xl font-bold tracking-widest">MERAKI</h1>
            <p className="font-sans text-[#C9A84C] text-[10px] tracking-[0.5em] uppercase mt-1">
              Panel Administrativo
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur border border-white/10 p-8">
          <h2 className="font-display text-white text-xl font-semibold mb-6">Iniciar sesión</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 font-sans text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-sans block text-white/60 text-xs tracking-widest uppercase mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full font-sans bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="admin@meraki.com"
              />
            </div>
            <div>
              <label className="font-sans block text-white/60 text-xs tracking-widest uppercase mb-2">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full font-sans bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full font-sans bg-[#C9A84C] text-[#0A0A0A] font-bold py-3.5 text-sm tracking-widest uppercase hover:bg-[#c9a52f] transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        <p className="font-sans text-center text-white/20 text-xs mt-6">
          © {new Date().getFullYear()} Meraki Real Estate
        </p>
      </div>
    </div>
  )
}
