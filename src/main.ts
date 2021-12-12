import Vue from 'vue';
import App from './App.vue';
import router from './app/router';
import store from './app/store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

const options = {
  // You can set your default options here
};
Vue.use(Toast, options);

import mixinFormat from '@/app/common/mixins/formats';
import mixinFormatValidation from '@/app/common/mixins/form-validation';

Vue.mixin(mixinFormat);
Vue.mixin(mixinFormatValidation);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
