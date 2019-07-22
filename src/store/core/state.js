/**
 * @file Application level state.
 *       https://vuex.vuejs.org/en/state.html
 * @author Mark Conway-Greenslade
 */

export default {
    // Short label of currently loaded document.
    documentLabel: null,

    // Type of currently loaded document.
    documentType: null,

    // Flag indicating whether initialised or not.
    isInitialised: false,

    // Flag indicating wheter data is being loaded.
    isLoading: false,

    // User message information.
    userMessage: {
        // Details such as message, title, type.
        details: {
            message: 'DDDDD',

            title: 'YYYYY',

            type: 'Info'
        },

        // Flag indicating whether message is to be displayed or not.
        isVisible: false
    },

    // Current project whose documents are being viewed.
    project: null,

    // Set of projects with viewable documents.
    projects: [],

    // Application version.
    version: "1.0.8",

    // Set of controlled vocabularies loaded from pyessv-ws.
    vocabs: []
}
