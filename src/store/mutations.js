/**
 * @file Application level state mutations.
 *       https://vuex.vuejs.org/en/mutations.html
 * @author Mark Conway-Greenslade
 */

/**
* Initialises state store - part of application setup process.
*/
export const initialise = async (state, {
    documents,
    project,
    projects,
    topics
}) => {
    state.document = documents.current;
    state.documents = documents;
    state.project = project;
    state.projects = projects;
    state.topics = topics;
}

/**
* Sets current document.
*/
export const setDocument = async (state, document) => {
    if (document) {
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
