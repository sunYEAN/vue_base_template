import './index.css';
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import request from './utils/request';

Vue.prototype.$http = request;

new Vue({
    el: '#app',
    store,
    router,
    render: (h) => h(App)
});
