export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ikaltovino',
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
      { src: 'https://unpkg.com/codyhouse-framework@3.0.8/main/assets/js/util.js', async: true, ssr: false }
      // { src: 'https://js.stripe.com/v3' }
    ],
    htmlAttrs: {
      class: 'js'
    }
  },
  layoutTransition: {
    name: 'fade-down',
    mode: 'out-in'
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
  env: {
    strapiUrl: process.env.STRAPI_URL,
    paypalClientID: process.env.PAYPAL_CLIENT_ID
  },
  strapi: {
    entities: ['products'],
    url: process.env.STRAPI_URL
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'jwt',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: 'api/auth/local',
            method: 'post',
            propertyName: 'jwt'
          },
          user: {
            url: 'api/users/me',
            method: 'get',
            propertyName: false
          },
          logout: false
        }
      },
      google: {
        clientId: '952963772678-nil6qs9leqmnu90024vbumb3che23lcg.apps.googleusercontent.com'
      }
    }
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vee-validate.js'
    // {
    //   src: '~/plugins/stripe-elements.js',
    //   mode: 'client',
    //   ssr: false
    // }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/components/checkout'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
    'cookie-universal-nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '~/modules/svg-module',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue-sweetalert2/nuxt'
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
  },
}
