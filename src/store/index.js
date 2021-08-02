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
import * as cmip6FurtherInfo from './cmip6/furtherInfo/index';
import * as cmip6ModelComparator from './cmip6/modelComparator/index';

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
        cmip6: {
            namespaced: true,
            modules: {
                furtherInfo: {
                    namespaced: true,
                    ...cmip6FurtherInfo
                },
                modelComparator: {
                    namespaced: true,
                    ...cmip6ModelComparator
                }
            }
        },
    }
});
