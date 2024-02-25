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
    },
  },
  plugins: [],
}