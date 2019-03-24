import parse from '@/parsers/parseSpecialization';
import CMIP6 from '@/static/data/cmip6-specializations'

CMIP6.forEach(parse);

/**
 * Returns all specializations.
 */
export const getAll = async () => {
    return {
        cmip6: CMIP6
    };
}
