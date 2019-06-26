<template>
  <v-dialog v-model="dialog" persistent width="90%">
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
      >
        <material-card
          color="green"
          :title='(model.uid ? "编辑" : "新增") + "用户信息"'
          text="完善个人信息"
        >
          <v-form ref="form">
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                >
                  <v-avatar
                    slot="offset"
                    class="mx-auto d-block"
                    size="130"
                  >
                    <v-btn
                      color="error"
                      dark
                      small
                      absolute
                      fab
                      round
                    >
                      <v-icon>delete_forever</v-icon>
                    </v-btn>
                    <v-img
                      src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
                    ></v-img>
                  </v-avatar>
                </v-flex>
                <v-flex
                  xs12
                >
                  <div class="text-xs-center">
                    <template
                      v-if="model.roles && model.roles.length"
                    >
                      <v-chip
                        v-for="role in model.roles"
                        :key="role.id"
                        disabled
                      >
                        {{ role.title }}
                      </v-chip>
                    </template>
                  </div>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="UID"
                    disabled
                    readonly
                    v-model="model.uid"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label='Email'
                    class='purple-input'
                    v-model='model.email'
                    required
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    class="purple-input"
                    label="手机号"
                    v-model="model.mobile"
                  />
                </v-flex>
                <v-flex
                  xs12
                >
                  <v-text-field
                    label='密码'
                    class='purple-input'
                    v-model='model.password'
                    :rules="[v => (!v || v.length>=6) || '密码长度至少6位']"
                    :type="show_password ? 'text' : 'password'"
                    @click:append="show_password = !show_password"
                    :append-icon="show_password ? 'visibility' : 'visibility_off'"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md3
                >
                  <v-text-field
                    class="purple-input"
                    label="学号"
                    v-model="model.stu_no"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md3
                >
                  <v-text-field
                    class="purple-input"
                    label="学院"
                    v-model='model.school'
                  />
                </v-flex>
                <v-flex
                  xs12
                  md3
                >
                  <v-text-field
                    class="purple-input"
                    label="班级"
                    v-model='model.stu_class'
                  />
                </v-flex>
                <v-flex
                  xs12
                  md3
                >
                  <v-text-field
                    class="purple-input"
                    label="姓名"
                    v-model="model.name"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="个人介绍"
                    v-model="model.introduction"
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn flat @click="close">
                    取消
                  </v-btn>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="save"
                    :loading="loading"
                  >
                    保存
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script>
  import MaterialCard from '~/components/material/Card.vue';
  import { VTextField } from 'vuetify/lib';

  export default {
    components: { MaterialCard, VTextField },
    data () {
      return {
        dialog: false,
        model: {
          uid: 0,
          email: '',
          avatar: '',
          mobile: '',
          stu_no: '',
          school: '',
          stu_class: '',
          name: '',
          introduction: '',
          password: '',
          roles: []
        },
        show_password: false,
        loading: false,
        roles: []
      };
    },
    computed: {
      formTitle () {
        return (this.model.uid > 0 ? '编辑' : '新增') + '用户';
      }
    },
    mounted () {
      this.$on('open', (uid) => {
        this.dialog = true;
        uid && this.loadData(uid);
        this.loadRoles();
      });
    },
    methods: {
      close () {
        this.dialog = false;
        this.model = {};
      },
      loadData (uid) {
        this.loading = true;
        this.$axios.get('/ajax/admin/user/userProfile/show', { params: { uid } }).then(res => {
          const data = res.data;
          if (+data.code === 0) {
            this.model = {
              email: data.data.email,
              avatar: data.data.avatar,
              mobile: data.data.mobile,
              uid: data.data.uid || 0,
              roles: data.data.roles || [],
              stu_no: data.data.profile ? data.data.profile.stu_no : '',
              school: data.data.profile ? data.data.profile.school : '',
              stu_class: data.data.profile ? data.data.profile.class : '',
              name: data.data.profile ? data.data.profile.name : '',
              introduction: data.data.profile ? data.data.profile.introduction : ''
            };
          } else {
            this.$snackbar.error(data.data.msg || '服务器超时');
          }
        }).finally(() => this.loading = false).catch(reason => {
          this.$snackbar.error(reason.response ? reason.response.data.msg || '服务器超时' : reason.message);
        });
      },
      loadRoles () {
        this.$axios.get('/ajax/admin/user/role/index').then(response => {
          const data = response.data;
          if (+data.code === 0) {
            this.roles = data.items;
          }
        });
      },
      save () {
        if (this.$refs['form'].validate()) {
          this.loading = true;
          const data = this.model;
          data.class = data.stu_class;
          this.$axios.post('/ajax/admin/user/userProfile/update', data).then(response => {
            const data = response.data;
            if (+data.code === 0) {
              this.$emit('update', data.data);
              this.$snackbar.success();
              this.close();
            } else {
              this.$snackbar.error(data.msg || '服务器超时');
            }
          }).finally(() => this.loading = false).catch(reason => {
            this.$snackbar.error(reason.response ? reason.response.data.msg || '服务器超时' : reason.message);
          });
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
