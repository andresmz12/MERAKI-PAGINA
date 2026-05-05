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

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Credenciales inválidas. Verifica tu email y contraseña.')
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1F18] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#C9A96E] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="font-display text-[#0F1F18] font-bold text-3xl">M</span>
          </div>
          <h1 className="font-display text-3xl text-white font-bold mb-1">MERAKI</h1>
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Panel Administrativo</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-sm p-8">
          <h2 className="text-white text-lg font-semibold mb-6">Iniciar sesión</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/70 text-sm mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-colors"
                placeholder="admin@meraki.com"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A96E] text-[#0F1F18] font-semibold py-3 text-sm tracking-widest uppercase rounded-sm hover:bg-[#b8966a] transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          © {new Date().getFullYear()} Meraki Real Estate
        </p>
      </div>
    </div>
  )
}
