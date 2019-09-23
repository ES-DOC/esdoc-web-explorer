/**
 * @file Store state mutations.
 * @author Mark Conway-Greenslade
 */

/**
* Initialises state store - part of application setup process.
*/
export const initialise = (state, {
    mipEra,
    institution,
    sourceID,
    experiment,
    subExperiment,
    targetURL,
    urls,
    variantLabel,
    vocabs
}) => {
    state.mipEra = mipEra;
    state.institution = institution;
    state.sourceID = sourceID;
    state.experiment = experiment;
    state.subExperiment = subExperiment;
    state.targetURL = targetURL;
    state.urls = urls;
    state.variantLabel = variantLabel;
    state.vocabs = vocabs;
}

/**
 * Sets flag indicating whether explorer has been initialised.
 */
export const setIsInitialised = (state, isInitialised) => {
    state.isInitialised = isInitialised;
}
