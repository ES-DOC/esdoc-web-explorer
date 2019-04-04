/**
 * @file Application level state.
 *       https://vuex.vuejs.org/en/state.html
 * @author Mark Conway-Greenslade
 */

export default {
    summary: {
        all: [],
        current: null
    },

    document: {
        all: [],
        current: null
    },

    mapOfTopicToDocument: {},

    project: {
        all: [],
        current: null
    },

    specialization: {
        all: [],
        topic: null,
        topics: [],
        topicsInScope: [],
        current: null
    },

    vocabs: null
}
