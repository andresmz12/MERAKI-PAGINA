'use client'
import AnimatedCounter from '@/components/AnimatedCounter'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const stats = [
  { target: 500, suffix: '+', label: 'Propiedades Gestionadas' },
  { target: 200, suffix: '+', label: 'Familias Felices' },
  { target: 5, suffix: '+', label: 'Años de Experiencia' },
  { target: 98, suffix: '%', label: 'Satisfacción' },
]

export default function StatsSection() {
  const ref = useScrollAnimation<HTMLDivElement>()

  return (
    <section className="bg-[#1A1A2E] py-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`fade-up stagger-${i + 1} text-center py-8 px-6 ${
                i < stats.length - 1 ? 'md:border-r border-[#D4AF37]/20' : ''
              }`}
            >
              <div className="font-display text-[#D4AF37] font-light mb-3" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="font-sans text-white/60 text-sm tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
