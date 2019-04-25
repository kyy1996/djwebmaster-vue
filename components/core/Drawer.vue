<template>
  <v-navigation-drawer
    id="app-drawer"
    :value="drawer"
    @input="setDrawer"
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
        <template
          v-for="(item) in menu.main"
        >
          <v-list-tile
            v-if="!item._child"
            :to="item.url"
            :active-class="color"
            router
            exact
            nuxt
            class="v-list-item"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon_class }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title
              v-text="item.title"
            />
          </v-list-tile>
          <v-list-group
            v-else
            class="v-list-item"
            :group="item.url"
          >
            <template v-slot:activator>
              <v-list-tile
                :active-class="color"
              >
                <v-list-tile-action>
                  <v-icon>{{ item.icon_class }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="subItem in item._child"
              :key="subItem.title"
              :to="subItem.url"
              :active-class="color"
              router
              exact
              nuxt
            >
              <v-list-tile-action>
                <v-icon>{{ subItem.icon_class }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="subItem.title"/>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { VList } from 'vuetify/lib';
  import { createNamespacedHelpers } from 'vuex';

  const { mapState, mapMutations } = createNamespacedHelpers('layout');
  const { mapState: mapMenuState } = createNamespacedHelpers('menu');

  export default {
    components: { VList },
    data: () => ({
      logo: 'https://randomuser.me/api/portraits/men/85.jpg',
      responsive: false
    }),
    computed: {
      ...mapState(['image', 'color', 'drawer']),
      ...mapMenuState(['menu'])
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
      ...mapMutations(['setDrawer']),
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
