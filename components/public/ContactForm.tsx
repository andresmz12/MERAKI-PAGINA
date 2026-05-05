'use client'

import { useState } from 'react'

interface ContactFormProps {
  propiedadTitulo?: string
}

export default function ContactForm({ propiedadTitulo }: ContactFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: propiedadTitulo
      ? `Estoy interesado/a en la propiedad: ${propiedadTitulo}`
      : '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // In production, connect to email service (Resend, SendGrid, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[#1C3D2E] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-[#1C3D2E] font-bold mb-2">¡Mensaje enviado!</h3>
        <p className="text-gray-500">Nos pondremos en contacto contigo muy pronto.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[#1C3D2E] mb-2">Nombre completo *</label>
          <input
            type="text"
            name="nombre"
            required
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#1C3D2E] focus:ring-1 focus:ring-[#1C3D2E] bg-white transition-colors"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1C3D2E] mb-2">Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#1C3D2E] focus:ring-1 focus:ring-[#1C3D2E] bg-white transition-colors"
            placeholder="tu@email.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1C3D2E] mb-2">Teléfono / WhatsApp</label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#1C3D2E] focus:ring-1 focus:ring-[#1C3D2E] bg-white transition-colors"
          placeholder="+57 300 000 0000"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1C3D2E] mb-2">Mensaje *</label>
        <textarea
          name="mensaje"
          required
          rows={4}
          value={formData.mensaje}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#1C3D2E] focus:ring-1 focus:ring-[#1C3D2E] bg-white transition-colors resize-none"
          placeholder="¿En qué podemos ayudarte?"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1C3D2E] text-white py-3.5 text-sm font-semibold tracking-widest uppercase hover:bg-[#C9A96E] hover:text-[#0F1F18] transition-colors duration-300 disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Enviar mensaje'}
      </button>
      <p className="text-center text-sm text-gray-400">
        O escríbenos directo por{' '}
        <a
          href="https://wa.me/573001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1C3D2E] font-semibold hover:text-[#C9A96E] transition-colors"
        >
          WhatsApp
        </a>
      </p>
    </form>
  )
}
