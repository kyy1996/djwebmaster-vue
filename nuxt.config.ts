import NuxtConfiguration from '@nuxt/config-edge';

import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';

const pkg = require('./package.json');

const config: NuxtConfiguration = {
  mode: 'universal',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#3B8070' },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/style/app.styl',
    'material-design-icons-iconfont/dist/material-design-icons.css'
  ],
  plugins: [
    '@/plugins/vuetify'
  ],
  transition: {
    'name': 'scroll-x-transition',
    'mode': 'out-in',
    'appear': true
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    }
  }
};

export default config;
