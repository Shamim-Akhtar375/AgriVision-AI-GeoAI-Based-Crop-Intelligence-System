/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        surface: '#0f172a',
        'surface-lighter': '#1e293b',
        primary: {
          DEFAULT: '#10b981',
          glow: 'rgba(16, 185, 129, 0.3)',
        },
        secondary: {
          DEFAULT: '#3b82f6',
          glow: 'rgba(59, 130, 246, 0.3)',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          glow: 'rgba(139, 92, 246, 0.3)',
        },
        warning: '#f59e0b',
        danger: '#ef4444',
        cyan: '#06b6d4',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon-primary': '0 0 15px rgba(16, 185, 129, 0.4)',
        'neon-secondary': '0 0 15px rgba(59, 130, 246, 0.4)',
      }
    },
  },
  plugins: [],
}
