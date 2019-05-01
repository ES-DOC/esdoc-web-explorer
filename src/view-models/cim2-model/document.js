import { DocumentTopic } from './documentTopic';

/**
 * A document available for exploration.
 */
export class Document {
    constructor (institutionID, sourceID, summary, topicTree) {
        this.content = null;
        this.institutionLabel = institutionID.label.toLowerCase().endsWith('-consortium') ?
                                institutionID.label.slice(0, -11) : institutionID.label
        this.institutionID = institutionID;
        this.isSelected = false;
        this.project = summary ? summary.project : null;
        this.propertyMap = {};
        this.source = sourceID.label;
        this.sourceID  = sourceID;
        this.summary = summary;
        this.topicInfo = null;
        this.topicTree = topicTree;
        this.typeShortName = 'Model';
        this.uid = summary.uid;
        this.version = summary.version;

        // Set initial topic.
        this.setTopic(topicTree[0]);
    }

    get label () {
        return this.sourceID.label;
    }

    /**
     * Sets document content pulled from remote API.
     * @param {Object} content - Document content.
     */
    setContent(content) {
        this.content = content;
        for (const t of this.topicTree) {
            t.content = content.topicMap[t.topic.id];
            t.isDocumented = t.content !== undefined;
        }
    }

    /**
     * Sets document topic.
     * @param {DocumentTopic} topic
     */
    setTopic(topicInfo) {
        if (this.topicInfo) {
            this.topicInfo.isSelected = false;
        }
        this.topicInfo = topicInfo;
        topicInfo.isSelected = true;
    }

    /**
     * Factory method.
     * @param {list} summaries - Document summary information pulled from remote API.
     * @param {list} topics - Specialisation topics.
     * @param {Object} vocabs - Vocabularies wrapper.
     */
    static create(summary, topics, vocabs) {
        const {
            canonicalName,
            institute,
            uid,
            version
        } = summary;

        const sourceID = vocabs.WCRP.CMIP6.getSource(canonicalName);
        const institutionID = vocabs.WCRP.CMIP6.getInstitution(institute);
        const realms = vocabs.WCRP.CMIP6.getSourceComponents(sourceID);
        const rootTopics = ['toplevel'].concat(realms);
        const topicTree = topics
            .filter(i => i.depth < 3)
            .filter(i => rootTopics.includes(i.path[1]))
            .map(i => new DocumentTopic(i));

        return new Document(institutionID, sourceID, summary, topicTree);
    }
}

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
