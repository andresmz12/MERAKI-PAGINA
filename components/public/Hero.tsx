const CIUDADES = ['Medellín', 'Bogotá', 'Cali', 'Cartagena', 'Santa Marta', 'Barranquilla']
const TIPOS = ['apartamento', 'casa', 'lote', 'local', 'finca', 'oficina']

export default function Hero() {
  return (
    <section
      className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1C1508 35%, #2A1E0A 65%, #0A0A0A 100%)' }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.05,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center">
        <p className="font-sans text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-6">
          ✦ MERAKI REAL ESTATE ✦
        </p>

        <h1
          className="font-display text-white font-light leading-tight mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}
        >
          Encuentra el Hogar
          <br />
          <span className="font-semibold">Que Mereces</span>
        </h1>

        <p className="font-sans text-white/70 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
          Compra, venta e inversión en propiedades con asesoría experta en Colombia
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/propiedades"
            className="font-sans bg-[#C9A84C] text-[#0A0A0A] px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-[#c9a52f] transition-colors duration-300"
          >
            Ver Propiedades
          </a>
          <a
            href="/contacto"
            className="font-sans border border-white text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-[#0A0A0A] transition-all duration-300"
          >
            Contáctanos
          </a>
        </div>
      </div>

      {/* Search bar — floats at bottom of hero */}
      <div className="relative z-10 w-full max-w-5xl px-4 pb-0">
        <form
          action="/propiedades"
          method="GET"
          className="bg-white rounded-2xl shadow-2xl p-3 flex flex-col sm:flex-row gap-2"
        >
          <select
            name="operacion"
            className="flex-1 font-sans bg-transparent text-[#2C2C3E] px-4 py-3 text-sm border border-[#E8E0D0] rounded-lg focus:outline-none focus:border-[#C9A84C] transition-colors"
          >
            <option value="">Operación</option>
            <option value="venta">Venta</option>
            <option value="arriendo">Arriendo</option>
          </select>
          <select
            name="tipo"
            className="flex-1 font-sans bg-transparent text-[#2C2C3E] px-4 py-3 text-sm border border-[#E8E0D0] rounded-lg focus:outline-none focus:border-[#C9A84C] transition-colors"
          >
            <option value="">Tipo de propiedad</option>
            {TIPOS.map((t) => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
          <select
            name="ciudad"
            className="flex-1 font-sans bg-transparent text-[#2C2C3E] px-4 py-3 text-sm border border-[#E8E0D0] rounded-lg focus:outline-none focus:border-[#C9A84C] transition-colors"
          >
            <option value="">Ciudad</option>
            {CIUDADES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            type="submit"
            className="font-sans bg-[#C9A84C] text-[#0A0A0A] font-bold px-8 py-3 text-sm tracking-widest uppercase rounded-lg hover:bg-[#c9a52f] transition-colors whitespace-nowrap"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Scroll indicator */}
      <div className="animate-bounce-scroll absolute bottom-6 left-1/2 flex flex-col items-center gap-1">
        <span className="font-sans text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <svg className="w-5 h-5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  )
}
