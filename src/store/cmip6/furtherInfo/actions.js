/**
 * @file Store actions (that ultimately mutate state).
 * @author Mark Conway-Greenslade
 */

import API from '@/api';
import * as UTILS from '@/utils';
import * as mtypes from './mutation-types';
import urlFactory from './urlFactory';
import urlParser from './urlParser';

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = async (ctx) => {
    // Set vocabularies
    const vocabs = ctx.rootState.core.vocabs;

    // Set metadata extracted from url.
    const parsed = await urlParser(vocabs);
    const urls = await urlFactory(parsed);

    // Mutate state.
    ctx.commit(mtypes.INITIALISE, {
        urls,
        vocabs,
        ...parsed
    });
};

/**
 * Sets flag indicating whether explorer has been initialised.
 */
export const setIsInitialised = async (ctx, value) => {
    ctx.commit(mtypes.SET_IS_INITIALISED, value);
}

