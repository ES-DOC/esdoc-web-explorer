/**
 * @file Application level state actions (that ultimately mutate state).
 *       https://vuex.vuejs.org/en/actions.html
 * @author Mark Conway-Greenslade
 */

import * as _ from 'lodash';
import API from '@/api';
import domain from '@/models';
import STATE from '@/store';

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = async ({ commit }, { documentName, documentType, institute, project }) => {
    // Pull data from various sources.
    const projects = await API.project.getAll();
    const specializations = await API.specialization.getAll();
    const specialization = specializations[project];
    const vocabs = await API.vocab.getAll();

    const summaries = await API.document.getMany(project, documentType);

    const summary = getInitialSummary(summaries, institute, documentName);
    const document = await API.document.getOne(summary);

    const sourceList = domain.getSourceList({ summaries, vocabs });
    document.topicTree = domain.getTopicTree({ document, specialization, vocabs });

    await commit('initialise', {
        document,
        project,
        projects,
        sourceList,
        specializations,
        summaries,
        summary,
        vocabs
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
 * Set source instance.
 */
export const setSource = async ({ commit }, [ { summary } ]) => {
    const document = await API.document.getOne(summary);
    await commit('setSummary', summary);
    await commit('setDocument', document);
}

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
