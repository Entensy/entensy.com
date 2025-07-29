/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        ckb: ['rabar', 'Arial', 'montserrat'],
        en: ['montserrat', 'rabar', 'Arial'],
      },
      colors: {
        primary: '#FC002A',
        accent: {
          light: '#999999',
          dark: '#404040',
        },
        secondery: {
          light: '#D9D9D9',
          dark: '#0d0d0d',
        },
      },
      animation: {
        ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
      },
      keyframes: {
        ripple: {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(0.9)',
          },
        },
      },
    },
  },
  plugins: [],
}
