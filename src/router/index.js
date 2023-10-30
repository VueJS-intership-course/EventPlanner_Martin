import { createRouter, createWebHistory } from "vue-router";
import EventCatalog from '../pages/EventsPage/EventCatalog.vue';
import EventPage from '../pages/EventsPage/EventPage.vue';
import LoginPage from '../pages/Authentication/LoginPage.vue';
import RegisterPage from '../pages/Authentication/RegisterPage.vue';
import ProfilePage from '../pages/Authentication/ProfilePage.vue';
import CreateEvent from '../pages/EventsPage/CreateEvent.vue'
import NotFound from '../common-templates/NotFound.vue'

const routes = [
    {
        path: '/events',
        name: 'events',
        component: EventCatalog,
    },
    {
        path: '/events/:id',
        name: 'event',
        component: EventPage
    },
    {
        path: '/events/createEvent',
        name: 'createEvent',
        component: CreateEvent
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage
    },
    {
        path: '/',
        redirect: '/events'
    },
    {
        path: '/:catchAll(.*)',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;