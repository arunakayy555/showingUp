/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        macaron: ['"Bodoni Moda"', '"Bodoni MT"', 'Didot', 'Georgia', 'serif'],
        gelato: ['"Courier Prime"', '"Courier New"', 'Courier', 'monospace'],
        heading: ['"Bodoni Moda"', '"Bodoni MT"', 'Didot', 'serif'],
        sans: ['"Bodoni Moda"', '"Bodoni MT"', 'Georgia', 'serif'],
        typewriter: ['"Courier Prime"', '"Courier New"', 'monospace'],
        romantic: ['Parisienne', 'cursive'],
        quote: ['Parisienne', 'cursive'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-up': 'fadeUp 0.4s ease-out',
        'bounce-soft': 'bounceSoft 2.5s infinite ease-in-out',
        'petal-drift': 'petalDrift 10s infinite linear',
        'float': 'float 3s infinite ease-in-out',
        'pulse-slow': 'pulseSlow 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(3deg)' },
        },
        petalDrift: {
          '0%': { transform: 'translateY(-10px) translateX(0) rotate(0deg)', opacity: '0.8' },
          '50%': { transform: 'translateY(50vh) translateX(25px) rotate(180deg)', opacity: '0.9' },
          '100%': { transform: 'translateY(105vh) translateX(-15px) rotate(360deg)', opacity: '0.2' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
