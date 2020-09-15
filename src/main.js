import 'lib-flexible/flexible';
import 'reset.css';
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import request from './utils/request';
import MessageBox from './components/MessageBox';

Vue.prototype.$http = request;

Vue.use(MessageBox);

new Vue({
    el: '#app',
    store,
    router,
    render: (h) => h(App)
});
