<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-btn
        @click.stop="miniVariant = !miniVariant"
        icon
      >
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        @click.stop="clipped = !clipped"
        icon
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        @click.stop="fixed = !fixed"
        icon
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-btn
        @click.stop="dark = !dark"
        icon
      >
        <v-icon>wb_incandescent</v-icon>
      </v-btn>
      <v-btn
        @click.stop="rightDrawer = !rightDrawer"
        icon
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <!--<v-scroll-x-transition appear mode="out-in">-->
        <nuxt/>
        <!--</v-scroll-x-transition>-->
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon>
              compare_arrowsz
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
  export default {
    data () {
      return {
        dark: false,
        clipped: true,
        drawer: true,
        fixed: false,
        items: [
          {
            icon: 'apps',
            title: '首页',
            to: '/'
          },
          {
            icon: 'person',
            title: '用户',
            to: '/user'
          },
          {
            icon: 'bubble_chart',
            title: 'Inspire',
            to: '/inspire'
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      };
    }
  };
</script>
