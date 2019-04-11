/**
 * @file CMIP6 topic information.
 * @author Mark Conway-Greenslade
 */

/**
 * Wraps CMIP6 topic information.
 */
export class Topic {
    constructor (depth, isDocumented, label, specialisationID) {
        this.depth = depth;
        this.isDocumented = isDocumented;
        this.label = label;
        this.specialisationID = specialisationID;
    }
}

/**
 * Wraps a collection of CMIP6 topics.
 */
export class TopicTree {
    constructor (leaves) {
        this.topics = leaves || [];
    }
}
