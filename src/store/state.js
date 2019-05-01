/**
 * @file Application level state.
 *       https://vuex.vuejs.org/en/state.html
 * @author Mark Conway-Greenslade
 */

export default {
    // Application specific state.
    app: {
        version: "0.2.0"
    },

    // Current document being viewed.
    document:null,

    // Set of documents for viewing.
    documents: null,

    // Current project whise documents are being viewed.
    project: null,

    // Set of projects with viewable documents.
    projects: [],

    // Set of specialisation topics for viewing.
    topics: [],
}
