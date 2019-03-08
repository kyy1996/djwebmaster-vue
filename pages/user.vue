<template>
  <div>
    <h2>index</h2>
    <p v-if="isLogin">user: {{ user.name }}</p>
    <nuxt-link v-else to="about">about</nuxt-link>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    computed: {
      user () {
        return this.$store.state.user.user;
      },
      isLogin () {
        return this.$store.state.user.isLogin;
      }
    }
  })
  export default class UserPage extends Vue {
  }
</script>

<style scoped>

</style>
