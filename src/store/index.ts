import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from '@/store/modules/auth-module';
import ProductModule from '@/store/modules/product-module';
import UserModule from '@/store/modules/user-module';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: AuthModule,
    product: ProductModule,
    user: UserModule,
  },
});
