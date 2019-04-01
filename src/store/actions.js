/**
 * @file Application level state actions (that ultimately mutate state).
 *       https://vuex.vuejs.org/en/actions.html
 * @author Mark Conway-Greenslade
 */

import API from '@/api';

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = async ({ commit }, project) => {
    await commit('initialise', {
        project,
        projects: await API.project.getAll(),
        specializations: await API.specialization.getAll(),
        vocabs: await API.vocab.getAll()
    });
};

/**
 * Update current project.
 */
export const updateProject = async ({ commit }, project) => {
    await commit('updateProject', project);
};

/**
 * Set current specialization topic.
 */
export const setTopic = async ({ commit }, [ topic ]) => {
    await commit('setTopic', topic);
}

/**
 * Set current document.
 */
export const setDocument = async ({ commit }, [ summary ]) => {
    const document = await API.document.getOne(summary);
    await commit('setSummary', summary);
    await commit('setDocument', document);
}

/**
 * Set document summaries pulled from document API.
 */
export const setSummaries = async ({ commit }, { documentName, documentType, institute, project }) => {
    const summaries = await API.document.getMany(project, documentType);
    const summary = summaries.find(i => i.canonicalName.toLowerCase() === documentName.toLowerCase() &&
                                        i.institute.toLowerCase() === institute.toLowerCase());
    const document = await API.document.getOne(summary);
    await commit('setSummaries', summaries);
    await commit('setSummary', summary);
    await commit('setDocument', document);
};
