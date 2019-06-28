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
        <material-card
          color="green"
          title="操作日志"
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
              <td>
                {{ item.id }}
              </td>
              <td>
                {{ item.title }}
              </td>
              <td>
                {{ item.description }}
              </td>
              <td>
                {{ item.uid }}
              </td>
              <td>
                {{ item.created_at }}
              </td>
              <td>
                <v-icon
                  small
                  class="mr-2"
                  @click="openEditModal(item.id)"
                >
                  visibility
                </v-icon>
              </td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination
              v-model="pagination.page"
              color="purple"
              circle
              :total-visible="10"
              :length="Math.max(Math.ceil(total / (pagination.rowsPerPage || 20)), 1)"
            ></v-pagination>
          </div>
        </material-card>
        <v-user-log-editor-modal ref="editor-modal"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import VUserLogEditorModal from '~/components/user/log/EditorModal.vue';
  import MaterialCard from '~/components/material/Card.vue';
  import { Watch } from 'vue-property-decorator';
  import Vue from 'vue';
  import VuetifyPagination from "~/models/vuetify/VuetifyPagination";
  import UserLog from "~/models/UserLog";
  import Pagination from "~/models/Pagination";
  import VuetifyTableHeader from "~/models/vuetify/VuetifyTableHeader";
  import Component from "~/node_modules/vue-class-component";

  @Component({
    components: { MaterialCard, VUserLogEditorModal },
    async asyncData ({ $axios }) {
      const response = await $axios.get('/page/admin/user/userLog/index');
      const data = response.data.data as Pagination<UserLog>;
      return {
        total: data.page_info.total || 0,
        pagination: {
          rowsPerPage: data.page_info.page_size,
          page: data.page_info.page_index
        },
        items: data.items || []
      };
    }
  })
  export default class UserLogIndexPage extends Vue {
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
        text: '标题',
        value: 'title',
        sortable: false
      },
      {
        text: '描述',
        value: 'description',
        sortable: false
      },
      {
        text: '操作人ID',
        value: 'uid',
        sortable: false
      },
      {
        text: '操作时间',
        value: 'createTime',
        sortable: false
      },
      {
        text: '操作',
        value: 'id',
        sortable: false
      }
    ];
    items: UserLog[] = [];

    @Watch('pagination', { deep: true })
    onChangePagination () {
      this.loadData();
    }

    getDataFromApi () {
      const page = this.pagination.page || 1;
      const pageSize = this.pagination.rowsPerPage || 20;
      return this.$axios.get('/ajax/admin/user/userLog/index', {
        params: {
          page: page,
          pageSize: pageSize
        }
      });
    }

    openEditModal (id) {
      (this.$refs['editor-modal'] as Vue).$emit('open', id);
    }

    loadData () {
      this.pageLoading = true;
      this.getDataFromApi()
        .then(({ data }) => {
          const list = data.data as Pagination<UserLog>;
          this.items = list.items || [];
          this.total = list.page_info.total || 0;
          this.pagination.rowsPerPage = list.page_info.page_size;
          this.pagination.page = list.page_info.page_index;
        })
        .finally(() => {
          this.pageLoading = false;
        });
    }
  }
</script>

<style scoped>

</style>
