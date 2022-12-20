export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: true,

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
    baseURL: process.env.MY_HEROKU_URL
  },
  env: {
    strapiUrl: process.env.MY_HEROKU_URL,
    paypalClientID: process.env.PAYPAL_CLIENT_ID
  },
  strapi: {
    entities: ['products'],
    url: process.env.MY_HEROKU_URL
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vee-validate.js',
    '~/plugins/click-outside-directive.client.js'
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
  // router: {
  //   middleware: ['auth']
  // },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '~/modules/svg-module',
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/apollo'
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://cms.ikaltovino.com/graphql',
      }
    }
  },
  firebase: {
      config: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
      },
      services: {
        auth: {
          persistence: 'local', // default
          initialize: {
            onAuthStateChangedAction: 'onAuthStateChangedAction',
            subscribeManually: false
          },
          ssr: false,
        },
        firestore: true
      }
  },
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
