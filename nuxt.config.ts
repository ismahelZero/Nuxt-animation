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

  // Explicitly configure vue-tsc
  build: {
    transpile: ['vue']
  }
})
