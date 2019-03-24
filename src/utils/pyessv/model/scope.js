import * as _ from 'lodash'
import { getNode, Node } from './node'
import { Collection } from './collection'

// A scopoed set of term collections: e.g. errata.
export class Scope extends Node {
    // Instance ctor.
    constructor (a, s) {
        super(s);
        this.authority  = a;
        this.collections = _.map(s.collections, (c) => {
            return new Collection(a, s, c);
        });

        this.collectionsMap = {}
        this.collections.forEach(i => this.collectionsMap[i.canonicalName] = i)
    }

    getCollection (name) {
        return getNode(this.collections, name);
    }

    // Returns all terms within matched collection.
    getTerms (collectionName) {
        let collection = this.getCollection(collectionName);
        if (collection) {
            return _.sortBy(collection.terms, (i) => {
                return _.has(i.data, 'sortOrdinal') ? i.data.sortOrdinal : i.canonicalName;
            })
        }
    }

    // Returns matched term within matched collection.
    getTerm (collectionName, termName) {
        let collection = this.getCollection(collectionName);
        if (collection) {
            return getNode(collection.terms, termName);
        }
    }
}
