// ~/nuxt.config.ts
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@vueuse/motion/nuxt'],
  css: ['assets/css/index.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    optimizeDeps: {
      include: ['ogl'], // Pre-bundle ogl to avoid runtime issues
    },
    build: {
      rollupOptions: {
        external: [], // Ensure ogl isn’t externalized incorrectly
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ), // Ensure env is defined
    },
  },
  compatibilityDate: '2025-02-26',
});
