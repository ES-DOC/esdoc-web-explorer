import * as _ from 'lodash';
import $ from 'jquery';
window.$ = $;

import Vue from "vue";
import VueBootstrap from 'bootstrap-vue';

Vue.use(VueBootstrap)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from "./App.vue";

// Sync router with store
import { sync } from 'vuex-router-sync'

import defaults from '@/static/data/defaults.json';
import router from "@/router";
import store from './store/index';
import "./registerServiceWorker";

Vue.config.productionTip = false;

// Inject into store current route information.
sync(store, router);

store.dispatch('initialise', defaults).then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
});
