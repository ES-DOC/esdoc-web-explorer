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
    const projects = await API.project.getAll();
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
    await commit('setSummary', summary);
    const document = await API.document.getOne(summary);
    await commit('setDocument', document);
    await commit('setModel', document);
}

/**
 * Set document summaries pulled from document API.
 */
export const setSummaries = async ({ commit }, { documentName, documentType, institute, project }) => {
    const summaries = await API.document.getMany(project, documentType);
    await commit('setSummaries', summaries);

    const summary = summaries.find(i => i.canonicalName.toLowerCase() === documentName.toLowerCase() &&
                                        i.institute.toLowerCase() === institute.toLowerCase());
    await setDocument({ commit }, [ summary ]);
};
