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
import { computed } from 'vue';

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

  console.log(isLoggedIn);

  if (
    (to.name === 'login' && isLoggedIn) ||
    (to.name === 'register' && isLoggedIn) ||
    (to.name === 'profile' && !isLoggedIn) ||
    (to.name === 'createEvent' && !isAdmin)
  ) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
