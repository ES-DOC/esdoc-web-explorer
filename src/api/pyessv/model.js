/**
 * @file PYESSV domain model.
 * @author Mark Conway-Greenslade
 */

import * as _ from 'lodash';

/**
 * A node within a graph of vocabulary entities.
 */
export class Node {
    /**
     * Instance ctor.
     * @param {Object} n - The base class, i.e. Authority | Scope | Collection | Term.
     */
    constructor (n) {
        // Simply mixin to the class instance attributes from remote data.
        _.each(_.keys(n), (key) => {
            this[key] = n[key];
        });
    }

    /**
     * Returns flag indicating whether a canonical name match occurs.
     * @param {String} name - Vocab node name.
     */
    isMatch (name) {
        return name === self.canonicalName;
    }

    /**
     * Returns first node matched within a collection.
     * @param {List} collection - Vocab node name.
     * @param {String} name - Vocab node name.
     */
    static getNode(collection, name) {
        return _.find(collection, (i) => {
            return i.canonicalName.toLowerCase() === name.toLowerCase();
        });
    }
}

/**
 * An entity publishing a set of vocabulary collection grouped into scopes.
 * @extends Node
 */
export class Authority extends Node {
    /**
     * Instance ctor.
     * @param {Object} a - Authority data pulled form remote API.
     */
    constructor (a) {
        super(a);
        this.scopes = _.map(a.scopes, (s) => {
            return new Scope(a, s);
        });
    }

    /**
     * Returns a child scope.
     * @param {String} name - Scope name.
     */
    getScope (name) {
        return Node.getNode(this.scopes, name);
    }
}

/**
 * A set of vocabulary collections.
 * @extends Node
 */
export class Scope extends Node {
    /**
     * Instance ctor.
     * @param {Object} a - Authority data pulled form remote API.
     * @param {Object} s - Scope data pulled form remote API.
     */
    constructor (a, s) {
        super(s);
        this.authority  = a;
        this.collections = _.map(s.collections, (c) => {
            return new Collection(a, s, c);
        });

        this.collectionsMap = {}
        this.collections.forEach(i => this.collectionsMap[i.canonicalName] = i)
    }

    /**
     * Returns a child collection.
     * @param {String} name - Collection name.
     */
    getCollection (name) {
        return Node.getNode(this.collections, name);
    }

    /**
     * Returns sorted list of terms within a child collection.
     * @param {String} name - Collection name.
     */
    getTerms (name) {
        let collection = this.getCollection(name);
        if (collection) {
            return _.sortBy(collection.terms, (i) => {
                return _.has(i.data, 'sortOrdinal') ? i.data.sortOrdinal : i.canonicalName;
            })
        }
    }

    /**
     * Returns a term matched from a child collection.
     * @param {String} collectionName - Collection name.
     * @param {String} termName - Term name.
     */
    getTerm (collectionName, termName) {
        let collection = this.getCollection(collectionName);
        if (collection) {
            return Node.getNode(collection.terms, termName);
        }
    }
}

/**
 * A collection of vocabulary terms.
 * @extends Node
 */
export class Collection extends Node {
    /**
     * Instance ctor.
     * @param {Object} a - Authority data pulled form remote API.
     * @param {Object} s - Scope data pulled form remote API.
     * @param {Object} c - Collection data pulled form remote API.
     */
    constructor (a, s, c) {
        super(c);
        this.authority  = a;
        this.scope  = s;
        this.terms = _.map(c.terms, (t) => {
            return new Term(a, s, c, t);
        });
   }
}

/**
 * A vocabulary term representing a single item with a vocabulary collection.
 * @extends Node
 */
export class Term extends Node {
    /**
     * Instance ctor.
     * @param {Object} a - Authority data pulled form remote API.
     * @param {Object} s - Scope data pulled form remote API.
     * @param {Object} c - Collection data pulled form remote API.
     * @param {Object} t - Term data pulled form remote API.
     */
    constructor (a, s, c, t) {
        super(t);
        this.authority  = a;
        this.scope  = s;
        this.collection  = c;
    }
}
