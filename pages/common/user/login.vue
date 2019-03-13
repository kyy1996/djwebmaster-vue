<template>
  <v-layout>
    <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3 xl4 offset-xl4>
      <v-form ref="form" v-model="form.valid" lazy-validation @submit.prevent="submit" @reset="this.resetValidation()">
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2"
          ></v-img>

          <v-card-title primary-title>
            <h3 class="headline mb-0">登录</h3>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="user.username"
              :rules="[v => !!v || '请输入登录用户名']"
              label="UID/EMAIL/手机号/学号"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              :append-icon="form.password.show ? 'visibility' : 'visibility_off'"
              :type="form.password.show ? 'text' : 'password'"
              :rules="[v => !!v || '请输入密码', v => (v && v.length>=6) || '密码长度至少6位']"
              label="密码"
              required
              @click:append="form.password.show = !form.password.show"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="grey" flat @click.prevent="reset">重置</v-btn>
            <v-spacer></v-spacer>
            <v-btn :loading="loading" color="primary" flat :disabled="!form.valid" type="submit">登录</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
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

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { VTextField, VCard, VCardText, VCardActions, VSnackbar } from 'vuetify/lib';
  import CommonUserAuthService from '~/services/user/auth';

  @Component({
    name: 'login',
    layout: 'empty',
    components: { VTextField, VCard, VCardText, VCardActions, VSnackbar },
    mounted () {
      if (window && window.localStorage) {
        const userJson = window.localStorage.getItem('user') || '';
        if (userJson.length > 0) {
          this.$store.commit('user/loginUser', JSON.parse(userJson));
          this.$router.push('/');
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
      submit (): Promise<any> | false {
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
          }).catch(reason => {
            this.snackbar.color = 'error';
            this.snackbar.show = true;
            this.snackbar.text = reason.response ? reason.response.data.msg || '服务器超时' : reason.message;
          }).finally(() => this.loading = false);
        }
        return false;
      },
      reset (): true {
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
