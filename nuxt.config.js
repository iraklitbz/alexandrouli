export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Alexandrouli',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700&family=Roboto:ital,wght@0,300;0,500;0,700;1,300;1,500;1,700&display=swap'
      }
    ],
    script: [
      { src: 'https://unpkg.com/codyhouse-framework@3.0.8/main/assets/js/util.js', async: true }
    ],
    htmlAttrs: {
      class: 'js'
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/app.scss',
    '@/assets/css/base.css',
    '@/assets/css/main.css'
  ],
  axios: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vee-validate.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/components/checkout'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '~/modules/svg-module',
    '@nuxtjs/axios',
    ['nuxt-mail', {
        message: {
          to: 'iraklitbz@gmail.com',
        },
        smtp: {
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: 'username',
            pass: 'password'
          },
        }
      }]
  ],
  /*
   ** Style Resources
   ** Variables, mixins and functions to made accessible globally
   */
   styleResources: {
    scss: [
        '~/assets/scss/resources/_breakpoints.scss',
        '~/assets/scss/resources/_mixins.scss'
    ]
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      }
    }
  }
}
