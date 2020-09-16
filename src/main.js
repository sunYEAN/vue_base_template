if (process.env.NODE_ENV === 'deve') {
    const VConsole = require('vconsole');
    new VConsole();
    import('vconsole').then(res => {
        new res.default();
    })
}
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
