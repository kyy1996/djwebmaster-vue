export const state = () => ({
  menu: null
});

export const mutations = {
  loadMenu (state, data: object) {
    if (data.hasOwnProperty('data') && data['menu'] instanceof Array) {
      state.menu = data['menu'];
    }
  }
};
