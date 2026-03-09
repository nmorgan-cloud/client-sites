/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#E8341E',
        'brand-dark': '#B8260F',
        void: '#000000',
        navy: '#0a1220',
        card: '#0d1525',
        border: '#1a2a3a',
        'border-red': '#E8341E40',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
