/**
 * @file Application level state actions (that ultimately mutate state).
 *       https://vuex.vuejs.org/en/actions.html
 * @author Mark Conway-Greenslade
 */

import * as _ from 'lodash';
import API from '@/api';

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = async ({ commit }, { documentName, documentType, institute, project }) => {
    // Pull data from various sources.
    const projects = await API.project.getAll();
    const specializations = await API.specialization.getAll();
    const vocabs = await API.vocab.getAll();
    await commit('initialise', {
        project,
        projects,
        specializations,
        vocabs
    });

    await setSummaries({ commit }, {
        documentName,
        documentType,
        institute,
        project
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
}

/**
 * Set document summaries pulled from document API.
 */
export const setSummaries = async ({ commit }, { documentName, documentType, institute, project }) => {
    const summaries = await API.document.getMany(project, documentType);
    await commit('setSummaries', summaries);

    const summary = getInitialSummary(summaries, institute, documentName);
    await setDocument({ commit }, [ summary ]);
};

/**
 * Returns initial document summary to be used to load the initial document.
 */
const getInitialSummary = (summaries, institute, documentName) => {
    let summary, predicate;
    institute = institute || 'mohc';
    if (institute) {
        if (documentName) {
            predicate = (i) => i.canonicalName.toLowerCase() === documentName.toLowerCase() &&
                               i.institute.toLowerCase() === institute.toLowerCase();
        } else {
            predicate = (i) => i.institute.toLowerCase() === institute.toLowerCase();
        }
        summary = summaries.find(predicate);
    }

    return summary || _.sortBy(summaries, ['institute', 'canonicalName'])[0];
}
