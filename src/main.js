/**
 * @file Application entry point.
 * @author Mark Conway-Greenslade
 */

import Vue from "vue";
import VueBootstrap from 'bootstrap-vue';
import { sync } from 'vuex-router-sync'

// Import css bundle.
import './App.scss'

Vue.use(VueBootstrap)

import App from "./App.vue";
import router from "./router";
import store from './store';
import _ from './store/cim2/model';
import "./registerServiceWorker";

Vue.config.productionTip = false;

// Inject into store current route information.
sync(store, router);

/**
 * Returns application initialisation parameters derived from URL.
 */
const getInitialisationParams = (path) => {
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

    return {
        documentName,
        documentType : documentType || 'models',
        institute,
        projectID: projectID || 'cmip6'
    }
}

const initialise = async () => {
    // Render initial view.
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");

    // Initialise state store.
    const params = getInitialisationParams(window.location.pathname);
    await store.dispatch('cim2/model/initialise', params);
}

initialise();
