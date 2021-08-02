/**
 * @file Store state mutations.
 * @author Mark Conway-Greenslade
 */

/**
* Initialises state store - part of application setup process.
*/
export const initialise = (state, {
    data,
    topics,
    vocabs
}) => {
    state.data = data;
    state.topics = topics;
    state.vocabs = vocabs;
}

/**
 * Sets flag indicating whether explorer has been initialised.
 */
export const setIsInitialised = (state, isInitialised) => {
    state.isInitialised = isInitialised;
}
