export const state = () => ({
  user: null,
  isLogin: false
});

export const mutations = {
  loginUser (state, user) {
    state.user = user;
    state.isLogin = !!user;
    if (process.client && window) {
      window.localStorage.setItem('user', JSON.stringify(user));
    }
  },
  logoutUser (state) {
    state.user = null;
    state.isLogin = false;
    if (process.client && window) {
      window.localStorage.removeItem('user');
    }
  }
};
