/**
 * @file Exposes functions for parsing CIM v2 documents.
 * @author Mark Conway-Greenslade
 */

import parseModel from './model';

// Map: Cim v2 document type <-> document parser.
const PARSERS = {
    'cim.2.science.Model': parseModel
}

/**
 * Parses a CIM v2 document pulled from remote API.
 * @param {Object} doc - A CIM v2 document.
 */
export default (doc) => {
    const parser  = PARSERS[doc.meta.type];

    return parser(doc);
}
