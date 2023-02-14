// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@sidebase/nuxt-auth',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss'
  ],

  // @nuxtjs/i18n
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    langDir: 'locales',
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en'
    },
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        files: ['en.json']
      },
      {
        code: 'de',
        iso: 'de-DE',
        files: ['de.json']
      }
    ]
  },

  // @sidebase/nuxt-auth
  auth: {
    origin: process.env.NUXT_PUBLIC_BASE_URL
  },

  // @nuxt/content
  content: {

  },

  // @nuxtjs/google-fonts
  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      Manrope: true
    }
  },

  // @nuxtjs/color-mode
  colorMode: {
    classPrefix: 'theme-',
    classSuffix: ''
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL
    }
  },

  app: {
    head: {
      title: 'supastarter Nuxt',
      link: [
        {
          rel: 'icon',
          href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>'
        }
      ]
    }
  },

  build: {
    transpile: [
      'trpc-nuxt'
    ]
  },

  typescript: {
    shim: false
  },

  routeRules: {
    '/app/**': { ssr: false },
    '/auth/**': { ssr: false },
    '/blog/**': { static: true }
  }
})
