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
      { src: 'https://unpkg.com/codyhouse-framework@3.0.8/main/assets/js/util.js', async: true, ssr: false },
      { src: 'https://js.stripe.com/v3' }
    ],
    htmlAttrs: {
      class: 'js'
    }
  },
  pageTransition: {
    name: 'fade-down',
    mode: 'out-in'
    },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/app.scss',
    '@/assets/css/base.css',
    '@/assets/css/main.css',
    '@/assets/css/transition.css'

  ],
  axios: {
    baseURL: process.env.STRAPI_URL || 'http://localhost:1337/api'
  },
  strapi: {
    entities: ['products'],
    url: 'http://15.188.27.140:1337'
  },
  auth: {
    // Options
    strategies: {
      google: {
        clientId: '1073084734162-u0n2o0mg48s9caqiq9c81q8g2nukpb2b.apps.googleusercontent.com'
      },
      local: {
        token: {
          property: 'jwt',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: 'auth/local',
            method: 'post',
          },
          user: {
            url: 'users/me',
            method: 'get',
          },
          logout: false,
        },
      },
    },
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vee-validate.js',
    {
      src: '~/plugins/stripe-elements.js',
      mode: 'client',
      ssr: false
    }
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
    '@nuxtjs/auth-next',
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
