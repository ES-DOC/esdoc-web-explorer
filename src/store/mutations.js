/**
 * @file Application level state mutations.
 *       https://vuex.vuejs.org/en/mutations.html
 * @author Mark Conway-Greenslade
 */
import API from '@/api';

/**
* Initialises state store - part of application setup process.
*/
export const initialise = async (state, {
    documents,
    institution,
    institutions,
    project,
    projects,
    source,
    sources,
    topics,
    vocabs
}) => {
    state.document = documents.current;
    state.documents = documents;
    state.institution = institution;
    state.institutions = institutions;
    state.project = project;
    state.projects = projects;
    state.source = source;
    state.sources = sources;
    state.topics = topics;
    state.vocabs = vocabs;
}

/**
* Sets current document.
*/
export const setDocument = async (state, document) => {
    if (document) {
        // Load (JIT) document content.
        if (document.content === null) {
            state.isLoading = true;
            document.setContent(await API.document.getOne(document));
            setTimeout(() => { state.isLoading = false; }, 500);  // N.B timer avoids UI flicker
        }
        state.documents.setDocument(document);
        state.document = document;
    }
}

/**
* Sets current document topic.
*/
export const setDocumentTopic = async (state, topicInfo) => {
    if (topicInfo) {
        state.document.setTopic(topicInfo);
    }
}

/**
* Sets current institute.
*/
export const setInstitution = async (state, institution) => {
    // Set institute.
    state.institution = institution;

    // Set sources.
    await setSources(state, institution);
}

/**
* Sets set of sources.
*/
export const setSources = async (state, institution) => {
    // Set sources.
    state.sources = state.vocabs.WCRP.CMIP6.getSource()
        .filter(i => i.data.institutionID.includes(institution.rawName))
        .filter(i => state.documents.all.find(j => i === j.sourceID) !== undefined);

    // Set source.
    await setSource(state, state.sources[0]);
}

/**
* Sets current source.
*/
export const setSource = async (state, source) => {
    // Set source.
    state.source = source;

    // Set document.
    const document = state.documents.getDocument(
        state.institution.canonicalName,
        state.source.canonicalName
    )
    await setDocument(state, document);
}
