<template>
  <v-dialog v-model="dialog" persistent width="90%">
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-layout wrap>
            <v-flex
              xs12
            >
              <v-text-field
                label="ID"
                disabled
                readonly
                v-model="model.id"
              />
            </v-flex>
            <v-flex
              xs12
            >
              <v-text-field
                v-model="model.title"
                disabled
                readonly
                color="purple"
                label="标题"/>
            </v-flex>
            <v-flex
              xs12
            >
              <v-textarea
                v-model="model.description"
                disabled
                readonly
                color="purple"
                label="描述"/>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn flat @click="close">
            关闭
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  import { VTextField } from 'vuetify/lib';

  export default {
    components: { VTextField },
    data () {
      return {
        dialog: false,
        model: {
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
          updated_at: '2019-04-10 20:41:27',
          deleted_at: null
        }
      };
    },
    computed: {
      formTitle () {
        return '查看用户操作记录';
      }
    },
    mounted () {
      this.$on('open', (data) => {
        this.dialog = true;
        this.model = Object.assign({}, data);
      });
    },
    methods: {
      close () {
        this.dialog = false;
      }
    }
  };
</script>

<style scoped>

</style>
