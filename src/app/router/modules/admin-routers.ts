import { RouteConfig } from 'vue-router';
import { ROLE_ADMIN } from '@/app/common/helpers/roles';

const adminRouters: Array<RouteConfig> = [
  {
    path: 'dashboard',
    component: () => import('@/app/views/admin/Dashboard.vue'),
    name: 'dashboard-admin',
    meta: {
      nameComponent: 'Dashboard',
      requiresAuth: true,
      authorize: [ROLE_ADMIN],
    },
  },
  {
    path: 'products',
    component: () => import('@/app/views/admin/Product.vue'),
    name: 'products',
    meta: {
      nameComponent: 'Productos',
      requiresAuth: true,
      authorize: [ROLE_ADMIN],
    },
  },
];
export default adminRouters;
