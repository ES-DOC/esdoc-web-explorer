import * as _ from 'lodash';
import { Node } from './node';
import { Term } from './term';

// A collection of terms: e.g. severity.
export class Collection extends Node {
    // Instance ctor.
    constructor (a, s, c) {
        super(c);
        this.authority  = a;
        this.scope  = s;
        this.terms = _.map(c.terms, (t) => {
            return new Term(a, s, c, t);
        });
   }
}
