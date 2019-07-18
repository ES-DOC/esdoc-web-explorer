/**
 * @file Application state store.
 *       https://vuex.vuejs.org/en
 * @author Mark Conway-Greenslade
 */

import store from '@/store';

// Import store accessors/mutators/state.
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import state from './state';

// store.registerModule('cim2/model', {
//   actions,
//   getters,
//   mutations,
//   state
// });

export {
    actions,
    getters,
    mutations,
    state
}
