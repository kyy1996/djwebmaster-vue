<template>
  <v-content>
    <div id="core-view">
      <nuxt/>
    </div>
    <core-footer></core-footer>
  </v-content>
</template>

<script>
  import CoreFooter from '@/components/core/Footer';

  export default {
    components: { CoreFooter },
    metaInfo () {
      return {
        title: 'Vuetify Material Dashboard by CreativeTim'
      };
    }
  };
</script>

<style>
  #core-view {
    padding-bottom: 100px;
  }
</style>
