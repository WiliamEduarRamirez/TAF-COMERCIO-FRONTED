import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import adminRouters from '@/app/router/modules/admin-routers';
import customerRouters from '@/app/router/modules/customer-routers';
import store from '@/app/store';
import { ROLE_ADMIN } from '@/app/common/helpers/roles';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/admin',
    name: '',
    component: () => import('@/app/layouts/admin/AdminLayout.vue'),
    children: [...adminRouters],
  },
  {
    path: '/admin/login',
    component: () => import('@/app/views/admin/Login.vue'),
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
    component: () => import('@/app/layouts/customer/CustomerLayout.vue'),
    children: [...customerRouters],
  },
  {
    path: '/register',
    name: 'register-customer',
    component: () => import('@/app/views/customer/CustomerRegister.vue'),
    meta: {
      nameComponent: 'Register customer',
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
      if (to.name === 'login-admin') {
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
