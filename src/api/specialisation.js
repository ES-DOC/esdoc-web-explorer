/**
 * @file Exposes functions for pulling specialisations.
 * @author Mark Conway-Greenslade
 */

import CMIP6 from '@/static/cmip6-specialisations'
import parse from './parsers/specialisation'

// Parse in order to inject helper attributes.
parse(CMIP6);

/**
 * Returns all specialisations.
 */
export const getAll = async () => {
    return {
        cmip6: CMIP6
    };
}
