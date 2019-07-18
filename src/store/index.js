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
import * as app from './app/index';
import * as cim2Model from './cim2/model/index';

// Instantiate store
export default new Vuex.Store({
    modules: {
        app: {
            namespaced: true,
            ...app
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
