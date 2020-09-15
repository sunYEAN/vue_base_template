import "./messageBox.css";
import Info from './info';
import Loading from './loading';
import Error from './error';
import Vue from 'vue';

const Components = {
    info: Info,
    error: Error,
    loading: Loading
};

const instances = {};

// toast组件公用部分
const initialMix = {
    data () {
        return {
            message: '',
            visible: false
        }
    },
    mounted () {
        this._timer = null;
    },
    methods: {
        show (message, interval = 2000) {
            this.visible = true;
            this.message = message;
            this._timer && clearTimeout(this._timer);
            if (interval) {
                this._timer = setTimeout(() => {
                    this.visible = false;
                }, interval)
            }
        },
        hide () {
            this.visible = false;
            this._timer && clearTimeout(this._timer);
        }
    }
};


function createMessageBox(type) {
    let instance = instances[type];
    if (!instance) {
        const VueCtor = Vue.extend(Object.assign(Components[type], initialMix));
        instances[type] = instance = new VueCtor();
        let el = instance.$mount().$el;
        document.body.appendChild(el);
    }
    return {
        show: instance.show,
        hide: instance.hide
    }
}

function install(Vue) {
    Vue.prototype.$info = createMessageBox('info');
    Vue.prototype.$error = createMessageBox('error');
    Vue.prototype.$loading = createMessageBox('loading');
}

export default {
    install,
    createMessageBox,
}
export {
    install,
    createMessageBox
}
