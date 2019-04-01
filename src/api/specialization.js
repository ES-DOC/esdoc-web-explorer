/**
 * @file Exposes functions for pulling specializations.
 * @author Mark Conway-Greenslade
 */

import CMIP6 from '@/static/cmip6-specializations'
import parse from './parsers/specialisation'

// Parse in order to inject helper attributes.
parse(CMIP6);

/**
 * Returns all specializations.
 */
export const getAll = async () => {
    return {
        cmip6: CMIP6
    };
}
