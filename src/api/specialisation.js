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

// Parse.
Object.values(ALL).forEach(parse);

/**
 * Returns all topics within a specialisation set.
 * @param {String} projectKey - Key of a supported project.
 */
export const getTopics = async (projectKey) => {
    return ALL[projectKey].reduce((v, s) => v.concat(s.topics), []);
}
