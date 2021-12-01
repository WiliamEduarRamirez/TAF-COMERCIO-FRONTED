import { RouteConfig } from 'vue-router';

const adminRouters: Array<RouteConfig> = [
  {
    path: 'dashboard',
    component: () => import('@/views/admin/Dashboard.vue'),
    name: 'dashboard',
    meta: {
      nameComponent: 'Dashboard',
      requiresAuth: true,
      /* authorize: [role.medic, role.supervisor],*/
    },
  },
  {
    path: 'products',
    component: () => import('@/views/admin/Product.vue'),
    name: 'products',
    meta: {
      nameComponent: 'Productos',
      requiresAuth: true,
      /* authorize: [role.medic, role.supervisor],*/
    },
  },
];
export default adminRouters;
