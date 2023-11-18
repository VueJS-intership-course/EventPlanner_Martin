import { createRouter, createWebHistory } from 'vue-router';
import EventCatalog from '@/pages/EventsPage/Catalog/EventCatalog.vue';
import EventPage from '@/pages/EventsPage/EventPage.vue';
import LoginPage from '@/pages/Authentication/LoginPage.vue';
import RegisterPage from '@/pages/Authentication/RegisterPage.vue';
import ProfilePage from '@/pages/Authentication/ProfilePage.vue';
import CreateEvent from '@/pages/EventsPage/CreateEvent.vue';
import NotFound from '@/common-templates/NotFound.vue';
import HomePage from '@/pages/HomePage.vue';
import { userStore } from '../store/userStore.js';
import BudgetPage from '../pages/budget/BudgetPage.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/events',
    name: 'events',
    component: EventCatalog,
  },
  {
    path: '/events/:id',
    name: 'event',
    component: EventPage,
  },
  {
    path: '/events/:id/budget',
    name: 'event-budget',
    component: BudgetPage,
  },
  {
    path: '/events/createEvent',
    name: 'createEvent',
    component: CreateEvent,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
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
