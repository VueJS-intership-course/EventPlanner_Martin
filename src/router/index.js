import { createRouter, createWebHistory } from 'vue-router';
import { userStore } from '@/store/userStore.js';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('@/pages/EventsPage/EventCatalog.vue'),
  },
  {
    path: '/events/createEvent',
    name: 'createEvent',
    component: () => import('@/pages/EventsPage/CreateEvent.vue'),
    meta: {
      isAdmin: true,
    },
  },
  {
    path: '/events/:id',
    name: 'event',
    component: () => import('@/pages/EventsPage/EventDetailsPage.vue'),
  },
  {
    path: '/events/:id/budget',
    name: 'event-budget',
    component: () => import('@/pages/Budget/BudgetPage.vue'),
    meta: {
      isAdmin: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Authentication/LoginPage.vue'),
    meta: {
      isLoggedIn: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/Authentication/RegisterPage.vue'),
    meta: {
      isLoggedIn: false,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/Authentication/ProfilePage.vue'),
    meta: {
      isLoggedIn: true,
    },
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/pages/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve(async (to, from, next) => {
  const uStore = userStore();
  const isLoggedIn = uStore.isLoggedIn;
  const isAdmin = uStore.isAdmin;

  const requiresAuth = to.meta.isLoggedIn;
  const requiresAdmin = to.meta.isAdmin;
  const forbiddenWhenLoggedIn = ['login', 'register'].includes(to.name);

  if (requiresAuth && !isLoggedIn) {
    return next({ name: 'login' });
  } else if (requiresAdmin && !isAdmin) {
    return next({ name: 'home' });
  } else if (forbiddenWhenLoggedIn && isLoggedIn) {
    return next({ name: 'home' });
  }
  return next();
});

export default router;
