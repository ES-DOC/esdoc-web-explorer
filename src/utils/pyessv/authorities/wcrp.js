// Module imports.
import { Authority, Scope } from '../model/index';

// Encapsulates access to WCRP vocabularies.
export default class Wcrp extends Authority {
    // Instance ctor.
    constructor (a) {
        super(a);
        this.CMIP5 = new Cmip5(a, this.getScope('cmip5'));
        this.CMIP6 = new Cmip6(a, this.getScope('cmip6'));
        this.CORDEX = new Cordex(a, this.getScope('cordex'));
        this.GLOBAL = new Global(a, this.getScope('global'));
    }
}

// Encapsulates access to WCRP CMIP5 vocabularies.
class Cmip5 extends Scope {
    constructor (a, s) {
        super(a, s);
    }
}

// Encapsulates access to WCRP CMIP6 vocabularies.
class Cmip6 extends Scope {
    constructor (a, s) {
        super(a, s);
    }

    getActivity (name) {
        return _.isUndefined(name) ? this.getTerms('activity-id') :
                                     this.getTerm('activity-id', name);
    }

    getExperiment (name) {
        return _.isUndefined(name) ? this.getTerms('experiment-id') :
                                     this.getTerm('experiment-id', name);
    }

    getInstitution (name) {
        return _.isUndefined(name) ? this.getTerms('institution-id') :
                                     this.getTerm('institution-id', name);
    }

    getSource (name) {
        return _.isUndefined(name) ? this.getTerms('source-id') :
                                     this.getTerm('source-id', name);
    }
}

// Encapsulates access to WCRP Cordex vocabularies.
class Cordex extends Scope {
    constructor (a, s) {
        super(a, s);
    }
}

// Encapsulates access to WCRP global vocabularies.
class Global extends Scope {
    constructor (a, s) {
        super(a, s);
    }

    getMipEra (name) {
        return _.isUndefined(name) ? this.getTerms('mip-era') :
                                     this.getTerm('mip-era', name);
    }
}
