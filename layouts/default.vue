<template>
  <v-app>
    <core-drawer></core-drawer>
    <core-toolbar></core-toolbar>
    <core-view></core-view>
    <core-filter></core-filter>
  </v-app>
</template>

<style lang="scss">
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
