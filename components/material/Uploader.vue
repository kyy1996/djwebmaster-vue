<template>
  <div>
    <transition
      name="fade"
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <slot :data="value" v-if="value || alwaysShow">
        {{ value }}
      </slot>
    </transition>
    <div
      class="uploader__btn-group"
      :class="{
        'text-xs-center': btn.length===2 && value
      }"
      v-if="btn.length > 0">
      <v-btn
        v-if="hasUploadBtn"
        color="success"
        class="uploader__upload-btn"
        @click="clickUploadBtn"
      >
        <span v-if="value">修改</span><span v-else>上传</span>{{ title }}
        <v-icon right dark>cloud_upload</v-icon>
      </v-btn>
      <v-btn
        v-if="hasDeleteBtn && value"
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
      default: '/blog/images'
    })
    directory!: string;
    @Prop({
      type: String,
      default: ''
    })
    accept!: string;
    @Prop({
      type: Number,
      default: 1024 * 1024 * 10
    })
    maxSize!: number;
    @Prop({
      type: Boolean,
      default: false
    })
    alwaysShow?: boolean;

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

    clickUploadBtn (): void {
      let $ref = this.$refs['input'] as HTMLInputElement;
      $ref.value = '';
      $ref.click();
    }

    checkBtn (buttonName): boolean {
      return this.btn.indexOf(buttonName) >= 0;
    }

    get hasDeleteBtn (): boolean {
      return this.checkBtn('delete');
    }

    get hasUploadBtn (): boolean {
      return this.checkBtn('upload');
    }

    @Emit()
    async upload (event) {
      if (!event.target.files || event.target.files.length <= 0) return this.value;
      const file = event.target.files[0] as File;
      if (this.maxSize > 0 && file.size > this.maxSize) {
        this.$snackbar.error(`文件大小${ Math.round(file.size / 1024) }KB超过${ Math.round(this.maxSize / 1024) }KB限制`);
        return this.value;
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('directory', this.directory);
      const data: Response<Attachment> = await this.$axios.$post('/ajax/admin/attachment/attachment/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (+data.code === 0 && data.data && data.data.url) {
        this.$snackbar.success('上传成功');
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
