<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <v-btn color="primary" @click.prevent="openEditModal">
          新文章
        </v-btn>
        <material-card
          color="green"
          title="文章"
          text=""
        >
          <v-data-table
            :headers="headers"
            :items="items"
            :pagination.sync="pagination"
            :total-items="total"
            :loading="pageLoading"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
              >
                {{ header.text }}
              </span>
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.id }}</td>
              <td>
                <v-img
                  v-if="item.cover_img"
                  :src="item.cover_img"
                  :lazy-src="item.cover_img"
                  aspect-ratio="1.5"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-layout
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  </template>
                </v-img>
              </td>
              <td>
                {{ item.title }}
              </td>
              <td>
                {{ item.user.email }}
              </td>
              <td>
                {{ item.created_at }}
              </td>
              <td>
                {{ item.updated_at }}
              </td>
              <td>
                <v-icon
                  small
                  class="mr-2"
                  @click="openEditModal(item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  delete
                </v-icon>
              </td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination
              v-model="pagination.page"
              color="purple"
              circle
              :length="Math.max(Math.ceil(total / (pagination.rowsPerPage || 20)), 1)"
            ></v-pagination>
          </div>
        </material-card>
        <v-article-editor-modal ref="editor-modal" @success="successSnack" @update="loadData" @error="errorSnack"/>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
      <v-btn
        flat
        @click="snackbar.show = false"
      >
        关闭
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  import VArticleEditorModal from '~/components/article/EditorModal';
  import MaterialCard from '~/components/material/Card';

  export default {
    async asyncData ({ $axios }) {
      const response = await $axios.get('/page/admin/article/article/index');
      const { data } = response.data;
      return {
        total: data.page_info.total || 0,
        items: data.items || []
      };
    },
    components: { MaterialCard, VArticleEditorModal },
    data: () => ({
      dialog: false,
      pageLoading: true,
      pagination: {
        rowsPerPage: 25
      },
      total: 0,
      editedIndex: -1,
      headers: [
        {
          text: 'id',
          sortable: false,
          value: 'id'
        },
        {
          text: '封面',
          value: 'coverImg',
          sortable: false
        },
        {
          text: '标题',
          value: 'title',
          sortable: false
        },
        {
          text: '发表人',
          value: 'email',
          sortable: false
        },
        {
          text: '发表时间',
          value: 'createTime',
          sortable: false
        },
        {
          text: '修改时间',
          value: 'updateTime',
          sortable: false
        },
        {
          text: '操作',
          value: 'id',
          sortable: false
        }
      ],
      editedItem: {},
      defaultItem: {},
      items: [],
      snackbar: {
        show: false,
        text: '',
        timeout: 5000,
        color: 'error'
      }
    }),
    watch: {
      pagination: {
        handler () {
          this.pageLoading = true;
          this.getDataFromApi()
            .then(({ data }) => {
              data = data.data;
              this.items = data.items || [];
              this.total = data.page_info.total || 0;
            })
            .finally(() => {
              this.pageLoading = false;
            });
        },
        deep: true
      }
    },
    methods: {
      getDataFromApi () {
        const page = this.pagination.page || 1;
        const pageSize = this.pagination.rowsPerPage || 20;
        return this.$axios.get('/ajax/admin/article/article/index', {
          params: {
            page: page,
            pageSize: pageSize
          }
        });
      },
      openEditModal (item) {
        this.editedItem = Object.assign({}, item);
        this.$refs['editor-modal'].$emit('open', this.editedItem);
      },
      deleteItem (item) {
        const index = this.items.indexOf(item);
        if (confirm('确定要删除这篇文章？')) {
          this.loading = true;
          this.$axios.$delete('/ajax/admin/article/article/delete', {
            params: {
              id: item.id
            }
          }).then(() => {
            this.loadData();
          }).finally(() => this.loading = false);
        }
      },
      loadData () {
        this.pageLoading = true;
        this.getDataFromApi()
          .then(({ data }) => {
            data = data.data;
            this.items = data.items || [];
            this.total = data.page_info.total || 0;
          }).finally(() => this.pageLoading = false);
      },
      successSnack (msg) {
        this.snackbar.show = false;
        this.snackbar.color = 'success';
        this.snackbar.show = true;
        this.snackbar.text = msg || '操作成功';
      },
      errorSnack (msg) {
        this.snackbar.show = false;
        this.snackbar.color = 'error';
        this.snackbar.show = true;
        this.snackbar.text = msg || '操作失败';
      }
    }
  };
</script>

<style scoped>

</style>
