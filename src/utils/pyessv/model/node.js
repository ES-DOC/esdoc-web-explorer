import * as _ from 'lodash';

// A node within the domain model.
export class Node {
    // Instance ctor.
    constructor (n) {
        _.each(_.keys(n), (key) => {
            this[key] = n[key];
        });
    }

    // Returns flag indicating whether a name match occurs.
    isMatch (name) {
        return name === self.canonicalName;
    }
}

// Returns first node matched within a collection.
export const getNode = (collection, name) => {
    return _.find(collection, (i) => {
        return i.canonicalName.toLowerCase() === name.toLowerCase();
    });
}
