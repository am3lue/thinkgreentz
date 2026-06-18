// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  site: {
    url: 'https://thinkgreentz.org', // Production URL
    name: 'Think Green Tanzania'
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    tursoUrl: process.env.TURSO_URL || '',
    tursoApiKey: process.env.TURSO_API_KEY || '',
    public: {
      imgbbApiKey: process.env.IMGBB_API_KEY || '',
    }
  },
  app: {
    pageTransition: false,
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Think Green Tanzania — Our Environment, Our World',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0c1210' }
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/images/logo.jpeg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap' }
      ]
    }
  }
})
