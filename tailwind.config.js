/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Orbitron', 'monospace'],
        'body': ['Space Mono', 'monospace'],
      },
      colors: {
        cyber: {
          50: '#f0fdff',
          100: '#ccf7ff',
          200: '#99eeff',
          300: '#5ee3ff',
          400: '#00d4ff',
          500: '#00b8e6',
          600: '#0099cc',
          700: '#007aa3',
          800: '#006685',
          900: '#00526b',
        },
        magenta: {
          500: '#ff00ff',
          600: '#cc00cc',
          700: '#990099',
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 20px currentColor)',
          },
          '50%': {
            opacity: '0.7',
            filter: 'drop-shadow(0 0 40px currentColor)',
          },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}
