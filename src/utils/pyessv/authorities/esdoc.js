// Module imports.
import { Authority, Scope } from '../model/index';


// Encapsulates access to ES-DOC vocabularies.
export default class Esdoc extends Authority {
    // Instance ctor.
    constructor (a) {
        super(a);
        this.CMIP6 = new Cmip6(a, this.getScope('cmip6'));
        this.ERRATA = new Errata(a, this.getScope('errata'));
    }
}

// Encapsulates access to ES-DOC CMIP6 vocabularies.
class Cmip6 extends Scope {
    constructor (a, s) {
        super(a, s);
    }

    getModelTopic (name) {
        return _.isUndefined(name) ? this.getTerms('model-topic') :
                                     this.getTerm('model-topic', name);
    }
}

// Encapsulates access to ES-DOC Errata vocabularies.
class Errata extends Scope {
    constructor (a, s) {
        super(a, s);
    }

    getPidTaskAction (name) {
        return _.isUndefined(name) ? this.getTerms('pid-task-action') :
                                     this.getTerm('pid-task-action', name);
    }

    getPidTaskStatus (name) {
        return _.isUndefined(name) ? this.getTerms('pid-task-status') :
                                     this.getTerm('pid-task-status', name);
    }

    getProject (name) {
        return _.isUndefined(name) ? this.getTerms('project') :
                                     this.getTerm('project', name);
    }

    getSeverity (name) {
        return _.isUndefined(name) ? this.getTerms('severity') :
                                     this.getTerm('severity', name);
    }

    getStatus (name) {
        return _.isUndefined(name) ? this.getTerms('status') :
                                     this.getTerm('status', name);
    }
}
