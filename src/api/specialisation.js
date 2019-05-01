/**
 * @file Exposes functions for pulling specialisations.
 * @author Mark Conway-Greenslade
 */

import CMIP6 from '@/static/cmip6-specialisations'
import parse from './parsers/specialisation'

// Map of project code to specialisation set.
const ALL = {
    cmip6: CMIP6
}

// List of parsed project specialisations.
const PARSED = [];

/**
 * Returns all topics within a specialisation set.
 * @param {String} projectKey - Key of a supported project.
 */
export const getTopics = async (projectKey, vocabs) => {
    const specialisationSet = ALL[projectKey];
    if (PARSED.includes(specialisationSet) === false) {
        parse(specialisationSet, vocabs);
        PARSED.push(specialisationSet);
    }

    return specialisationSet.reduce((v, s) => v.concat(s.topics), []);
}
