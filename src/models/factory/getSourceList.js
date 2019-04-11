/**
 * @file CMIP6 source identifiers.
 * @author Mark Conway-Greenslade
 */

/**
 * Maps data inputs into view model instances.
 * @param {Class} Source - Source information wrapper.
 * @param {Class} SourceList - Source list information wrapper.
 * @param {Object} vocabs - Vocabulary meta-data pulled from pyessv.
 */
export default ({ Source, SourceList }, { vocabs, summaries }) => {
    const result = new SourceList();
    for (const sourceID of vocabs.WCRP.CMIP6.getSource()) {
        for (const institutionID of sourceID.data.institutionID) {
            const summary = summaries.find(i => {
                return i.institute.toLowerCase() === institutionID.toLowerCase() &&
                       i.canonicalName.toLowerCase() === sourceID.canonicalName;
            });
            const institution = vocabs.WCRP.CMIP6.getInstitution(institutionID);
            const source = new Source(sourceID, institution, summary);
            result.append(source);
        }
    }

    return result;
};
