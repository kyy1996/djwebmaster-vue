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
        xs12
        md8
      >
        <material-card
          color="green"
          :title='(user.uid ? "编辑" : "新增") + "用户信息"'
          text="完善个人信息"
        >
          <v-form ref="form">
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="UID"
                    disabled
                    readonly
                    v-model="user.uid"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label='Email'
                    class='purple-input'
                    v-model='user.email'
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
                    v-model="user.mobile"
                  />
                </v-flex>
                <v-flex
                  xs12
                >
                  <v-text-field
                    label='密码'
                    class='purple-input'
                    v-model='user.password'
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
                    v-model="user.stu_no"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md3
                >
                  <v-text-field
                    class="purple-input"
                    label="学院"
                    v-model='user.school'
                  />
                </v-flex>
                <v-flex
                  xs12
                  md3
                >
                  <v-text-field
                    class="purple-input"
                    label="班级"
                    v-model='user.stu_class'
                  />
                </v-flex>
                <v-flex
                  xs12
                  md3
                >
                  <v-text-field
                    class="purple-input"
                    label="姓名"
                    v-model="user.name"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="个人介绍"
                    v-model="user.introduction"
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
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
      <v-flex
        xs12
        md4
      >
        <material-card class="v-card-profile" style="width: 100%;">
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
            <v-img
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            ></v-img>
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">UID: {{ user.uid }}</h6>
            <h6 class="category text-gray font-weight-thin mb-3">{{ user.stu_no }}</h6>
            <h4 class="card-title font-weight-light">{{ user.school + user.stu_class }}</h4>
            <h4 class="card-title font-weight-light">{{ user.name }}</h4>
            <h4 class="card-title font-weight-light">{{ user.email }}</h4>
            <p class="card-description font-weight-light">{{ user.introduction }}</p>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import MaterialCard from '~/components/material/Card.vue';
  import { VTextField } from 'vuetify/lib';

  export default {
    components: { MaterialCard, VTextField },
    async asyncData ({ $axios }) {
      const response = await $axios.get('/page/admin/common/welcome/index');
      const data = response.data.user;
      return {
        user: {
          email: data.email,
          avatar: data.avatar,
          mobile: data.mobile,
          uid: data.uid || 0,
          stu_no: data.profile ? data.profile.stu_no : '',
          school: data.profile ? data.profile.school : '',
          stu_class: data.profile ? data.profile.class : '',
          name: data.profile ? data.profile.name : '',
          introduction: data.profile ? data.profile.introduction : ''
        }
      };
    },
    data () {
      return {
        user: {
          email: '',
          avatar: '',
          mobile: '',
          uid: 0,
          stu_no: '',
          school: '',
          stu_class: '',
          name: '',
          introduction: '',
          password: ''
        },
        show_password: false,
        loading: false
      };
    },
    methods: {
      save () {
        if (this.$refs['form'].validate()) {
          this.loading = true;
          const data = this.user;
          data.class = data.stu_class;
          this.$axios.post('/ajax/admin/user/userprofile/update', this.user).then(response => {
            const data = response.data;
            this.$snackbar[data.code !== 0 ? 'error' : 'success'](data.msg);
          }).finally(() => this.loading = false).catch(reason => {
            this.$snackbar.error(reason.response ? reason.response.data.msg || '服务器超时' : reason.message);
          });
        }
      }
    }
  };
</script>
