/**
 * @file CMIP6 further-info state.
 * @author Mark Conway-Greenslade
 */

export default {
    // Parsed experiment.
    experiment: null,

    // Parsed institution identifier.
    institution: null,

    // Flag indicating whether initialised or not.
    isInitialised: false,

    // Label for the mip era - could come from vocabs.
    mipEra: null,

    // Parsed source identifier.
    sourceID: null,

    // Downloaded source summary.
    sourceSummary: null,

    // Parsed sub experiment.
    subExperiment: null,

    // URL constants.
    urls: null,

    // Parsed variant describing the position of an individual simulation within the ensemble for the experiment.
    variantLabel: null,

    // Set of controlled vocabularies loaded from pyessv-ws.
    vocabs: []
}


