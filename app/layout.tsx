import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://meraki-pagina-production.up.railway.app'),
  title: {
    default: 'Meraki Real Estate | Propiedades de Lujo en Colombia',
    template: '%s | Meraki Real Estate',
  },
  description: 'Encuentra tu propiedad ideal en Colombia. Compra, venta e inversión en propiedades con asesoría experta en Medellín, Bogotá, Cali y más ciudades.',
  keywords: ['propiedades', 'inmobiliaria', 'Medellín', 'Colombia', 'apartamentos', 'casas', 'venta', 'arriendo', 'lujo', 'real estate'],
  authors: [{ name: 'Meraki Real Estate' }],
  openGraph: {
    title: 'Meraki Real Estate | Propiedades de Lujo en Colombia',
    description: 'Compra, venta e inversión en propiedades con asesoría experta en Colombia.',
    type: 'website',
    locale: 'es_CO',
    siteName: 'Meraki Real Estate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meraki Real Estate | Propiedades de Lujo en Colombia',
    description: 'Compra, venta e inversión en propiedades con asesoría experta en Colombia.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
