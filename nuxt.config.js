import colors from 'vuetify/es5/util/colors'
const clientId = process.env.CLIENT_ID
const baseURL = process.env.API_URL || 'https://api.spotify.com'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - spotify-test',
    title: 'spotify-test',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/api'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/guide/setup/
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL,
  },

  auth: {
    // Options
    strategies: {
      custom: {
        endpoints: {
          authorization: 'https://accounts.spotify.com/authorize',
          token: undefined,
          userInfo: 'https://api.spotify.com/v1/me',
          logout: 'http://localhost:3000/login',
        },
        // doesn't need server side validation so works with ssr false
        scheme: '~/schemes/implicitGrantScheme.ts',
        token: {
          type: 'Bearer',
          property: 'access_token',
          maxAge: 3600,
        },
        responseType: 'token',
        scope: [
          'user-read-recently-played',
          'user-read-currently-playing',
          'user-read-playback-state',
        ],
        grantType: 'authorization_code',
        clientId,
        redirectUri: 'http://localhost:3000/callback',
        show_dialog: true,
        logoutRedirectUri: '/login',
      },
      oauth: {
        // needs server side validation, so ssr: true
        scheme: 'oauth2',
        scope: [
          'user-read-recently-played',
          'user-read-currently-playing',
          'user-read-playback-state',
        ],
        clientId,
        endpoints: {
          authorization: 'https://accounts.spotify.com/authorize',
          token: {
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
          },
          userInfo: 'https://api.spotify.com/v1/me',
          logout: 'http://localhost:3000/login',
        },
        codeChallengeMethod: 'S256',
        redirectUri: 'http://localhost:3000/callback',
      },
    },
  },

  router: {
    middleware: ['auth'],
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
