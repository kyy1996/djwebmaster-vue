export const state = () => ({
  menu: null
});

export const mutations = {
  loadMenu (state, menu: Array<any>) {
    state.menu = menu;
  },
  unloadMenu (state) {
    state.menu = null;
  }
};
