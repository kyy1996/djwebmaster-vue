<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="showDrawer"
    fixed
    app
    floating
    persistent
    mobile-break-point="991"
    width="260"
    dark
  >
    <v-img
      :src='image'
      height='100%'
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            <v-img
              :src='logo'
              height='34'
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            网页客研究会
          </v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="item.title"
          />
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { VList } from 'vuetify/lib';
  import { createNamespacedHelpers } from 'vuex';

  const { mapState, mapMutations } = createNamespacedHelpers('layout');

  export default {
    components: { VList },
    data: () => ({
      logo: 'https://randomuser.me/api/portraits/men/85.jpg',
      items: [
        {
          to: '/',
          icon: 'dashboard',
          title: 'Dashboard'
        },
        {
          to: '/user',
          icon: 'person',
          title: 'User Profile'
        },
        {
          to: '/table-list',
          icon: 'clipboard-outline',
          title: 'Table List'
        },
        {
          to: '/typography',
          icon: 'format-font',
          title: 'Typography'
        },
        {
          to: '/icons',
          icon: 'bubble_chart',
          title: 'Icons'
        },
        {
          to: '/maps',
          icon: 'map',
          title: 'Maps'
        },
        {
          to: '/notifications',
          icon: 'notifications',
          title: 'Notifications'
        }
      ],
      responsive: false
    }),
    computed: {
      ...mapState(['image', 'color', 'drawer']),
      showDrawer: {
        get () {
          return this.drawer;
        },
        set (val) {
          this.setDrawer(val);
        }
      }
    },
    mounted () {
      this.onResponsiveInverted();
      window.addEventListener('resize', this.onResponsiveInverted);
      window.t = this;
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onResponsiveInverted);
    },
    methods: {
      ...mapMutations(['setDrawer', 'toggleDrawer']),
      onResponsiveInverted () {
        this.responsive = window.innerWidth < 991;
      }
    }
  };
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }
  }
</style>
