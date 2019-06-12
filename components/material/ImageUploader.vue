<template>
  <uploader v-on="$listeners" v-bind="$attrs" accept="image/*">
    <template slot-scope="value">
      <v-img
        :class="'elevation-' + elevation"
        :max-height="maxHeight"
        :max-width="maxWidth"
        :width="width"
        :height="height"
        :aspect-ratio="aspectRatio"
        :contain="contain"
        :src="value.data"></v-img>
    </template>
  </uploader>
</template>
<script lang="ts">
  import Uploader from '@/components/material/Uploader.vue';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    name: 'ImageUploader',
    components: { Uploader },
    model: {
      prop: 'value',
      event: 'upload'
    }
  })
  export default class MaterialImageUploader extends Vue {
    @Prop({
      type: Number,
      validator: function (value) {
        return value > 0;
      }
    })
    aspectRatio!: number;
    @Prop({
      type: Number,
      validator: function (value) {
        return value >= 0;
      },
      default: 8
    })
    elevation!: number;
    @Prop({
      type: Number,
      validator: function (value) {
        return value >= 0;
      },
    })
    maxHeight!: number;
    @Prop({
      type: Number,
      validator: function (value) {
        return value >= 0;
      },
    })
    maxWidth!: number;
    @Prop({
      type: Number,
      validator: function (value) {
        return value >= 0;
      },
    })
    height!: number;
    @Prop({
      type: Number,
      validator: function (value) {
        return value >= 0;
      },
    })
    width!: number;
    @Prop({
      type: Boolean,
      default: false
    })
    contain!: boolean;
  };
</script>
<style lang="scss" scoped>
</style>
