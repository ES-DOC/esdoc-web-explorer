/**
 * @file Store state mutatns.
 * @author Mark Conway-Greenslade
 */

export default {
    // Current document being viewed.
    document: null,

    // Set of documents for viewing.
    documents: null,

    // Current institute with a document being viewed.
    institution: null,

    // Set of institutes that have documented.
    institutions: [],

    // Current source (i.e. model) with a document being viewed.
    source: null,

    // Set of sources (i.e. models) that have been documented.
    sources: [],

    // Set of specialisation topics for viewing.
    topics: [],

    // Set of controlled vocabularies loaded from pyessv-ws.
    vocabs: []
}
