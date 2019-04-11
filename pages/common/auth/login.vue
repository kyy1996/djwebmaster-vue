<template>
  <v-layout>
    <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3 xl4 offset-xl4>
      <material-card
        color="green"
        title='登录'
        text="登录以使用系统"
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2"
        ></v-img>
        <v-form ref="form" v-model="form.valid" lazy-validation @submit.prevent="submit"
                @reset="this.resetValidation()">
          <v-container>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="user.username"
                  :rules="[v => !!v || '请输入登录用户名']"
                  label="UID/EMAIL/手机号/学号"
                  color="purple"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="user.password"
                  :append-icon="form.password.show ? 'visibility' : 'visibility_off'"
                  :type="form.password.show ? 'text' : 'password'"
                  :rules="[v => !!v || '请输入密码', v => (v && v.length>=6) || '密码长度至少6位']"
                  label="密码"
                  color="purple"
                  required
                  @click:append="form.password.show = !form.password.show"
                ></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-btn
                  color="grey"
                  flat
                  @click.prevent="reset">
                  重置
                </v-btn>
              </v-flex>
              <v-flex md6 text-md-right>
                <v-btn
                  :loading="loading"
                  color="success" :disabled="!form.valid" type="submit">
                  登录
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </material-card>
    </v-flex>
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
  </v-layout>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';
  import { VCard, VCardActions, VCardText, VSnackbar, VTextField } from 'vuetify/lib';
  import MaterialCard from '~/components/material/Card';
  import CommonUserAuthService from '~/services/user/auth';

  @Component({
    name: 'login',
    layout: 'empty',
    components: { VTextField, VCard, VCardText, VCardActions, VSnackbar, MaterialCard },
    mounted () {
      if (window && window.localStorage) {
        const userJson = window.localStorage.getItem('user') || '';
        if (userJson.length > 0) {
          this.$store.commit('user/loginUser', JSON.parse(userJson));
        }
      }
    },
    data () {
      return {
        user: {
          username: '',
          password: ''
        },
        form: {
          password: {
            show: false
          },
          valid: false
        },
        snackbar: {
          show: false,
          text: '',
          timeout: 5000,
          color: 'error'
        },
        loading: false
      };
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.loading = true;
          this.snackbar.show = false;
          (new CommonUserAuthService(this.$axios)).login(this.user).then(response => {
            const data = response.data;
            this.snackbar.color = data.code !== 0 ? 'error' : 'success';
            this.snackbar.show = true;
            this.snackbar.text = data.msg;
            if (data.code === 0) {
              this.$store.commit('user/loginUser', data.data);
              this.$router.push('/');
            }
          }).finally(() => this.loading = false).catch(reason => {
            this.snackbar.color = 'error';
            this.snackbar.show = true;
            this.snackbar.text = reason.response ? reason.response.data.msg || '服务器超时' : reason.message;
          });
        }
        return false;
      },
      reset () {
        this.$refs.form.reset();
        return true;
      }
    }
  })
  export default class CommonUserLoginPage extends Vue {
  }
</script>

<style scoped>

</style>
