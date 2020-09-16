import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../pages/home.vue';
import About from '../pages/about.vue';
import Profile from '../pages/profile.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'hash',
    base: 'http_cache',
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        }
    ]
})

