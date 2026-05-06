import Hero from '@/components/public/Hero'
import StatsSection from '@/components/public/StatsSection'
import FeaturedProperties from '@/components/public/FeaturedProperties'
import ServicesSection from '@/components/public/ServicesSection'
import AboutSection from '@/components/public/AboutSection'
import CTASection from '@/components/public/CTASection'
import WhatsAppButton from '@/components/public/WhatsAppButton'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedProperties />
      <ServicesSection />
      <AboutSection />
      <CTASection />
      <WhatsAppButton />
    </>
  )
}
