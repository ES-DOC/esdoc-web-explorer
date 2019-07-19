/**
 * @file Application level state.
 *       https://vuex.vuejs.org/en/state.html
 * @author Mark Conway-Greenslade
 */

export default {
    // Application version.
    version: "1.0.7",

    // Flag indicating whether initialised or not.
    isInitialised: false,

    // Flag indicating wheter data is being loaded.
    isLoading: false,

    // Current project whose documents are being viewed.
    project: null,

    // Set of projects with viewable documents.
    projects: [],

    // Set of controlled vocabularies loaded from pyessv-ws.
    vocabs: []
}
