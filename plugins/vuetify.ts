import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/es5/util/colors';
import { VApp, VSnackbar, VFooter, VBtn, VBreadcrumbs } from 'vuetify/lib';

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken2,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  },
  components: {
    VApp, VSnackbar, VFooter, VBtn, VBreadcrumbs
  }
});
