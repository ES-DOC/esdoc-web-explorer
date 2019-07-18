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
import * as shared from './shared/index';
import * as cim2Model from './cim2/model/index';

// Instantiate store
export default new Vuex.Store({
    ...shared,
    modules: {
        cim2: {
            namespaced: true,
            model: {
                namespaced: true,
                ...cim2Model
            }
        }
    }
});
