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
        primary: '#1C3D2E',
        secondary: '#C9A96E',
        accent: '#E8DCC8',
        dark: '#0F1F18',
        light: '#F7F3EC',
        'meraki-text': '#2C2C2C',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
