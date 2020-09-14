import Vue from 'vue';
import Vuex from 'vuex';

const moduleMap = require.context('./', false, /\.js$/);

function createModule (moduleMap) {
    let module = {};
    moduleMap.keys().forEach(key => {
        key.replace(/\.\/(.*).js$/, reg => {
            const name = RegExp.$1;
            if (name === 'index') return;
            module[name] = moduleMap(key).default;
        });
    });
    return module;
}

Vue.use(Vuex);

export default new Vuex.Store({
    modules: createModule(moduleMap),
    state: {},
    getters: {},
    actions: {},
    mutations: {}
});
