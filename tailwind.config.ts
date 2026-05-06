import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A2E',
        secondary: '#D4AF37',
        accent: '#E8E0D0',
        dark: '#0D0D1A',
        light: '#F9F6F0',
        'meraki-text': '#2C2C3E',
        'text-light': '#8B8B9E',
        'gold-light': '#F0E6C0',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
