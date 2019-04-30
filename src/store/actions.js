/**
 * @file Application level state actions (that ultimately mutate state).
 *       https://vuex.vuejs.org/en/actions.html
 * @author Mark Conway-Greenslade
 */

import * as _ from 'lodash';
import API from '@/api';
import STATE from '@/store';

import { Document } from '@/view-models/cim2-model/document';
import { DocumentSet } from '@/view-models/cim2-model/documentSet';

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = async ({ commit }, { documentName, documentType, institute, project }) => {
    // Pull from API
    let documents = await API.document.getMany(project, documentType);
    const projects = await API.project.getAll();
    const topics = await API.specialisation.getTopics(project);
    const vocabs = await API.vocab.getAll();

    // Set documents.
    documents = documents.map(i => Document.create(i, topics, vocabs));
    documents = new DocumentSet(documents, institute, documentName);

    // Load (initial) document content.
    documents.current.setContent(await API.document.getOne(documents.current));

    // Mutate state.
    await commit('initialise', {
        documents,
        project: projects.find(i => i.key === project),
        projects,
        topics
    });
};

/**
 * Set current document.
 */
export const setDocument = async ({ commit }, [ document ]) => {
    // Load (JIT) document content.
    if (document.content === null) {
        document.setContent(await API.document.getOne(document));
    }

    // Mutate state.
    await commit('setDocument', document);
}

/**
 * Set current document topic.
 */
export const setDocumentTopic = async ({ commit }, [ documentTopic ]) => {
    await commit('setDocumentTopic', documentTopic);
}
