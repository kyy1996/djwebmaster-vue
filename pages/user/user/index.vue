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
          新用户
        </v-btn>
        <material-card
          color="green"
          title="用户"
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
              <td>{{ item.uid }}</td>
              <td>
                <v-avatar
                  size="50"
                >
                  <v-img
                    :src="item.avatar || 'https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg'"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  ></v-img>
                </v-avatar>
              </td>
              <td>
                {{ item.email }}
              </td>
              <td>
                {{ item.mobile }}
              </td>
              <td>
                {{ item.profile.stu_no }}
              </td>
              <td>
                {{ item.profile.class }}
                {{ item.profile.name }}
              </td>
              <td>
                {{ item.created_at }}
              </td>
              <td>
                <v-icon
                  small
                  class="mr-2"
                  @click="openEditModal(item.uid)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item.uid)"
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
              total-visible="10"
            ></v-pagination>
          </div>
        </material-card>
        <v-user-editor-modal ref="editor-modal" @update="loadData"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import VUserEditorModal from '~/components/user/user/EditorModal.vue';
  import MaterialCard from '~/components/material/Card.vue';
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import Pagination from '@/models/Pagination';
  import Response from '@/models/Response';
  import User from '@/models/User';
  import VuetifyPagination from '~/models/vuetify/VuetifyPagination';
  import VuetifyTableHeader from '~/models/vuetify/VuetifyTableHeader';

  @Component({
    async asyncData ({ $axios }) {
      const response = await $axios.get('/page/admin/user/userProfile/index');
      const { data } = response.data as Response<Pagination<User>>;
      return {
        total: (data.page_info || {}).total || 0,
        items: data.items || []
      };
    },
    components: { MaterialCard, VUserEditorModal }
  })
  export default class UserUserIndexPage extends Vue {
    loading: boolean = false;
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
        text: '头像',
        value: 'avatar',
        sortable: false
      },
      {
        text: 'E-Mail',
        value: 'email',
        sortable: false
      },
      {
        text: '手机',
        value: 'mobile',
        sortable: false
      },
      {
        text: '学号',
        value: 'stu_no',
        sortable: false
      },
      {
        text: '班级姓名',
        value: 'className',
        sortable: false
      },
      {
        text: '注册时间',
        value: 'createTime',
        sortable: false
      },
      {
        text: '操作',
        value: 'id',
        sortable: false
      }
    ];
    items: User[] = [];

    @Watch('pagination', { deep: true })
    onPaginationChange () {
      this.pageLoading = true;
      this.getDataFromApi()
        .then(({ data }) => {
          const res = (data.data) as Pagination<User>;
          this.items = res.items || [];
          this.total = (res.page_info || {}).total || 0;
        })
        .finally(() => {
          this.pageLoading = false;
        });
    }

    getDataFromApi () {
      const page = this.pagination.page || 1;
      const pageSize = this.pagination.rowsPerPage || 20;
      return this.$axios.get('/ajax/admin/user/userProfile/index', {
        params: {
          page: page,
          pageSize: pageSize
        }
      });
    }

    openEditModal (uid) {
      (this.$refs['editor-modal'] as Vue).$emit('open', uid);
    }

    deleteItem (id) {
      if (confirm('确定要删除这个用户？')) {
        this.loading = true;
        this.$axios.$delete('/ajax/admin/user/userProfile/delete', {
          params: {
            id: id
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
          const res = data.data as Pagination<User>;
          this.items = res.items || [];
          this.total = res.page_info.total || 0;
        }).finally(() => this.pageLoading = false);
    }
  }
</script>

<style scoped>

</style>
