import * as _ from 'lodash';
import { getNode, Node } from './node';
import { Scope } from './scope';

// An entity publishing a vocabulary: e.g. esdoc.
export class Authority extends Node {
    // Instance ctor.
    constructor (a) {
        super(a);
        this.scopes = _.map(a.scopes, (s) => {
            return new Scope(a, s);
        });
    }

    // Return a child scope.
    getScope (name) {
        return getNode(this.scopes, name);
    }
}
