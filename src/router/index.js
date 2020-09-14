import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../pages/home.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../pages/about.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../pages/profile.vue')
        }
    ]
})

