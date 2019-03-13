export const state = () => ({});

export const mutations = {};

export const actions = {
  nuxtServerInit ({ commit }) {
    if (process.client && window) {
      const userJson = window.localStorage.get('user');
      if (userJson) {
        commit('user/loginUser', JSON.parse(userJson));
      }
    }
  }
};
