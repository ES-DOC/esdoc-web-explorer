/**
 * @file CMIP6 model topic tree factory.
 * @author Mark Conway-Greenslade
 */

/**
 * Returns a topic tree for rendering.
 * @param {Class} Topic - Specialisation topic information wrapper.
 * @param {Class} TopicTree - Topic set information wrapper.
 * @param {Object} specialisations - CMIP6 Specialisations set.
 * @param {Object} document - CMIP6 model CIM document.
 */
export default ({ Topic, TopicTree }, { document, specialization, vocabs }) => {
    const roots = ['toplevel'].concat(vocabs.WCRP.CMIP6.getSourceComponents(document.canonicalID));
    const leaves = specialization
        .reduce((v, s) => v.concat(s.topics), [])
        .filter(i => i._depth < 3)
        .filter(i => roots.includes(i._path[1]))
        .map(i => new Topic(
            i._depth,
            document.topicMap[i.id] !== undefined,
            i.label,
            i.id
        ));

    // for (const t of tree) {
    //     console.log(t.id, document.topicMap[t.id] !== undefined);
    // }

    document.topicTree = new TopicTree(leaves);

    console.log(document);

    return new TopicTree(leaves)
};
