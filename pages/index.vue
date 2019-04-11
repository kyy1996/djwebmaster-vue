<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        xs12
        md6
      >
        <material-stats-card
          color="red"
          icon="person"
          title="用户量"
          value="75"
          sub-icon=""
          sub-text=""
        />
      </v-flex>
      <v-flex
        xs12
        md6
      >
        <material-stats-card
          color="info"
          icon="description"
          title="文章"
          value="245"
          sub-icon=""
          sub-text=""
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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

