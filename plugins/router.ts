export default function ({ app, store }) {
  app.router.beforeEach((to, _from, next) => {
    store.dispatch('menu/checkPageTitle', to.path);
    // store.dispatch('menu/checkMenuActive', to.path);
    next();
  });
}
