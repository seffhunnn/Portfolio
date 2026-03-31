/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        'gray-950': '#0a0a0a',
        'gray-900': '#111111',
        'gray-800': '#1a1a1a',
        'gray-700': '#2a2a2a',
        'gray-600': '#3a3a3a',
        'gray-400': '#9ca3af',
        'gray-300': '#d1d5db',
        accent: '#e2e8f0',
        glow: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,255,255,0.05)' },
          '50%': { boxShadow: '0 0 40px rgba(255,255,255,0.12)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
