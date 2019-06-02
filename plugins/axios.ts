import URL from 'url';

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
    const data = response.data;
    if (data.hasOwnProperty('menu') && data['menu']) {
      store.commit('menu/loadMenu', data['menu']);
      if (process.server) {
        // 渲染pageTitle
        store.dispatch('menu/checkPageTitle', req.url).then(() => {
        });
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
}
