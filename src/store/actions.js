/**
 * @file Application level state actions (that ultimately mutate state).
 *       https://vuex.vuejs.org/en/actions.html
 * @author Mark Conway-Greenslade
 */

import * as _ from 'lodash';
import API from '@/api';

import {
    INITIALISE,
    SET_DOCUMENT,
    SET_DOCUMENT_TOPIC,
    SET_INSTITUTION,
    SET_IS_LOADING,
    SET_SOURCE
} from './mutation-types';
import { Document } from '@/models/cim2/model/document';
import { DocumentSet } from '@/models/cim2/model/documentSet';

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = async (state, { documentName, documentType, institute, projectID }) => {
    // Set vocabulary related data
    const projects = await API.project.getAll();
    const project = projects.find(i => i.key === projectID);
    const vocabs = await API.vocab.getAll();
    const topics = await API.specialisation.getTopics(projectID, vocabs);

    // Set documents.
    let documents = await API.document.getMany(projectID, documentType);
    documents = documents.map(i => Document.create(i, topics, vocabs));
    documents = new DocumentSet(documents, institute, documentName);

    // Set institute.
    let institutions;
    institutions = vocabs.WCRP.CMIP6.getInstitution();
    institutions = institutions.filter(i => documents.all.find(j => i === j.institutionID) !== undefined);
    const institution = institutions.find(i => i.canonicalName === institute) ||
                        institutions.find(i => i.canonicalName === 'mohc');

    // Set source.
    let sources;
    sources = vocabs.WCRP.CMIP6.getSource();
    sources = sources.filter(i => i.data.institutionID.includes(institution.rawName));
    sources = sources.filter(i => documents.all.find(j => i === j.sourceID) !== undefined);
    const source = sources.find(i => i.canonicalName === documentName) || sources[0];

    // Load (initial) document content.
    documents.current.setContent(await API.document.getOne(documents.current));

    // Mutate state.
    state.commit(INITIALISE, {
        documents,
        institution,
        institutions,
        project,
        projects,
        source,
        sources,
        topics,
        vocabs
    });
};

/**
 * Set current document topic.
 */
export const setDocumentTopic = (state, [ documentTopic ]) => {
    state.commit(SET_DOCUMENT_TOPIC, documentTopic);
}

/**
 * Set currently selected institute.
 */
export const setInstitution = (state, institution) => {
    // Mutate state.
    state.commit(SET_INSTITUTION, institution);

    // Update document.
    setDocument(state);
}

/**
 * Set currently selected source.
 */
export const setSource = (state, source) => {
    // Mutate state.
    state.commit(SET_SOURCE, source);

    // Update document.
    setDocument(state);
}

/**
 * Set currently selected document.
 */
const setDocument = async (state) => {
    // Set document.
    const { documents, institution, source } = state.state;
    const document = documents.getDocument(
        institution.canonicalName,
        source.canonicalName
    );

    // Load content (if necessary).
    if (document.content === null) {
        await setDocumentContent(state, document);
    }

    // Mutate state.
    state.commit(SET_DOCUMENT, document);
}

/**
 * Set currently selected document.
 */
const setDocumentContent = async (state, document) => {
    // Signal background event.
    state.commit(SET_IS_LOADING, true);

    // Load content from API.
    document.setContent(await API.document.getOne(document));

    // Signal background event.
    setTimeout(() => {
        state.commit(SET_IS_LOADING, false);
    }, 500);  // N.B timer avoids UI flicker
}
