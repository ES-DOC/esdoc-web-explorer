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
        let filtered, wasOverridden = false;

        // Parse inputs.
        institutionID = institutionID || 'mohc';
        institutionID = institutionID.toLowerCase();
        sourceID = sourceID ? sourceID.toLowerCase() : null;

        // Set filters.
        const filterByInstitutionID = i => i.institutionID.canonicalName === institutionID;
        const filterByInstitutionIDAndSourceID = i => filterByInstitutionID(i) && i.sourceID.canonicalName === sourceID;

        // Set filtered.
        if (sourceID) {
            filtered = this.all.filter(filterByInstitutionIDAndSourceID);
            if (filtered.length === 0) {
                wasOverridden = true;
                filtered = this.all.filter(filterByInstitutionID);
            }
        } else {
            filtered = this.all.filter(filterByInstitutionID);
        }

        // Set default.
        if (filtered === undefined || filtered.length === 0) {
            wasOverridden = true;
            filtered = _.sortBy(this.all, ['institutionLabel', 'source']);
        }

        // Set document and assign flag indicating whether the document was overridden.
        const document = filtered.length > 0 ? filtered[0] : null;
        if (document) {
            document.wasOverridden = wasOverridden;
        }

        return document;
    }
}
