import { RouteConfig } from 'vue-router';
import { ROLE_ADMIN } from '@/helpers/roles';

const adminRouters: Array<RouteConfig> = [
  {
    path: 'dashboard',
    component: () => import('@/views/admin/Dashboard.vue'),
    name: 'dashboard-admin',
    meta: {
      nameComponent: 'dashboard-admin',
      requiresAuth: true,
      authorize: [ROLE_ADMIN],
    },
  },
  {
    path: 'products',
    component: () => import('@/views/admin/Product.vue'),
    name: 'products',
    meta: {
      nameComponent: 'Productos',
      requiresAuth: true,
      authorize: [ROLE_ADMIN],
    },
  },
];
export default adminRouters;
