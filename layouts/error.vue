<template>
  <div>
    <h2 v-if="error.statusCode === 404">404 - 页面不存在</h2>
    <h2 v-else>500 - 服务器错误</h2>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    props: ['error']
  })
  export default class ErrorComponent extends Vue {
  }
</script>
