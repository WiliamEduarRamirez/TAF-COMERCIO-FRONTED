import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from '@/store/modules/auth-module';
import ProductModule from '@/store/modules/product-module';
import UserModule from '@/store/modules/user-module';
import CategoryModule from '@/store/modules/category-module';
import TypeModule from '@/store/modules/type-module';
import ShoppingCartModule from '@/store/modules/shopping-cart-module';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: AuthModule,
    product: ProductModule,
    user: UserModule,
    category: CategoryModule,
    type: TypeModule,
    shoppingCart: ShoppingCartModule,
  },
});
