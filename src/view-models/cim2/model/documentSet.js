import { Document } from './document';
import { DocumentTopic } from './documentTopic';

/**
 * Set of documents available for exploration.
 */
export class DocumentSet {
    constructor (documents, institutionID, sourceID) {
        this.all = documents;
        this.setDocument(this.getDocument(institutionID, sourceID));
    }

    /**
     * Appends an item to managed collection.
     */
    append (item) {
        this.all.push(item);
    }

    /**
     * Assigns current document.
     */
    setDocument (item) {
        if (this.current) {
            this.current.isSelected = false;
        }
        this.current = item;
        item.isSelected = true;
    }

    /**
     * Returns initial document to be rendered.
     */
    getDocument (institutionID, sourceID) {
        let predicate, filtered;
        institutionID = institutionID || 'mohc';
        if (institutionID) {
            institutionID = institutionID.toLowerCase();
            if (sourceID) {
                sourceID = sourceID.toLowerCase();
                predicate = (i) => i.institutionID.canonicalName === institutionID &&
                                   i.sourceID.canonicalName === sourceID;
            } else {
                predicate = (i) => i.institutionID.canonicalName === institutionID;
            }

            filtered = this.all.filter(predicate);
        }
        if (filtered === undefined || filtered.length === 0) {
            filtered = _.sortBy(this.all, ['institute', 'source']);
        }

        return filtered.length > 0 ? filtered[0] : null;
    }
}
