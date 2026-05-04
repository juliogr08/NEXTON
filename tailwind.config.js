/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E8232C',
        dark:    '#3A3A3A',
        bgMain:  '#F9F9F9',
        bgCard:  '#E0E0E0',
        blue:    '#1A3C6E',
        teal:    '#00C8D6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow:    '0 0 18px 4px rgba(232,35,44,0.55)',
        glowSm:  '0 0 10px 2px rgba(232,35,44,0.4)',
        card:    '0 4px 20px rgba(0,0,0,0.08)',
        cardHov: '0 12px 36px rgba(0,0,0,0.15)',
      },
      keyframes: {
        slideIn: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-in':  'slideIn 0.35s cubic-bezier(.4,0,.2,1)',
        'slide-up':  'slideUp 0.35s cubic-bezier(.4,0,.2,1)',
        'fade-in':   'fadeIn 0.3s ease',
      },
    },
  },
  plugins: [],
}
