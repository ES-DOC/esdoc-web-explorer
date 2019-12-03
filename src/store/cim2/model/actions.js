/**
 * @file Store actions (that ultimately mutate state).
 * @author Mark Conway-Greenslade
 */

import * as _ from 'lodash';

import API from '@/api';
import { Document } from '@/models/cim2/model/document';
import { DocumentSet } from '@/models/cim2/model/documentSet';
import { UserMessageInfo, UserMessageType } from '@/models/core/userMessage';
import * as mtypes from './mutation-types';

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = async (ctx, { documentName, documentType, institute, projectID }) => {
    // Set vocabulary related data
    const vocabs = ctx.rootState.core.vocabs;
    const topics = await API.specialisation.getTopics(projectID, vocabs);

    // Set documents.
    let documents = await API.document.getMany(projectID, documentType);
    documents = documents.map(i => Document.create(i, topics, vocabs));
    documents = new DocumentSet(documents, institute, documentName);

    // Set institutes.
    let institutions;
    institutions = vocabs.WCRP.CMIP6.getInstitution();
    institutions = institutions.filter(
        i => documents.all.find(j => i === j.institutionID) !== undefined
    );

    // Set initial institute.
    const institution = institutions.find(i => i.canonicalName === institute) ||
                        institutions.find(i => i.canonicalName === 'mohc');

    // Set sources.
    let sources;
    sources = vocabs.WCRP.CMIP6.getSource();
    sources = sources.filter(i => i.data.institutionID.includes(institution.rawName));
    sources = sources.filter(i => documents.all.find(j => i === j.sourceID) !== undefined);

    // Set initial source.
    const source = sources.find(i => i.canonicalName === documentName) || sources[0];

    // Load (initial) document content.
    documents.current.setContent(await API.document.getOne(documents.current));

    // Mutate state.
    ctx.commit(mtypes.INITIALISE, {
        documents,
        institution,
        institutions,
        source: source || sources[0],
        sources,
        topics,
        vocabs
    });

    // Mutate application level state.
    await setDocumentInfo(ctx, documents.current);

    // Display warning message when initial document was overridden.
    if (documents.current.wasOverridden) {
        await onDocumentOverridden(ctx, institute, documentName);
    }
};

/**
 * Invoked when requested document could not be found and is overridden by the default document.
 */
const onDocumentOverridden = async (ctx, institute, documentName) => {
    const msg = `${institute.toUpperCase()} > ${documentName.toUpperCase()} documentation not found.`;
    const userMessageInfo = new UserMessageInfo(msg, null, UserMessageType.Warning);
    await ctx.dispatch('core/setUserMessage', userMessageInfo, { root: true });
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
    // Escape if already assigned - can occur when user switches institute.
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

    // Mutate application level state.
    await setDocumentInfo(ctx, document);
}

/**
 * Set currently selected document.
 */
export const setDocumentContent = async (ctx, document) => {
    // Signal background event.
    await ctx.dispatch('core/setIsLoading', true, { root: true });

    // Load content from API.
    const content = await API.document.getOne(document)
    document.setContent(content);

    // Signal background event - n.b. timer avoids UI flicker.
    setTimeout(async () => {
        await ctx.dispatch('core/setIsLoading', false, { root: true });
    }, 500);
}

/**
 * Set current document topic.
 */
export const setDocumentInfo = async (ctx, document) => {
    await ctx.dispatch('core/setDocumentInfo', {
        documentLabel: document.label,
        documentType: document.typeShortName
    }, { root: true });
}

/**
 * Set current document topic.
 */
export const setDocumentTopic = (ctx, [ documentTopic ]) => {
    ctx.commit(mtypes.SET_DOCUMENT_TOPIC, documentTopic);
}
