/**
 * @file CMIP6 source identifiers.
 * @author Mark Conway-Greenslade
 */

/**
 * Wraps CMIP6 source identifier vocabulary information.
 * @constructor
 * @param {Term} source - Source meta-data pulled from pyessv.
 * @param {Term} institution - Institute meta-data pulled from pyessv.
 */
export class Source {
    constructor (source, institution, summary) {
        this.inScope = summary !== undefined;
        this.institution = institution;
        this.institutionLabel = institution.label.toLowerCase().endsWith('-consortium') ?
            institution.label.slice(0, -11) : institution.label;
        this.source = source;
        this.summary = summary;
    }

    /**
     * Returns an extended label for various UI contexts.
     */
    get fullLabel() {
        return `${this.institutionLabel} > ${this.source.label}`
    }
}

/**
 * Manages a list of CMIP6 source identifiers.
 */
export class SourceList {
    constructor () {
        this.all = [];
        this.current = null;
    }

    /**
     * Returns all items considered to be in scope.
     */
    get inScope() {
        return this.all.filter(i => i.inScope);
    }

    /**
     * Appends an item to managed collection.
     */
    append (item) {
        if (item instanceof Source === false) {
            throw new TypeError('Invalid type instance: expected Source');
        }

        this.all.push(item);
        this.current = this.current || item;
    }
}
