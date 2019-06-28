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
        <v-btn color="primary" @click.prevent="openEditModal()">
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
                class="subheading text-success text--darken-3"
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
                  @click="openEditModal(item.id)"
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
        <v-article-editor-modal ref="editor-modal" @update="loadData"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import VArticleEditorModal from '~/components/blog/article/EditorModal.vue';
  import MaterialCard from '~/components/material/Card.vue';
  import { Component, Vue, Watch } from '~/node_modules/vue-property-decorator';
  import VuetifyPagination from '~/models/vuetify/VuetifyPagination';
  import Article from '~/models/Article';
  import VuetifyTableHeader from '~/models/vuetify/VuetifyTableHeader';

  @Component({
    async asyncData ({ $axios }) {
      const response = await $axios.get('/page/admin/article/article/index');
      const { data } = response.data;
      return {
        total: data.page_info.total || 0,
        items: data.items || []
      };
    },
    components: { MaterialCard, VArticleEditorModal }
  })
  export default class BlogArticleIndexPage extends Vue {
    loading: boolean = false;
    dialog: boolean = false;
    pageLoading: boolean = true;
    pagination: VuetifyPagination = {
      rowsPerPage: 25
    };
    total: number = 0;
    headers: VuetifyTableHeader[] = [
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
    ];
    items: Article[] = [];

    @Watch('pagination', {
      deep: true
    })
    paginationWatcher () {
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
    }

    getDataFromApi () {
      const page = this.pagination.page || 1;
      const pageSize = this.pagination.rowsPerPage || 20;
      return this.$axios.get('/ajax/admin/article/article/index', {
        params: {
          page: page,
          pageSize: pageSize
        }
      });
    }

    openEditModal (id) {
      (this.$refs['editor-modal'] as Vue).$emit('open', id);
    }

    deleteItem (item) {
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
    }

    loadData () {
      this.pageLoading = true;
      this.getDataFromApi()
        .then(({ data }) => {
          data = data.data;
          this.items = data.items || [];
          this.total = data.page_info.total || 0;
        }).finally(() => this.pageLoading = false);
    }
  };
</script>

<style scoped>

</style>
