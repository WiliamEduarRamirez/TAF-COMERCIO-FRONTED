import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

/*primary: '#f57c00',*/
const theme = {
  primary: '#9c27b0',
  secondary: '#d05ce3',
  accent: '#d05ce3',
  info: '#00CAE3',
  success: '#4CAF50',
  warning: '#FB8C00',
  error: '#FF5252',
};

export default new Vuetify({
  icons: {
    iconfont: 'mdi' || 'fa',
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
});
