/**
 * @file Application state store.
 *       https://vuex.vuejs.org/en
 * @author Mark Conway-Greenslade
 */

import Vue from 'vue';
import Vuex from 'vuex';

// Inject vuex --> vue.
Vue.use(Vuex);

// Import store modules.
import * as core from './core/index';
import * as cim2Model from './cim2/model/index';

// Instantiate store
export default new Vuex.Store({
    modules: {
        core: {
            namespaced: true,
            ...core
        },
        cim2: {
            namespaced: true,
            modules: {
                model: {
                    namespaced: true,
                    ...cim2Model
                }
            }
        },
    }
});
