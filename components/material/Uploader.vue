<template>
  <div>
    <slot :data="value" v-if="value">
      {{ value }}
    </slot>
    <div
      class="uploader__btn-group"
      :class="{
        'text-xs-center': btn.length===2 && value
      }"
      v-if="btn.length > 0">
      <v-btn
        v-if="checkBtn('upload')"
        color="success"
        class="uploader__upload-btn"
        @click="clickUploadBtn"
      >
        <span v-if="value">修改</span><span v-else>上传</span>{{ title }}
        <v-icon right dark>cloud_upload</v-icon>
      </v-btn>
      <v-btn
        v-if="checkBtn('delete') && value"
        class="text--white uploader__delete-btn"
        color="danger"
        @click="deleteFile"
      >
        删除{{ title }}
        <v-icon right dark>delete_forever</v-icon>
      </v-btn>
    </div>
    <input
      type="file"
      style="display: none;"
      ref="input"
      :accept="accept"
      @input="upload">
  </div>
</template>
<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import Attachment from "~/models/Attachment";
  import Response from "~/models/Response";

  @Component({
    name: 'Uploader',
    model: {
      prop: 'value',
      event: 'upload'
    }
  })
  export default class MaterialUploader extends Vue {
    pageLoading!: boolean;
    @Prop({
      type: String
    })
    value!: string;
    @Prop({
      type: String,
      default: ''
    })
    title!: string;
    @Prop({
      type: String,
      default: ''
    })
    directory!: string;
    @Prop({
      type: String,
      default: ''
    })
    accept!: string;

    @Prop({
      type: Array,
      default: () => ['upload', 'delete'],
      validator: function (value) {
        const valueEnum = ['upload', 'delete'];
        for (let valueKey of value) {
          if (valueEnum.indexOf(valueKey) === -1) {
            return false;
          }
        }
        return true;
      },
    })
    btn!: string[];

    clickUploadBtn () {
      let $ref = this.$refs['input'] as any;
      $ref.value = '';
      $ref.click();
    }

    checkBtn (buttonName) {
      return this.btn.indexOf(buttonName) >= 0;
    }

    @Emit()
    async upload (event) {
      if (!event.target.files || event.target.files.length <= 0) return false;
      const file = event.target.files[0];
      console.log(file);
      this.pageLoading = true;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('directory', '/blog/images');
      console.log(formData.getAll('file'));
      const data: Response<Attachment> = await this.$axios.$post('/ajax/admin/attachment/attachment/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      this.pageLoading = false;
      console.log(data);
      if (+data.code === 0 && data.data && data.data.url) {
        return data.data.url;
      }
      return this.value;
    }

    @Emit('delete')
    deleteFile () {
      this.$emit('change', '');
      this.$emit('upload', '');
      return '';
    }
  };
</script>
<style lang="scss" scoped>
</style>
