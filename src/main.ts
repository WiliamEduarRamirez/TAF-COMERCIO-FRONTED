import Vue from 'vue';
import App from './app/App.vue';
import router from './app/router';
import store from './app/store';
import vuetify from './app/plugins/vuetify';

Vue.config.productionTip = false;

import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

const options = {
  // You can set your default options here
};
Vue.use(Toast, options);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
