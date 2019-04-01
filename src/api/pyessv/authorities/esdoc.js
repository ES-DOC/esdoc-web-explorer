/**
 * @file Wraps ES-DOC related vocabularies.
 * @author Mark Conway-Greenslade
 */

import * as _ from 'lodash';
import { Authority, Scope } from '../model';

/**
 * Encapsulates access to ES-DOC vocabularies.
 * @extends Authority
 */
export default class extends Authority {
    /**
     * Instance ctor.
     * @param {Authority} a - The authority data pulled from remote API.
     */
    constructor (a) {
        super(a);
        this.CMIP6 = new Cmip6(a, this.getScope('cmip6'));
        this.ERRATA = new Errata(a, this.getScope('errata'));
    }
}

/**
 * Encapsulates access to ES-DOC CMIP6 vocabularies.
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
     * Returns either a model topic vocab term or a set of model topic vocab terms.
     * @param {String} name - Project vocab term name.
     */
    getModelTopic (name) {
        return _.isUndefined(name) ? this.getTerms('model-topic') :
                                     this.getTerm('model-topic', name);
    }
}

/**
 * Encapsulates access to ES-DOC Errata service vocabularies.
 * @extends Scope
 */
class Errata extends Scope {
    /**
     * Instance ctor.
     * @param {Authority} a - The authority data pulled from remote API.
     * @param {Scope} s - The scope data pulled from remote API.
     */
    constructor (a, s) {
        super(a, s);
    }

    /**
     * Returns either a PID task action vocab term or a set of PID task action vocab terms.
     * @param {String} name - PID task action name.
     */
    getPidTaskAction (name) {
        return _.isUndefined(name) ? this.getTerms('pid-task-action') :
                                     this.getTerm('pid-task-action', name);
    }

    /**
     * Returns either a PID task status vocab term or a set of PID task status vocab terms.
     * @param {String} name - PID task status name.
     */
    getPidTaskStatus (name) {
        return _.isUndefined(name) ? this.getTerms('pid-task-status') :
                                     this.getTerm('pid-task-status', name);
    }

    /**
     * Returns either a project vocab term or a set of project vocab terms.
     * @param {String} name - Project vocab term name.
     */
    getProject (name) {
        return _.isUndefined(name) ? this.getTerms('project') :
                                     this.getTerm('project', name);
    }

    /**
     * Returns either a severity vocab term or a set of severity vocab terms.
     * @param {String} name - Severity vocab term name.
     */
    getSeverity (name) {
        return _.isUndefined(name) ? this.getTerms('severity') :
                                     this.getTerm('severity', name);
    }

    /**
     * Returns either a status vocab term or a set of status terms.
     * @param {String} name - Status vocab term name.
     */
    getStatus (name) {
        return _.isUndefined(name) ? this.getTerms('status') :
                                     this.getTerm('status', name);
    }
}
