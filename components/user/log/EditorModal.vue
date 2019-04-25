<template>
  <v-dialog v-model="dialog" persistent :width="width">
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
      >
        <material-card
          color='green'
          title='查看用户操作记录'
        >
          <v-form ref="form">
            <v-layout wrap>
              <v-flex
                xs12
              >
                <v-text-field
                  label="ID"
                  readonly
                  v-model="model.id"
                />
              </v-flex>
              <v-flex
                xs12
              >
                <v-text-field
                  v-model="model.title"
                  readonly
                  color="purple"
                  label="标题"/>
              </v-flex>
              <v-flex
                xs12
              >
                <v-textarea
                  v-model="model.description"
                  readonly
                  color="purple"
                  label="描述"/>
              </v-flex>
              <v-flex
                xs12
                text-xs-right
              >
                <v-btn flat @click="close">
                  关闭
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script lang="ts">
  import MaterialCard from '~/components/material/Card.vue';
  import { VTextField } from 'vuetify/lib';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: { VTextField, MaterialCard }
  })
  export default class UserLogEditorModalComponent extends Vue {
    loading: boolean = false;
    @Prop({
      type: String,
      default: '80%'
    })
    width!: string;
    dialog = false;
    model = {
      id: 0,
      uid: 0,
      title: '',
      description: '',
      loggable_type: '',
      loggable_id: 0,
      result: true,
      extra: [],
      ip: '',
      ua: '',
      created_at: '',
      updated_at: '',
      deleted_at: null
    };

    mounted () {
      this.$on('open', id => this.loadData(id));
    }

    loadData (id) {
      this.dialog = true;
      this.loading = true;
      (id && this.$axios.get('/ajax/admin/user/userLog/show?id=' + id).then(response => {
        const data: {
          data: any,
          msg: string,
          code: number
        } = response.data;
        if (+data.code === 0) {
          this.model = data.data;
        } else {
          this.close();
          this.$emit('error', data.msg || '服务器超时');
        }
      }).finally(() => this.loading = false).catch(reason => {
        this.close();
        this.$emit('error', reason.response ? (reason.response.data as { msg: string }).msg || '服务器超时' : reason.message);
      })) || (this.model = {
        id: 0,
        uid: 0,
        title: '',
        description: '',
        loggable_type: '',
        loggable_id: 0,
        result: true,
        extra: [],
        ip: '',
        ua: '',
        created_at: '',
        updated_at: '',
        deleted_at: null
      });
    }

    close () {
      this.dialog = false;
    }
  };
</script>

<style scoped>

</style>
