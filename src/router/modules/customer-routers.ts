import { RouteConfig } from 'vue-router';

const customerRouters: Array<RouteConfig> = [
  {
    path: '',
    component: () => import('@/modules/customer/home/HomeComponent.vue'),
    name: 'home',
    meta: {
      nameComponent: 'Home',
      requiresAuth: false,
      authorize: [],
    },
  },
];
export default customerRouters;
