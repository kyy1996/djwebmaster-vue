<template>
  <button
    class="mask-btn--button"
    :type="type"
    v-on="$listeners"
  >
    <slot>添加或替换</slot>
  </button>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    name: 'MaterialMaskBtn'
  })
  export default class MaterialMaskBtn extends Vue {
    @Prop({
      default: 'button',
      type: String,
      validator (value: string): boolean {
        return ['button', 'submit', 'reset'].indexOf(value) >= 0;
      }
    })
    type?: 'button' | 'submit' | 'reset';
  };
</script>

<style scoped>
  button {
    display: block;
    height: 100%;
    width: 100%;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    border: none;
    color: #fff;
    transform: scale(1.3);
    transition: all 300ms linear;
    opacity: 0;
    z-index: 1;
    font-weight: bold;
  }

  button:hover {
    transform: scale(1);
    opacity: 1;
  }
</style>
