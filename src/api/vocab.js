import * as PYESSV from '@/utils/pyessv/index'

/**
 * Returns all supported vocabs.
 */
export const getAll = async () => {
    return await PYESSV.initialise();
}
