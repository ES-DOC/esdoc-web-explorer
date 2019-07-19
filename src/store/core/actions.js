/**
 * @file Store actions (that ultimately mutate state).
 * @author Mark Conway-Greenslade
 */

import API from '@/api';
import * as mtypes from './mutation-types';

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = async (ctx, { projectID }) => {
    // Set vocabulary related data
    const projects = await API.project.getAll();
    const project = projects.find(i => i.key === projectID);
    const vocabs = await API.vocab.getAll();

    // Mutate state.
    ctx.commit(mtypes.INITIALISE, {
        project,
        projects,
        vocabs
    });
};

/**
 * Sets information pertaining to currently loaded document.
 */
export const setDocumentInfo = async (ctx, documentInfo) => {
    ctx.commit(mtypes.SET_DOCUMENT_INFO, documentInfo);
}

/**
 * Sets flag indicating whether explorer has been initialised.
 */
export const setIsInitialised = async (ctx, value) => {
    ctx.commit(mtypes.SET_IS_INITIALISED, value);
}

/**
 * Sets flag indicating whether a document is being loaded into memory.
 */
export const setIsLoading = async (ctx, value) => {
    ctx.commit(mtypes.SET_IS_LOADING, value);
}
