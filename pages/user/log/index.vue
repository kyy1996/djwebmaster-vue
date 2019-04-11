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
                class="subheading font-weight-light text-success text--darken-3"
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
                  @click="openEditModal(item)"
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
              :length="Math.max(Math.ceil(total / (pagination.rowsPerPage || 20)), 1)"
            ></v-pagination>
          </div>
        </material-card>
        <v-user-log-editor-modal ref="editor-modal"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import VUserLogEditorModal from '~/components/user/log/EditorModal';
  import MaterialCard from '~/components/material/Card';

  export default {
    async asyncData ({ $axios }) {
      const response = await $axios.get('/page/admin/user/userlog/index');
      const { data } = response.data;
      return {
        total: data.page_info.total || 0,
        items: data.items || []
      };
    },
    components: { MaterialCard, VUserLogEditorModal },
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
      ],
      editedItem: {},
      defaultItem: {},
      items: []
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
        return this.$axios.get('/ajax/admin/user/userLog/index', {
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
      loadData () {
        this.pageLoading = true;
        this.getDataFromApi()
          .then(({ data }) => {
            data = data.data;
            this.items = data.items || [];
            this.total = data.page_info.total || 0;
          }).finally(() => this.pageLoading = false);
      }
    }
  };
</script>

<style scoped>

</style>
