export const state = () => ({
  menu: { main: [] },
  pageTitle: ''
});

export const mutations = {
  loadMenu (state, data: object) {
    if (data.hasOwnProperty('main')) {
      state.menu.main = data['main'];
    }
  },
  setPageTitle (state, data) {
    state.pageTitle = data;
  }
};

export const actions = {
  checkPageTitle ({ commit, state }, path) {
    for (const item of state.menu.main) {
      if (item.url === path) {
        commit('setPageTitle', item.title);
        break;
      }
      if (item._child) {
        for (const subItem of item._child) {
          if (subItem.url === path) {
            commit('setPageTitle', subItem.title);
            break;
          }
        }
      }
    }
  }
};
