export const state = () => ({});

export const mutations = {};

export const actions = {
  nuxtServerInit ({ commit }) {
    const randomNumber = Math.round(Math.random() * 10);
    if (randomNumber % 2 === 0) {
      commit('user/loginUser', {
        'name': 'test' + randomNumber
      });
    }
  }
};
