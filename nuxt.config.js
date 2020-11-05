require('dotenv').config();

export default {
  env: process.env,
  server: {
    port: process.env.PORT,
    host: '0.0.0.0'
  },
  ssr: false,
  head: {
    title: 'Scribeless',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Assignment for Scribeless' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons+Outlined', defer: true },
    ]
  },
  loading: { color: '#fff' },
  css: [
    '~/css/layout.css'
  ],
  plugins: [
    { src: '~/plugins/vue-notifications', mode: 'client' },
    { src: '~/plugins/axios', mode: 'client' }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/moment'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth'
  ],
  axios: {
    baseURL: process.env.BASE_URL
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/users/login', method: 'post', propertyName: 'token' },
          logout: { url: '/users/logout', method: 'delete' },
          user: { url: '/users/current', method: 'get', propertyName: 'user' }
        },
        tokenRequired: true,
        tokenType: process.env.PUBLIC_KEY
      }
    },
    redirect: {
      user: '/profile',
      callback: '/callback',
      home: '/'
    }
  },
  pwa: {
    manifest: {
      "lang": 'en',
      "name": "Scribeless",
      "short_name": "Scribeless",
      "theme_color": "#670882",
      "background_color": "#000000",
      "display": "standalone",
      "scope": "/",
      "start_url": "/",
    },
    meta: false,
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://fonts.googleapis.com/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: 'https://api.nasa.gov/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: 'https://physiofirst.s3.ap-south-1.amazonaws.com/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        }
      ],
      importScripts: [
        'custom-sw.js'
      ],
    },
    icon: {
      fileName: 'pwa_icon.png',
      purpose: ['maskable', 'any']
    }
  },
}
