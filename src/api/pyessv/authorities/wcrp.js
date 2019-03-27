/**
 * @file Wraps ES-DOC related vocabularies.
 * @author Mark Conway-Greenslade
 */

import { Authority, Scope } from '../model';

/**
 * Encapsulates access to WCRP vocabularies.
 * @extends Authority
 */
export default class extends Authority {
    /**
     * Instance ctor.
     * @param {Authority} a - The authority data pulled from remote API.
     */
    constructor (a) {
        super(a);
        this.CMIP5 = new Cmip5(a, this.getScope('cmip5'));
        this.CMIP6 = new Cmip6(a, this.getScope('cmip6'));
        this.CORDEX = new Cordex(a, this.getScope('cordex'));
        this.GLOBAL = new Global(a, this.getScope('global'));
    }
}

/**
 * Encapsulates access to WCRP CMIP5 vocabularies.
 * @extends Scope
 */
class Cmip5 extends Scope {
    /**
     * Instance ctor.
     * @param {Authority} a - The authority data pulled from remote API.
     * @param {Scope} s - The scope data pulled from remote API.
     */
    constructor (a, s) {
        super(a, s);
    }
}

/**
 * Encapsulates access to WCRP CMIP6 vocabularies.
 * @extends Scope
 */
class Cmip6 extends Scope {
    /**
     * Instance ctor.
     * @param {Authority} a - The authority data pulled from remote API.
     * @param {Scope} s - The scope data pulled from remote API.
     */
    constructor (a, s) {
        super(a, s);
    }

    /**
     * Returns either an activity vocab term or a set of activity vocab terms.
     * @param {String} name - Activity vocab term name.
     */
    getActivity (name) {
        return _.isUndefined(name) ? this.getTerms('activity-id') :
                                     this.getTerm('activity-id', name);
    }

    /**
     * Returns either an experiment vocab term or a set of experiment vocab terms.
     * @param {String} name - Experiment vocab term name.
     */
    getExperiment (name) {
        return _.isUndefined(name) ? this.getTerms('experiment-id') :
                                     this.getTerm('experiment-id', name);
    }

    /**
     * Returns either an institution vocab term or a set of institution vocab terms.
     * @param {String} name - Institution vocab term name.
     */
    getInstitution (name) {
        return _.isUndefined(name) ? this.getTerms('institution-id') :
                                     this.getTerm('institution-id', name);
    }

    /**
     * Returns either a source vocab term or a set of source vocab terms.
     * @param {String} name - Source vocab term name.
     */
    getSource (name) {
        return _.isUndefined(name) ? this.getTerms('source-id') :
                                     this.getTerm('source-id', name);
    }
}

/**
 * Encapsulates access to WCRP Cordex vocabularies.
 * @extends Scope
 */
class Cordex extends Scope {
    /**
     * Instance ctor.
     * @param {Authority} a - The authority data pulled from remote API.
     * @param {Scope} s - The scope data pulled from remote API.
     */
    constructor (a, s) {
        super(a, s);
    }
}

/**
 * Encapsulates access to WCRP global vocabularies.
 * @extends Scope
 */
class Global extends Scope {
    /**
     * Instance ctor.
     * @param {Authority} a - The authority data pulled from remote API.
     * @param {Scope} s - The scope data pulled from remote API.
     */
    constructor (a, s) {
        super(a, s);
    }

    /**
     * Returns either a mip-era vocab term or a set of mip-era vocab terms.
     * @param {String} name - Source vocab term name.
     */
     getMipEra (name) {
        return _.isUndefined(name) ? this.getTerms('mip-era') :
                                     this.getTerm('mip-era', name);
    }
}
