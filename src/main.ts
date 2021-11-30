import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

/*Start - Config vue-toastification*/
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
/*End - Config vue-toastification*/

import mixinFormat from '@/mixins/formats';

Vue.mixin(mixinFormat);
Vue.use(Toast);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
