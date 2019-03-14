import { set, toggle } from '@/utils/vuex';

export const state = () => ({
  image: '/images/sidebar-2.jpg',
  color: 'success',
  drawer: true
});

export const mutations = {
  setDrawer: set('drawer'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer')
};
