/**
 * @file Store state mutations.
 * @author Mark Conway-Greenslade
 */

/**
* Initialises state store - part of application setup process.
*/
export const initialise = (state, {
    documents,
    institution,
    institutions,
    source,
    sources,
    topics,
    vocabs
}) => {
    state.document = documents.current;
    state.documents = documents;
    state.institution = institution;
    state.institutions = institutions;
    state.source = source;
    state.sources = sources;
    state.topics = topics;
    state.vocabs = vocabs;
}

/**
* Sets current document.
*/
export const setDocument = (state, document) => {
    state.documents.setDocument(document);
    state.document = document;
}

/**
* Sets current document topic.
*/
export const setDocumentTopic = (state, topicInfo) => {
    if (topicInfo) {
        state.document.setTopic(topicInfo);
    }
}

/**
* Sets current institute.
*/
export const setInstitution = (state, institution) => {
    // Set institute.
    state.institution = institution;

    // Set sources.
    setSources(state, institution);
}

/**
* Sets flag indicating whether a document is being loaded into memory.
*/
export const setIsLoading = (state, isLoading) => {
    state.isLoading = isLoading;
}

/**
* Sets set of sources.
*/
export const setSources = (state, institution) => {
    // Set sources.
    state.sources = state.vocabs.WCRP.CMIP6.getSource()
        .filter(i => i.data.institutionID.includes(institution.rawName))
        .filter(i => state.documents.all.find(j => i === j.sourceID) !== undefined);

    // Set source.
    setSource(state, state.sources[0]);
}

/**
* Sets current source.
*/
export const setSource = (state, source) => {
    // Set source.
    state.source = source;
}
