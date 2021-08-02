/**
 * @file Exposes functions for parsing conparator data.
 * @author Mark Conway-Greenslade
 */

/**
 * Parses CMIP6 model comparator data to simplify downstream processing.
 * @param {Object} vocabs - Parsed pyessv vocabularies.
 * @param {Object} topics - Parsed topics.
 * @param {Object} data - Unparsed cmip6 data.
 */
export default (vocabs, topics, { nodes, edges }) => {

    const nodes1 = {
        institutes: getParsedNodes(nodes, 0, i => vocabs.WCRP.CMIP6.getInstitution(i) ),
        models: getParsedNodes(nodes, 1, i => vocabs.WCRP.CMIP6.getSource(i) ),
        realms: getParsedNodes(nodes, 2),
        specialisations: getParsedNodes(nodes, 3),
        values: getParsedNodes(nodes, 4),
    }
    console.log(nodes1);

    return {
        nodes,
        edges,
    }
};

// Returns URL query param value.
// @nodes                URL query param name.
// @nodeIdx        URL query param default value.
// @vocabGetterFn          Flag indicating whether the result will be converted to lower case or not.
const getParsedNodes = (nodes, nodeIdx, vocabGetterFn) => {
    return nodes.filter(i => i[0] == nodeIdx).map(i => {
        if (vocabGetterFn) {
            return {
                canonicalName: i[2],
                idx: i[1],
                term: vocabGetterFn(i[2]),
            };    
        } else {
            return {
                canonicalName: i[2],
                idx: i[1],
            };    
        }
    })    
};
