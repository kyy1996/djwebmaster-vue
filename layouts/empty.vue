<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      v-if="false"
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="网页客研究会">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>网页客研究会</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
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
      <v-toolbar-side-icon @click="drawer = !drawer" disabled/>
      <v-btn
        @click.stop="miniVariant = !miniVariant"
        icon
      >
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
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
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer
      height="auto"
      app
      :fixed="fixed"
    >
      <v-card
        class="flex"
        tile
      >
        <v-card-text>
          &copy;2018&nbsp;网页客研究会
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
  export default {
    data () {
      return {
        dark: false,
        clipped: false,
        drawer: false,
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
        title: '网页客研究会'
      };
    }
  };
</script>
