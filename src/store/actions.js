/**
 * @file Application level state actions (that ultimately mutate state).
 *       https://vuex.vuejs.org/en/actions.html
 * @author Mark Conway-Greenslade
 */

import * as _ from 'lodash';
import API from '@/api';
import STATE from '@/store';

import { Document } from '@/view-models/cim2/model/document';
import { DocumentSet } from '@/view-models/cim2/model/documentSet';

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = async ({ commit }, { documentName, documentType, institute, projectID }) => {
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
    await commit('initialise', {
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
 * Set current document.
 */
export const setDocument = async ({ commit }, [ document ]) => {
    await commit('setDocument', document);
}

/**
 * Set current document topic.
 */
export const setDocumentTopic = async ({ commit }, [ documentTopic ]) => {
    await commit('setDocumentTopic', documentTopic);
}

/**
 * Set currently selected institute.
 */
export const setInstitution = async ({ commit }, institution) => {
    await commit('setInstitution', institution);
}

/**
 * Set currently selected source.
 */
export const setSource = async ({ commit }, source) => {
    await commit('setSource', source);
}
