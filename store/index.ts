export const state = () => ({});

export const mutations = {};

export const actions = {
  nuxtServerInit ({ commit }) {
    const randomNumber = Math.round(Math.random() * 10) % 2;
    if (randomNumber === 0) {
      commit('user/loginUser', {
        'name': 'test' + randomNumber
      });
    }
  }
};
