import Vue from 'vue';
import Vuetify, { VApp, VSnackbar, VFooter, VBtn, VBreadcrumbs } from 'vuetify/lib';
import { en, zhHans } from 'vuetify/lib/locale';

Vue.use(Vuetify, {
  theme: {
    primary: '#4caf50',
    secondary: '#4caf50',
    tertiary: '#495057',
    accent: '#82B1FF',
    error: '#f55a4e',
    info: '#00d3ee',
    success: '#5cb860',
    warning: '#ffa21a'
  },
  components: {
    VApp, VSnackbar, VFooter, VBtn, VBreadcrumbs
  },
  lang: {
    locales: {
      zhHans,
      en
    },
    current: 'zhHans'
  }
});
