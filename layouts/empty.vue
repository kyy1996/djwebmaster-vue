<template>
  <v-app>
    <core-view></core-view>
  </v-app>
</template>

<style lang="scss" scoped>
  /* Remove in 1.2 */
  .v-datatable thead th.column.sortable i {
    vertical-align: unset;
  }
</style>

<script>
  import CoreDrawer from '@/components/core/Drawer';
  import CoreToolbar from '@/components/core/Toolbar';
  import CoreView from '@/components/core/View';
  import CoreFilter from '@/components/core/Filter';

  export default {
    components: {
      CoreDrawer, CoreToolbar, CoreView, CoreFilter
    }
  };
</script>
