/**
 * @file Parses target further info url.
 * @author Mark Conway-Greenslade
 */

 import * as UTILS from '@/utils';

/**
 * Parses incoming target url.
 */
export default async (vocabs) => {
        // Extract target URL param.
    const target = UTILS.getURLParam('target', null, true);
    if (_.isNull(target)) {
        throw new Error('target URL param is undefined');
    }

    // Validate target URL param.
    const parts = target.split('.');
    if (parts.length !== 6) {
        throw new Error('target URL param is invalid');
    }

    // Unpack constituent parts.
    let [
        mipEra,
        institution,
        sourceID,
        experiment,
        subExperiment,
        variantLabel
    ] = parts;

    // Map parts to vocabularies.
    mipEra = vocabs.WCRP.GLOBAL.getMipEra(mipEra);
    institution = vocabs.WCRP.CMIP6.getInstitution(institution);
    sourceID = vocabs.WCRP.CMIP6.getSource(sourceID);
    experiment = vocabs.WCRP.CMIP6.getExperiment(experiment);
    subExperiment = subExperiment === 'none' ? undefined : subExperiment;

    // Raise vocabulary related errors.
    if (mipEra === undefined || institution === undefined ||
        sourceID === undefined || experiment === undefined) {
        throw new Error('target URL param to vocab mapping failed');
    }

    return {
        mipEra,
        institution,
        sourceID,
        experiment,
        subExperiment,
        targetURL: target,
        variantLabel        
    };
};
