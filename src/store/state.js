/**
 * @file Application level state.
 *       https://vuex.vuejs.org/en/state.html
 * @author Mark Conway-Greenslade
 */

export default {
    // Application specific state.
    app: {
        version: "1.0.1"
    },

    // Current document being viewed.
    document:null,

    // Set of documents for viewing.
    documents: null,

    // Current institute with a document being viewed.
    institution: null,

    // Set of institutes that have documented.
    institutions: [],

    // Current project whise documents are being viewed.
    project: null,

    // Set of projects with viewable documents.
    projects: [],

    // Current source (i.e. model) with a document being viewed.
    source: null,

    // Set of sources (i.e. models) that have been documented.
    sources: [],

    // Set of specialisation topics for viewing.
    topics: [],
}
