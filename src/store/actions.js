/**
 * @file Application level state actions (that ultimately mutate state).
 *       https://vuex.vuejs.org/en/actions.html
 * @author Mark Conway-Greenslade
 */

import * as _ from 'lodash';
import API from '@/api';
import STATE from '@/store';

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = async ({ commit }, { documentName, documentType, institute, project }) => {
    // Pull data from various sources.
    const projects = await API.project.getAll();
    const specialisationSets = await API.specialisation.getAll();
    const specialisationSet = specialisationSets[project];
    const vocabs = await API.vocab.getAll();

    const summaries = await API.document.getMany(project, documentType);
    const documentList = getSourceList({ summaries, vocabs });

    const summary = getInitialSummary(summaries, institute, documentName);
    const document = await API.document.getOne(summary);

    await commit('initialise', {
        document,
        documentList,
        projectKey: project,
        projects,
        specialisationSet,
        specialisationSets,
        summaries,
        summary,
        vocabs
    });
};

/**
 * Set current specialisation topic.
 */
export const setTopic = async ({ commit }, [ topicInfo ]) => {
    await commit('setTopic', topicInfo);
}

/**
 * Set current document.
 */
export const setDocument = async ({ commit }, [ { summary } ]) => {
    await commit('setDocument', {
        document: await API.document.getOne(summary),
        summary
    });
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

/**
 * Maps data inputs into view model instances.
 * @param {Class} Source - Source information wrapper.
 * @param {Class} SourceList - Source list information wrapper.
 * @param {Object} vocabs - Vocabulary meta-data pulled from pyessv.
 */
const getSourceList = ({ vocabs, summaries }) => {
    const result = new SourceList();
    for (const sourceID of vocabs.WCRP.CMIP6.getSource()) {
        for (const institutionID of sourceID.data.institutionID) {
            const summary = summaries.find(i => {
                return i.institute.toLowerCase() === institutionID.toLowerCase() &&
                       i.canonicalName.toLowerCase() === sourceID.canonicalName;
            });
            const institution = vocabs.WCRP.CMIP6.getInstitution(institutionID);

            result.append({
                inScope: summary !== undefined,
                institution: institution,
                institutionLabel: institution.label.toLowerCase().endsWith('-consortium') ?
                    institution.label.slice(0, -11) : institution.label,
                source: sourceID,
                summary: summary
            });
        }
    }

    return result;
};

/**
 * Manages a list of CMIP6 source identifiers.
 */
class SourceList {
    constructor () {
        this.all = [];
        this.current = null;
    }

    /**
     * Returns all items considered to be in scope.
     */
    get inScope() {
        return this.all.filter(i => i.inScope);
    }

    /**
     * Appends an item to managed collection.
     */
    append (item) {
        this.all.push(item);
        this.current = this.current || item;
    }
}
