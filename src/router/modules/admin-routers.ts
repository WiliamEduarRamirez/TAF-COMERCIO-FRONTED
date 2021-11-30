import { RouteConfig } from 'vue-router';

const adminRouters: Array<RouteConfig> = [
  {
    path: 'dashboard',
    component: () => import('@/modules/admin/dashboard/DashboardComponent.vue'),
    name: 'dashboard',
    meta: {
      nameComponent: 'Dashboard',
      requiresAuth: true,
      /* authorize: [role.medic, role.supervisor],*/
    },
  },
];
export default adminRouters;
