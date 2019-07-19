/**
 * @file Store actions (that ultimately mutate state).
 * @author Mark Conway-Greenslade
 */

import {
    SET_IS_INITIALISED,
    SET_IS_LOADING
} from './mutation-types';

/**
 * Sets flag indicating whether explorer has been initialised.
 */
export const setIsInitialised = async (ctx, value) => {
    ctx.commit(SET_IS_INITIALISED, value);
}

/**
 * Sets flag indicating whether a document is being loaded into memory.
 */
export const setIsLoading = async (ctx, value) => {
    ctx.commit(SET_IS_LOADING, value);
}
