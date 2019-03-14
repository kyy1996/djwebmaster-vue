<template>
  <v-footer
    id="core-footer"
    absolute
    height="82"
  >
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      网页客研究会, made with
      <v-icon
        color="tertiary"
        size="17">favorite</v-icon>
    </span>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        { name: 'Home', Link: '/dashboard' },
        { name: 'Creative Tim', Link: 'https://www.creative-tim.com' },
        { name: 'About Us', Link: 'https://creative-tim.com/presentation' },
        { name: 'Blog', Link: 'https://blog.creative-tim.com' }
      ]
    })
  };
</script>

<style>
  #core-footer {
    z-index: 0;
  }
</style>
