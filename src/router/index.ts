import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import adminRouters from '@/router/modules/admin-routers';
import customerRouters from '@/router/modules/customer-routers';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/admin',
    name: '',
    component: () => import('@/layouts/admin/AdminLayout.vue'),
    children: [...adminRouters],
  },
  {
    path: '/admin/login',
    name: 'login-admin',
    component: () => import('@/views/admin/Login.vue'),
  },
  {
    path: '/',
    name: '',
    component: () => import('@/layouts/customer/CustomerLayout.vue'),
    children: [...customerRouters],
  },
  {
    path: '/login',
    name: 'login-customer',
    component: () => import('@/views/customer/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
