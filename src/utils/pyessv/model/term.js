import { Node } from './node'

// A vocabulary term: e.g. high.
export class Term extends Node {
    // Instance ctor.
    constructor (a, s, c, t) {
        super(t);
        this.authority  = a;
        this.scope  = s;
        this.collection  = c;
    }
}
