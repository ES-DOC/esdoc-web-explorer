/**
 * @file Application level state mutations.
 *       https://vuex.vuejs.org/en/mutations.html
 * @author Mark Conway-Greenslade
 */

 /**
  * Initialises state store - part of application setup process.
  */
export const initialise = async (state, {
    document,
    documentList,
    projectKey,
    projects,
    specialisationSet,
    specialisationSets,
    summaries,
    summary,
    vocabs
}) => {
    state.projects = projects;
    state.project = projects.find(i => i.key === projectKey);
    state.documentList = documentList;
    state.specialisationSets = specialisationSets;
    state.specialisationSet = specialisationSet;
    state.topics = specialisationSet.reduce((v, s) => v.concat(s.topics), []);
    state.summaries = summaries;
    state.summary = summary;
    state.vocabs = vocabs;

    await setDocument(state, { document, summary });
    state.topicInfo = document.topicTree[0];
    state.topicInfo.isSelected = true;
    state.topic = state.topicInfo.topic;
}

export const setDocument = async (state, { document, summary }) => {
    console.log(document);

    if (!document.topicTree) {
        document.topicTree = getTopicTree({
            document,
            specialisationSet: state.specialisationSet,
            vocabs: state.vocabs
        });
        document.topicTree[0].isSelected = true;
    }

    console.log(summary);

    state.summary = summary;
    state.document = document;
}

export const setTopic = async (state, topicInfo) => {
    console.log(topicInfo);

    if (state.topicInfo.document === topicInfo.document) {
        state.topicInfo.isSelected = false;
    }
    topicInfo.isSelected = true;

    state.topicInfo = topicInfo;
    state.topic = topicInfo.topic;
}

/**
 * Returns a topic tree for rendering.
 * @param {Class} Topic - Specialisation topic information wrapper.
 * @param {Object} specialisationSet - CMIP6 specialisation set.
 * @param {Object} document - CMIP6 model CIM document.
 */
const getTopicTree = ({ document, specialisationSet, vocabs }) => {
    const realms = vocabs.WCRP.CMIP6.getSourceComponents(document.canonicalID);
    const rootTopics = ['toplevel'].concat(realms);

    return specialisationSet
        .reduce((v, s) => v.concat(s.topics), [])
        .filter(i => i._depth < 3)
        .filter(i => rootTopics.includes(i._path[1]))
        .map(i => {
            return {
                depth: i._depth,
                document,
                isDocumented: document.topicMap[i.id] !== undefined,
                isSelected: false,
                label: i.label,
                specialisationID: i.id,
                topic: i
            }
        });
};
