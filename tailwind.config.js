/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        burgundy: '#4A0E1E',
        crimson: '#7A1F31',
        cream: '#F5E6D3',
        gold: '#C5A059',
        'gold-light': '#E5C585',
        'gold-dark': '#997B3D',
        paper: '#FdfBF7',
        charcoal: '#1A1A1A',
        night: '#2a0811', // Deep velvet night background
        'night-text': '#eaddcf'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
        hand: ['"Great Vibes"', 'cursive'],
      },
      backgroundImage: {
        'velvet': 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%)',
      },
      animation: {
        'flicker': 'flicker 3s infinite alternate',
        'sway': 'sway 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    }
  },
  plugins: [],
}