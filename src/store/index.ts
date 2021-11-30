import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from '@/store/modules/auth';
import ProductModule from '@/store/modules/product';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: AuthModule,
    product: ProductModule,
  },
});
