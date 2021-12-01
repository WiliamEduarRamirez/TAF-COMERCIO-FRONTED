import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import adminRouters from '@/router/modules/admin-routers';
import customerRouters from '@/router/modules/customer-routers';
import store from '@/store/index';
import { ROLE_ADMIN } from '@/helpers/roles';

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
    component: () => import('@/views/admin/Login.vue'),
    name: 'login-admin',
    meta: {
      nameComponent: 'Login admin',
      requiresAuth: false,
      authorize: [],
    },
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
    meta: {
      nameComponent: 'Login customer',
      requiresAuth: false,
      authorize: [],
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store
    .dispatch('user/currentUser')
    .then(() => {
      const { authorize } = to.meta!;
      const isLoggedIn = store.getters['user/isLoggedIn'];
      const role = store.getters['user/role'];

      if (authorize.length && !authorize.includes(role)) {
        return next({ path: '/' });
      }
      if (to.name === 'login-customer' || to.name === 'login-admin') {
        if (isLoggedIn && role) {
          if (role === ROLE_ADMIN) {
            next({ name: 'dashboard-admin' });
          } else {
            next({ name: 'home' });
          }
        }
      }
      if (to.name === 'home' && role && isLoggedIn && role === ROLE_ADMIN) {
        next({ name: 'dashboard-admin' });
      }
      next();
    })
    .catch(() => {
      next({ path: '/' });
    });
});

export default router;
