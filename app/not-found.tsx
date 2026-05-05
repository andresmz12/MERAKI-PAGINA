import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-display text-[120px] text-[#1C3D2E]/10 font-bold leading-none select-none">
          404
        </div>
        <h1 className="font-display text-3xl text-[#1C3D2E] font-bold mb-4 -mt-4">
          Página no encontrada
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          La página que buscas no existe o fue movida. Explora nuestro portafolio de propiedades.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-[#1C3D2E] text-white px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-[#C9A96E] hover:text-[#0F1F18] transition-colors"
          >
            Ir al inicio
          </Link>
          <Link
            href="/propiedades"
            className="border-2 border-[#1C3D2E] text-[#1C3D2E] px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-[#1C3D2E] hover:text-white transition-colors"
          >
            Ver propiedades
          </Link>
        </div>
      </div>
    </div>
  )
}
