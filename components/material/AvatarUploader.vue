<template>
  <uploader
    ref="uploader"
    :btn="[]"
    :value="value"
    v-on="$listeners"
    :directory="directory"
    :title="title"
    alwaysShow
    accept="image/*"
  >
    <template slot-scope="data">
      <v-avatar
        class="mx-auto d-block"
        :size="size"
      >
        <v-btn
          color="error"
          dark
          small
          absolute
          fab
          round
          v-if="data.data"
          @click="$refs['uploader'].deleteFile()"
        >
          <v-icon>delete_forever</v-icon>
        </v-btn>
        <v-img
          :src="data.data || defaultAvatar"
        >
          <material-mask-btn
            @click="$refs['uploader'].clickUploadBtn()"
          >
            {{ (data.data ? '换一个' : '上传') + '头像' }}
          </material-mask-btn>
        </v-img>
      </v-avatar>
    </template>
  </uploader>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import MaterialMaskBtn from '~/components/material/MaskBtn.vue'
  import Uploader from "~/components/material/Uploader.vue";

  @Component({
    name: "MaterialAvatarUploader",
    components: { Uploader, MaterialMaskBtn },
    model: {
      prop: 'value',
      event: 'upload'
    }
  })
  export default class MaterialAvatarUploader extends Vue {
    @Prop({
      default: 130,
      type: Number
    })
    size?: number;
    @Prop({
      default: '',
      type: String
    })
    value?: string;
    @Prop({
      type: String,
      default: '/user/avatars'
    })
    directory!: string;
    @Prop({
      type: String,
      default: '头像'
    })
    title!: string;
    @Prop({
      default: 'https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg',
      type: String
    })
    defaultAvatar?: string;
  };
</script>

<style scoped>

</style>
