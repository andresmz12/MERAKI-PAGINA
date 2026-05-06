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
        primary: '#0A0A0A',
        secondary: '#C9A84C',
        accent: '#E8E0D0',
        dark: '#000000',
        light: '#F5F0E8',
        'bg-dark': '#111111',
        'bg-card': '#1A1A1A',
        'meraki-text': '#1A1A1A',
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
