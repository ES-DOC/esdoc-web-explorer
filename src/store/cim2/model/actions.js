/**
 * @file Store actions (that ultimately mutate state).
 * @author Mark Conway-Greenslade
 */

import * as _ from 'lodash';

import API from '@/api';
import { Document } from '@/models/cim2/model/document';
import { DocumentSet } from '@/models/cim2/model/documentSet';
import * as mtypes from './mutation-types';

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = async (ctx, { documentName, documentType, institute, projectID }) => {
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
    ctx.commit(mtypes.INITIALISE, {
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
export const setDocumentTopic = (ctx, [ documentTopic ]) => {
    ctx.commit(mtypes.SET_DOCUMENT_TOPIC, documentTopic);
}

/**
 * Set currently selected institute.
 */
export const setInstitution = async (ctx, institution) => {
    // Mutate state.
    ctx.commit(mtypes.SET_INSTITUTION, institution);

    // Update document.
    await ctx.dispatch('setDocument');
}

/**
 * Set currently selected source.
 */
export const setSource = async (ctx, source) => {
    // Escape if already assigned.
    if (ctx.state.source === source) {
        return;
    }

    // Mutate state.
    ctx.commit(mtypes.SET_SOURCE, source);

    // Update document.
    await ctx.dispatch('setDocument');
}

/**
 * Set currently selected document.
 */
export const setDocument = async (ctx) => {
    // Set document.
    const { documents, institution, source } = ctx.state;
    const document = documents.getDocument(
        institution.canonicalName,
        source.canonicalName
    );

    // Load content (if necessary).
    if (document.content === null) {
        await ctx.dispatch('setDocumentContent', document);
    }

    // Mutate state.
    ctx.commit(mtypes.SET_DOCUMENT, document);
}

/**
 * Set currently selected document.
 */
export const setDocumentContent = async (ctx, document) => {
    // Signal background event.
    await ctx.dispatch('app/setIsLoading', true, { root: true });

    // Load content from API.
    const content = await API.document.getOne(document)
    document.setContent(content);

    // Signal background event.
    setTimeout(async () => {
        await ctx.dispatch('app/setIsLoading', false, { root: true });
    }, 500);  // N.B timer avoids UI flicker
}
