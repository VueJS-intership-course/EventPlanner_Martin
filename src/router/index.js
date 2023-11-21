import { createRouter, createWebHistory } from 'vue-router';
import EventCatalog from '@/pages/EventsPage/EventCatalog.vue';
import EventDetailsPage from '@/pages/EventsPage/EventDetailsPage.vue';
import LoginPage from '@/pages/Authentication/LoginPage.vue';
import RegisterPage from '@/pages/Authentication/RegisterPage.vue';
import ProfilePage from '@/pages/Authentication/ProfilePage.vue';
import CreateEvent from '@/pages/EventsPage/CreateEvent.vue';
import NotFound from '@/pages/NotFound.vue';
import HomePage from '@/pages/HomePage.vue';
import { userStore } from '../store/userStore.js';
import BudgetPage from '../pages/budget/BudgetPage.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('@/pages/EventsPage/EventCatalog.vue')
  },
  {
    path: '/events/:id',
    name: 'event',
    component: () => import('@/pages/EventsPage/EventDetailsPage.vue')
  },
  {
    path: '/events/:id/budget',
    name: 'event-budget',
    component: () => import('@/pages/Budget/BudgetPage.vue')
  },
  {
    path: '/events/createEvent',
    name: 'createEvent',
    component: () => import('@/pages/EventsPage/CreateEvent.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Authentication/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/Authentication/RegisterPage.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/Authentication/ProfilePage.vue')
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/pages/NotFound.vue')
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

  const publicPages = ['login', 'register'];
  const adminOnlyPages = ['createEvent', 'event-budget'];
  const loggedInOnlyPages = ['profile'];

  const isPublicPage = publicPages.includes(to.name);
  const isAdminOnlyPage = adminOnlyPages.includes(to.name);
  const isloggedInOnlyPage = loggedInOnlyPages.includes(to.name);

  if (isLoggedIn && isPublicPage) {
    next({ name: 'home' });
  } else if (!isLoggedIn && isloggedInOnlyPage) {
    next({ name: 'login' });
  } else if (!isAdmin && isAdminOnlyPage) {
    next({ name: 'home' });
  } else {
    next();
  }
});


export default router;
