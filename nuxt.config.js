import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "闲云旅游网",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_1168872_ehvuah8v57g.css'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/main.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
    
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src:'@/plugins/element-ui', ssr:true },
    // '@/plugins/element-ui',
    '@/plugins/axios',
    { src: '@/plugins/localStorage', ssr: false },
<<<<<<< HEAD
    '@/plugins/bus',
=======
    
<<<<<<< HEAD
    { src: "~plugins/vue-quill-editor.js", ssr: false },
    
=======
>>>>>>> 85373162a2087e73e71e490efeeef4a5c1cb2aaa
>>>>>>> d4792316da3fc9b6d81a9b1d42997625beeae5eb
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // https://axios.nuxtjs.org/setup
    '@nuxtjs/axios'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.NODE_ENV == "development" ? "http://127.0.0.1:1337" : "http://157.122.54.189:9095"
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  server: {
    port:  process.env.NODE_ENV == "development" ? 3000 : 9093, // default: 3000
    host:  process.env.NODE_ENV == "development" ? "localhost" : "172.16.2.25", // default: 3000
  },
}
