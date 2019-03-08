export const state = () => ({
  user: null,
  isLogin: false
});

export const mutations = {
  loginUser (state, user) {
    state.user = user;
    state.isLogin = !!user;
  },
  logoutUser (state) {
    state.user = null;
    state.isLogin = false;
  }
};
