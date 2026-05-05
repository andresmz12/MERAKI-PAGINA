import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Meraki Real Estate | Propiedades de Lujo en Colombia',
  description: 'Encuentra tu propiedad ideal en Colombia. Apartamentos, casas, lotes y locales en venta y arriendo en Medellín y más ciudades.',
  keywords: 'propiedades, inmobiliaria, Medellín, Colombia, apartamentos, casas, venta, arriendo',
  openGraph: {
    title: 'Meraki Real Estate',
    description: 'Propiedades de lujo en Colombia',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
