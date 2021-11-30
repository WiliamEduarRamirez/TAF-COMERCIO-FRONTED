import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from '@/store/modules/auth';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: AuthModule,
  },
});
