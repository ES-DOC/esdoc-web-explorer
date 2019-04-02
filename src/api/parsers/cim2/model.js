/**
 * @file Exposes functions for parsing CIM v2 model documents.
 * @author Mark Conway-Greenslade
 */

/**
 * Parses a CIM v2 model document pulled from remote API.
 */
export default (m) => {
    [
        parseMOHC,
        setCollections,
        setTopics,
        setStandardTopicProperties,
        setTopicProperties,
        setMaps,
    ].forEach(f => f(m));

    return m;
}

/**
 * Initialises collection attributes to simplify downstream processing.
 */
const setCollections = (m) => {
    m.activityProperties = m.activityProperties || [];
    m.realms = m.realms || [];
    m.realms.forEach(r => {
        r.processes = r.processes || [];
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
            i.citations = i.citations || [];
            i.properties = i.properties || [];
            i.propertySets = i.propertySets || [];
            i.responsibleParties = i.responsibleParties || [];
            i.subTopics = i.subTopics || [];
            m.topics.push(i);
            i.subTopics.forEach(push);
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
const setStandardTopicProperties = (m) => {
    // console.log(m.topics.length);
    m.topics.forEach(t => {
        // console.log(111, t.keywords);
        // console.log(222, t.description);
        // console.log(333, t.overview);
    })
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


/**
 * Performs a pre-parse over MOHC documents.
 */
const parseMOHC = (m) => {
    if (m.meta.institute !== 'MOHC') {
        return;
    }

    m.realms = m.coupledComponents.map((cc) => {
        return {
            specializationID: `cmip6.${cc.realms[0].canonicalName}`,
            ...cc,
            ...cc.realms[0]
        }
    });
}
