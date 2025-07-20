export default defineNuxtConfig({
  compatibilityDate: '2025-07-20',
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-swiper',
    'pinia-plugin-persistedstate/nuxt'
  ],

  // Explicit alias configuration
  alias: {
    '@': '..',
    '~': '..'
  },

  // i18n configuration
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts'
  },

  ssr: false,
  imports: {
    dirs: ['stores']
  },

  pinia: {
    storesDirs: ['./stores/**']
  },

  // CSS configuration
  css: ['~/assets/css/main.css'],

  // Build configuration
  build: {
    transpile: ['three', 'gsap']
  },

  // Vite configuration for Three.js
  vite: {
    optimizeDeps: {
      include: ['three']
    },
    ssr: {
      noExternal: ['three']
    }
  },

  // App configuration
  app: {
    head: {
      title: 'Animated Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Animated portfolio with Three.js and Lenis'
        }
      ]
    }
  }
})
