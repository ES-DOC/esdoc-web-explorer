/**
 * @file Exposes functions for parsing CIM v2 model documents.
 * @author Mark Conway-Greenslade
 */

/**
 * Parses a CIM v2 model document pulled from remote API.
 */
export default (m) => {
    [
        setCollections,
        setTopics,
        setTopicProperties,
        setMaps,
    ].forEach(f => f(m));

    return m;
}

/**
 * Initialises collection attributes to simplify downstream processing.
 */
const setCollections = (m) => {
    const assign = (i) => {
        if (Array.isArray(i)) {
            i.forEach(assign);
        } else if (i !== undefined) {
            i.properties = i.properties || [];
            i.propertySets = i.propertySets || [];
            i.subTopics = i.subTopics || [];
            i.subTopics.forEach(st => {
                st.properties = st.properties || [];
                st.propertySets = st.propertySets || [];
            })
        }
    };

    m.activityProperties = m.activityProperties || [];
    m.realms = m.realms || [];
    m.realms.forEach(r => {
        r.processes = r.processes || [];
    });

    assign(m.keyProperties);
    assign(m.activityProperties);
    m.realms.forEach(r => {
        assign(r.keyProperties);
        assign(r.grid);
        assign(r.processes);
    });
}

/**
 * Sets model topic superset.
 */
const setTopics = (m) => {
    const push = (i) => {
        if (Array.isArray(i)) {
            i.forEach(push);
        } else if (i !== undefined) {
            m.topics.push(i);
        }
    };

    m.topics = []
    push(m.keyProperties);
    push(m.activityProperties);
    m.realms.forEach(r => {
        push(r.keyProperties);
        push(r.grid);
        push(r.processes);
    });
}

/**
 * Sets model property superset.
 */
const setTopicProperties = (m) => {
    m.topicProperties = [];
    m.topics.forEach(t => {
        m.topicProperties = m.topicProperties.concat(t.properties);
        t.propertySets.forEach(ps => {
            m.topicProperties = m.topicProperties.concat(ps.properties);
        })
    })
}

/**
 * Sets hash maps used downstream.
 */
const setMaps = (m) => {
    m.topicMap = m.topics.reduce((obj, t) => {
        obj[t.specializationID] = t;
        return obj
    }, {});
    m.topicPropertyMap = m.topicProperties.reduce((obj, t) => {
        obj[t.specializationID] = t;
        return obj
    }, {});
}
