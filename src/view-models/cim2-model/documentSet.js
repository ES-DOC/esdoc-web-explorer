import { Document } from './document';
import { DocumentTopic } from './documentTopic';

/**
 * Set of documents available for exploration.
 */
export class DocumentSet {
    constructor (documents, institutionID, sourceID) {
        this.all = documents;
        this.setDocument(this._getInitial(institutionID, sourceID));
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
    _getInitial (institutionID, sourceID) {
        let predicate, filtered;
        institutionID = institutionID || 'mohc';
        if (institutionID) {
            institutionID = institutionID.toLowerCase();
            if (sourceID) {
                sourceID = sourceID.toLowerCase();
                predicate = (i) => i.sourceID.canonicalName === sourceID &&
                                   i.institutionID.canonicalName === institutionID;
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

    /**
     * Factory method.
     * @param {list} summaries - Document summary information pulled from remote API.
     * @param {list} topics - Specialisation topics.
     * @param {Object} vocabs - Vocabularies wrapper.
     */
    static create(summaries, topics, vocabs) {
        const result = new DocumentSet();
        const sourceIDs = vocabs.WCRP.CMIP6.getSource();
        for (const sourceID of sourceIDs) {
            const institutionIDs = sourceID.data.institutionID.map(i => vocabs.WCRP.CMIP6.getInstitution(i));
            for (const institutionID of institutionIDs) {
                const document = new Document({
                    institutionID,
                    sourceID,
                    summary: getSummary(summaries, institutionID, sourceID),
                    topicTree: getTopicTree(sourceID, topics, vocabs)
                });
                result.append(document);
            }
        }

        return result;
    }
}

/**
 * Returns a document's topic tree.
 * @param {pyessv.Term} sourceID - CMIP6 source identifier vocabulary term.
 * @param {Object} specialisationSet - CMIP6 specialisation set.
 * @param {Object} vocabs - WCRP CMIP6 vocabs wrapper.
 */
const getSummary = (summaries, institutionID, sourceID) => {
    return summaries.find(i => {
        return i.institute.toLowerCase() === institutionID.rawName.toLowerCase() &&
               i.canonicalName.toLowerCase() === sourceID.rawName.toLowerCase();
    });
};

/**
 * Returns a document's topic tree.
 * @param {pyessv.Term} sourceID - CMIP6 source identifier vocabulary term.
 * @param {Object} specialisationSet - CMIP6 specialisation set.
 * @param {Object} vocabs - WCRP CMIP6 vocabs wrapper.
 */
const getTopicTree = (sourceID, topics, vocabs) => {
    const realms = vocabs.WCRP.CMIP6.getSourceComponents(sourceID);
    const rootTopics = ['toplevel'].concat(realms);

    return topics
        .filter(i => i.depth < 3)
        .filter(i => rootTopics.includes(i.path[1]))
        .map(i => new DocumentTopic(i));
};
