/**
 * @file Application state store.
 *       https://vuex.vuejs.org/en
 * @author Mark Conway-Greenslade
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// Import store accessors/mutators/state.
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import state from './state'

// Instantiate store
export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
});
