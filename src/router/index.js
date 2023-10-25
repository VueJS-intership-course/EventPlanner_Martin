import { createRouter, createWebHistory } from "vue-router";
import EventCatalog from '../pages/EventsPage/EventCatalog.vue';
import EventPage from '../pages/EventsPage/EventPage.vue';
import LoginPage from '../pages/Authentication/LoginPage.vue';
import RegisterPage from '../pages/Authentication/RegisterPage.vue';
import ProfilePage from '../pages/Authentication/ProfilePage.vue'

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;