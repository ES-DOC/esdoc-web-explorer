/**
 * @file Store actions (that ultimately mutate state).
 * @author Mark Conway-Greenslade
 */

import API from '@/api';
import * as UTILS from '@/utils';
import * as mtypes from './mutation-types';

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = async (ctx, { projectID }) => {
    // Set vocabularies
    const vocabs = ctx.rootState.core.vocabs;
    const topics = await API.specialisation.getTopics(projectID, vocabs);
    const data = await API.comparator.getComparatorDataForCMIP6Models(vocabs, topics);

    // Mutate state.
    ctx.commit(mtypes.INITIALISE, {
        data,
        topics,
        vocabs,
    });
};

/**
 * Sets flag indicating whether explorer has been initialised.
 */
export const setIsInitialised = async (ctx, value) => {
    ctx.commit(mtypes.SET_IS_INITIALISED, value);
}

/**
 * Set current document topic.
 */
export const setTopic = (ctx, [ topic ]) => {
    console.log(topic);
}
