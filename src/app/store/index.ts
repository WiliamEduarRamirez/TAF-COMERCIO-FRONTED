import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from '@/app/store/modules/auth-module';
import ProductModule from '@/app/store/modules/product-module';
import UserModule from '@/app/store/modules/user-module';
import CategoryModule from '@/app/store/modules/category-module';
import TypeModule from '@/app/store/modules/type-module';
import ShoppingCartModule from '@/app/store/modules/shopping-cart-module';
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
