<template>
  <v-dialog v-model="dialog" persistent width="90%">
    <material-card
      color='green'
      :title='formTitle'
    >
      <v-form ref="form">
        <v-layout
          wrap
          justify-start
        >
          <v-flex xs12>
            <v-text-field
              v-model="model.title"
              color="purple"
              :rules="[v => v && v.length > 0 || '请输入标题']"
              label="标题"/>
          </v-flex>
          <v-flex xs12>
            <v-flex
              xs12
              md6
              lg3>
              <image-uploader
                v-model="model.cover_img"
                title="文章封面"
                :aspect-ratio="16 / 9"
              ></image-uploader>
            </v-flex>
          </v-flex>
          <v-flex xs12>
            <v-combobox
              v-model="model.tags"
              color="purple"
              label="标签"
              chips
              clearable
              multiple
            >
              <v-chip
                slot="selection"
                slot-scope="data"
                :selected="data.selected"
                close
                @input="removeTag(data.item)"
              >
                {{ data.item }}
              </v-chip>
            </v-combobox>
          </v-flex>
          <v-flex
            xs12
          >
            <no-ssr>
              <mavon-editor ref="md" v-model="model.content" :toolbars="toolbars" :box-shadow="false"
                            @imgAdd="$imgAdd"/>
            </no-ssr>
          </v-flex>
          <v-flex xs12>
            <v-switch
              v-model="model.hide"
              color="purple"
              label="是否隐藏"
            ></v-switch>
          </v-flex>
          <v-flex
            xs12
            text-xs-right
          >
            <v-btn flat @click="close">
              取消
            </v-btn>
            <v-btn color="primary" @click="save">
              保存
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </material-card>
  </v-dialog>
</template>

<script lang="ts">
  import MaterialCard from '~/components/material/Card.vue';
  import ImageUploader from '~/components/material/ImageUploader.vue';
  import { VTextField } from 'vuetify/lib';
  import { Component, Vue } from 'vue-property-decorator';
  import Article from '@/models/Article';
  import Response from '@/models/Response';
  import Attachment from "~/models/Attachment";

  @Component({
    name: 'BlogArticleEditorModal',
    components: { VTextField, MaterialCard, ImageUploader }
  })
  export default class BlogArticleEditorModal extends Vue {
    pageLoading: boolean = false;
    dialog: boolean = false;
    model: Article = {
      id: 0,
      title: '',
      content: '',
      tags: [],
      hide: false
    };
    toolbars: any = {
      bold: true, // 粗体
      italic: true, // 斜体
      header: true, // 标题
      underline: true, // 下划线
      strikethrough: true, // 中划线
      mark: true, // 标记
      superscript: true, // 上角标
      subscript: true, // 下角标
      quote: true, // 引用
      ol: true, // 有序列表
      ul: true, // 无序列表
      link: true, // 链接
      imagelink: true, // 图片链接
      code: true, // code
      table: true, // 表格
      fullscreen: false, // 全屏编辑
      readmodel: false, // 沉浸式阅读
      htmlcode: true, // 展示html源码
      help: true, // 帮助
      /* 1.3.5 */
      undo: true, // 上一步
      redo: true, // 下一步
      trash: true, // 清空
      save: true, // 保存（触发events中的save事件）
      /* 1.4.2 */
      navigation: true, // 导航目录
      /* 2.1.8 */
      alignleft: true, // 左对齐
      aligncenter: true, // 居中
      alignright: true, // 右对齐
      /* 2.2.1 */
      subfield: true, // 单双栏模式
      preview: true
    }; // 预览

    get formTitle () {
      return (this.model.id > 0 ? '编辑' : '新增') + '文章';
    }

    mounted () {
      this.$on('open', (id) => {
        this.loadData(id);
        this.dialog = true;
      });
    }

    loadData (id) {
      this.pageLoading = true;
      (id && this.$axios.get('/ajax/admin/article/article/show?id=' + id).then(response => {
        const data: Response<Article> = response.data;
        if (+data.code === 0) {
          this.model = data.data;
        } else {
          this.close();
          this.$emit('error', data.msg || '服务器超时');
        }
      }).finally(() => this.pageLoading = false).catch(reason => {
        this.close();
        this.$emit('error', reason.response ? reason.response.data.msg || '服务器超时' : reason.message);
      })) || (this.model = {
        id: 0,
        title: '',
        content: '',
        tags: [],
        hide: false,
        read_count: 0,
        comment_count: 0,
        extra: {},
        cover_img: '',
        uid: 0,
        created_at: '',
        updated_at: '',
        deleted_at: '',
        ip: ''
      });
    }

    close () {
      this.dialog = false;
    }

    save () {
      if ((this.$refs['form'] as any).validate()) {
        this.pageLoading = true;
        this.$axios.post('/ajax/admin/article/article/update', this.model).then(response => {
          const data: Response<Article> = response.data;
          if (+data.code === 0) {
            this.$emit('update', data.data);
            this.$emit('success');
            this.close();
          } else {
            this.$emit('error', data.msg || '服务器超时');
          }
        }).finally(() => this.pageLoading = false).catch(reason => {
          this.$emit('error', reason.response ? reason.response.data.msg || '服务器超时' : reason.message);
        });
      }
    }

    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      this.pageLoading = true;
      const formData = new FormData();
      formData.append('file', $file);
      formData.append('directory', '/blog/images');
      this.$axios({
        url: '/ajax/admin/attachment/attachment/upload',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        const data = res.data as Response<Attachment>;
        if (+data.code === 0 && data.data && data.data.url) {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          (this.$refs.md as {
            $img2Url: Function
          } | any).$img2Url(pos, data.data.url);
        }
      }).finally(() => {
        this.pageLoading = false;
      })
    }

    removeTag (item) {
      this.model.tags.splice(this.model.tags.indexOf(item), 1);
      this.model.tags = [...this.model.tags];
    }
  }
</script>

<style scoped>

</style>
