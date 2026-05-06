import Hero from '@/components/public/Hero'
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
      <ServicesSection />
      <FeaturedProperties />
      <AboutSection />
      <CTASection />
      <WhatsAppButton />
    </>
  )
}
