import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

/*primary: '#f57c00',*/
/*const theme = {
  primary: '#3F6AD8',
  secondary: '#5379DC',
  accent: '#5379DC',
  info: '#00CAE3',
  success: '#4CAF50',
  warning: '#FB8C00',
  error: '#FF5252',
  dark: '#343A40',
};*/

const light = {
  primary: '#9155FD',
  accent: '#0d6efd',
  secondary: '#8A8D93',
  success: '#56CA00',
  info: '#16B1FF',
  warning: '#FFB400',
  error: '#FF4C51',
};

const dark = {
  primary: '#9155FD',
  accent: '#0d6efd',
  secondary: '#8A8D93',
  success: '#56CA00',
  info: '#16B1FF',
  warning: '#FFB400',
  error: '#FF4C51',
};
export default new Vuetify({
  icons: {
    iconfont: 'mdi' || 'fa',
  },
  theme: {
    themes: {
      dark: dark,
      light: light,
    },
  },
});
