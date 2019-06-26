import URL from 'url';
import Response from '~/models/Response';
import { AxiosError } from '~/node_modules/axios';

export default function ({ $axios, store, req, redirect }) {
  $axios.onRequest(config => {
    config.params = config.params || {};
    if (process.server && req) {
      // 注入页面query参数
      const param = URL.parse(req.url, true).query;
      for (const paramKey in param) {
        if (param.hasOwnProperty(paramKey) && !config.params.hasOwnProperty(paramKey)) {
          config.params[paramKey] = param[paramKey];
        }
      }
    }
    if (process.env.noCsrf) {
      config.params['nocsrf'] = 1;
    }
    if (process.env.noLogin) {
      config.params['nologin'] = 1;
    }
  });

  $axios.onResponse(response => {
    const data = response.data as Response<any>;
    if (data.hasOwnProperty('menu') && data['menu']) {
      store.commit('menu/loadMenu', data['menu']);
      if (process.server) {
        // 渲染pageTitle
        store.dispatch('menu/checkPageTitle', req.url).catch(reason => console.log(reason));
      }
    }
    if (data.hasOwnProperty('user') && data['user']) {
      store.commit('user/loginUser', data['user']);
    }
    if (data.code === 10011) {
      // 用户未登录
      if (process.client) {
        window.localStorage.clear();
      }
      store.commit('user/logoutUser');
      redirect('/common/auth/login');
    }
  });

  $axios.onResponseError((error: AxiosError) => {
    const response = error.response;
    const data = response!.data as Response<any> || {};
    if (data.code === 10011) {
      // 用户未登录
      if (process.client) {
        window.localStorage.clear();
      }
      store.commit('user/logoutUser');
      redirect('/common/auth/login');
    }
    if (data.code === 10004) {
      // 参数错误
      let errors = [];
      if (data.data.hasOwnProperty('detail')) {
        for (const key in data.data.detail) {
          if (data.data.detail.hasOwnProperty(key) && data.data.detail[key] instanceof Array) {
            errors = errors.concat(data.data.detail[key]);
          }
        }
      }
      if (errors.length) {
        data.msg += '：' + errors.join(',');
      }
    }
  });
}
