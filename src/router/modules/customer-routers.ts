import { RouteConfig } from 'vue-router';

const customerRouters: Array<RouteConfig> = [
  {
    path: '',
    component: () => import('@/views/customer/Home.vue'),
    name: 'home',
    meta: {
      nameComponent: 'Home',
      requiresAuth: false,
      authorize: [],
    },
  },
  {
    path: 'payment',
    component: () => import('@/views/customer/PaymentView.vue'),
    name: 'payments',
    meta: {
      nameComponent: 'Pagos',
      requiresAuth: false,
      authorize: [],
    },
  },
];
export default customerRouters;
