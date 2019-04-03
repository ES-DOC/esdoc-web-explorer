/**
 * @file Application entry point.
 * @author Mark Conway-Greenslade
 */

// import $ from 'jquery';
// window.$ = $;

import Vue from "vue";
import VueBootstrap from 'bootstrap-vue';
import { sync } from 'vuex-router-sync'

// Import css bundle.
import './App.scss'

Vue.use(VueBootstrap)

import App from "./App.vue";
import router from "./router";
import store from './store';
import initialise from './initialiser';
import "./registerServiceWorker";

Vue.config.productionTip = false;

// Inject into store current route information.
sync(store, router);

// Initialise application state.
initialise(window, store).then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
})
