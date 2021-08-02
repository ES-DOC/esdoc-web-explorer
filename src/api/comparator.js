/**
 * @file Exposes functions for pulling specialisations.
 * @author Mark Conway-Greenslade
 */

import CMIP6_MODEL_COMPARATOR_DATA from '@/static/cmip6-model-comparator'
import parser from './parsers/cmip6'

/**
 * Returns model comparator specialisation dataset.
 * @param {String} projectKey - Key of a supported project.
 */
export const getComparatorDataForCMIP6Models = async (vocabs, topics) => {
    return parser.parseModelComparisonData(vocabs, topics, CMIP6_MODEL_COMPARATOR_DATA);
};
