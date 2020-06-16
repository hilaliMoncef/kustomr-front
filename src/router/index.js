import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/welcome/:id-:vendor',
    name: 'CustomerLandingPage',
    component: () => import(/* webpackChunkName: "customer" */ '@/views/landingpage/LandingPage.vue'),
    meta: {
      layout: "fullpage",
      requiresAnon: true
    }
  },
  {
    path: '/welcome/:id-:vendor/:token',
    name: 'CustomerDashboard',
    component: () => import(/* webpackChunkName: "customer" */ '@/views/landingpage/Dashboard.vue'),
    meta: {
      layout: "fullpage",
      requiresAnon: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: "fullpage" },
    component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue')
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import(/* webpackChunkName: "clients" */ '@/views/Clients/All.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/discounts',
    name: 'Discounts',
    component: () => import(/* webpackChunkName: "discounts" */ '@/views/Discounts/All.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/discounts/add',
    name: 'AddDiscounts',
    component: () => import(/* webpackChunkName: "discounts" */ '@/views/Discounts/Add.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/trainings',
    name: 'Trainings',
    component: () => import(/* webpackChunkName: "trainings" */ '@/views/Trainings/All.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/communication',
    name: 'Socials',
    component: () => import(/* webpackChunkName: "socials" */ '@/views/Socials/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/communication/mail',
    name: 'Emails',
    component: () => import(/* webpackChunkName: "socials" */ '@/views/Socials/Email/All.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/communication/mail/add',
    name: 'AddEmails',
    component: () => import(/* webpackChunkName: "socials" */ '@/views/Socials/Email/Add.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/communication/sms',
    name: 'SMS',
    component: () => import(/* webpackChunkName: "socials" */ '@/views/Socials/SMS/All.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/communication/sms/add',
    name: 'AddSMS',
    component: () => import(/* webpackChunkName: "socials" */ '@/views/Socials/SMS/Add.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "others" */ '@/views/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const isLoggedIn = store.getters.isLoggedIn;

  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      // User not logged in, can't continue
      Vue.toasted.global.error({message: 'Veuillez vous reconnecter d\'abord.'});
      return next({ path: '/login', query: { to: to.path } });
    }
  }

  if (to.meta.requiresAnon) {
    if (isLoggedIn) {
      // User not logged in, can't continue
      Vue.toasted.global.error({message: 'Vous êtes déjà connecté. Vous n\'avez pas le droit d\'aller sur cette page.'});
      return next({ path: '/' });
    }
  }

  // It's OK, we can continue
  next();
})

export default router
