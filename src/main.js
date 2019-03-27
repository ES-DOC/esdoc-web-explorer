/**
 * @file Application entry point.
 * @author Mark Conway-Greenslade
 */

import * as _ from 'lodash';
import $ from 'jquery';
window.$ = $;

import Vue from "vue";
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'

// Import bootstrap css bundles.
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueBootstrap from 'bootstrap-vue';
Vue.use(VueBootstrap)

import App from "./App.vue";
import router from "./router";
import store from './store';
import "./registerServiceWorker";

Vue.config.productionTip = false;

// Inject into store current route information.
sync(store, router);

// Initialise application state.
store.dispatch('initialise', 'cmip6').then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
});
