import { Cormorant_Garamond, Outfit } from 'next/font/google'

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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${cormorant.variable} ${outfit.variable} font-sans`}>
      {children}
    </div>
  )
}
