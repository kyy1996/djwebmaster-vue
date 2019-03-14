<template>
  <v-container
    grid-list-md
    fill-height
  >
    <v-layout row wrap justify-center align-content-center>
      <v-flex xs12 mb-4>
        <h3 class="text-xs-center font-weight-regular display-2">功能目录</h3>
      </v-flex>
      <v-flex
        v-for="card in cards"
        :key="card.name"
        md4 lg3 xs12
      >
        <v-card
          :to="card.path"
          ripple
        >
          <v-responsive aspect-ratio="1">
            <v-container fill-height fluid>
              <v-layout justify-center align-center>
                <v-card-text class="text-xs-center">
                  <v-icon size="80" color="primary">{{ card.icon }}</v-icon>
                  <h3 class="headline font-weight-regular primary--text">{{ card.title }}</h3>
                </v-card-text>
              </v-layout>
            </v-container>
          </v-responsive>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  export default {
    async asyncData ({ $axios }) {
      const response = await $axios.get('/page/admin/common/welcome/index');
      return response.data.data;
    },
    computed: {
      cards () {
        return [
          {
            path: '/',
            name: 'home',
            title: '主页',
            icon: 'home'
          },
          {
            path: '/hello',
            name: 'hello',
            title: 'Hello World',
            icon: 'info'
          },
          {
            path: '/test',
            name: 'test',
            title: 'Test',
            icon: 'settings'
          },
          {
            path: '/todo',
            name: 'todo',
            title: 'Todo',
            icon: 'list'
          }
        ];
      }
    }
  };
</script>

<style scoped>

</style>

