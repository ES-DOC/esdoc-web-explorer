/**
 * @fileOverview Exposes set of supported application routes.
 */

import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import paths from './paths/index';

// Extend Vue.
Vue.use(Router);
Vue.use(Meta, {
    keyName: '_metaInfo'
});

/**
 * Returns a configured route.
 */
const getRoute = ({ path, view, name }) => {
    return {
        name,
        path,
        component: (resolve) => {
            import(`@/views/${view}.vue`).then(resolve)
        }
    };
}

/**
 * Returns a configured router.
 */
export default new Router({
    base: process.env.BASE_URL,

    mode: 'history',

    routes: paths.map(getRoute).concat([{ path: '*', redirect: '/not-found' }]),

    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return { selector: to.hash };
        }
        return { x: 0, y: 0 };
    }
});
