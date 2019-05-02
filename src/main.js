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
import "./registerServiceWorker";

Vue.config.productionTip = false;

// Inject into store current route information.
sync(store, router);

/**
 * Initialises application state based upon initial route.
 */
const initialiseState = async (path, store) => {
    let projectID, documentType, institute, documentName;

    // Split URL paths to determine which route to load.
    const paths = path.split('/').slice(1);
    if (paths.length === 1) {
        [ projectID ] = paths;
    } else if (paths.length === 2) {
        [ projectID, documentType ] = paths;
    } else if (paths.length === 3) {
        [ projectID, documentType, institute ] = paths;
    } else {
        [ projectID, documentType, institute, documentName ] = paths;
    }

    // Override with defaults if appropriate.
    projectID = projectID || 'cmip6';
    documentType = documentType || 'models';

    // Initialise state store.
    await store.dispatch('initialise', {
        documentName,
        documentType,
        institute,
        projectID,
    });
}

// Initialise application state & render main view.
initialiseState(window.location.pathname, store).then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
})
