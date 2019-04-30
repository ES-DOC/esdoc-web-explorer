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
        initCollections,
        initTopics,
        setTopLevelKeyProperties,
        setStandardKeyProperties,
        setTopicProperties,
        setMaps,
    ].forEach(f => f(m));

    return m;
}

/**
 * Initialises collection attributes to simplify downstream processing.
 */
const initCollections = (m) => {
    m.topics = [];
    m.activityProperties = m.activityProperties || [];
    m.realms = m.realms || [];
    m.realms.forEach(r => {
        r.processes = r.processes || [];
        if (r.keyProperties) {
            r.keyProperties.citations = r.citations;
            r.keyProperties.responsibleParties = r.responsibleParties;
        }
    });
}

/**
 * Sets model topic superset.
 */
const initTopics = (m) => {
    initTopic(m, m.keyProperties, 1);
    initTopic(m, m.activityProperties, 2);
    m.realms.forEach(r => {
        initTopic(m, r.keyProperties, 1);
        initTopic(m, r.grid, 2);
        initTopic(m, r.processes, 2);
    });
}

/**
 * Sets a specific topic.
 */
const initTopic = (m, t, depth) => {
    if (Array.isArray(t)) {
        t.forEach((i) => initTopic(m, i, depth));
    } else if (t !== undefined) {
        // Append to superset.
        m.topics.push(t);

        // Extend topic.
        t._depth = depth;
        t.citations = t.citations || [];
        t.properties = t.properties || [];
        t.propertySets = t.propertySets || [];
        t.responsibleParties = t.responsibleParties || [];
        t.subTopics = t.subTopics || [];
        t.subTopics.forEach(st => {
            initTopic(m, st, depth + 1);
        });
    }
};

/**
 * Pushes model key properties into top level topic.
 */
const setTopLevelKeyProperties = (m) => {
    if (m.keyProperties !== undefined) {
        [
            'coupler',
            'description',
            'longName',
            'modelType',
            'name',
            'version'
        ].forEach((p) => {
            m.keyProperties[p] = m[p];
        });
    }
}

/**
 * Injects standard topic properties where appropriate.
 */
const setStandardKeyProperties = (m) => {
    const _setProperty = (t, [sourceSlot, targetSlot]) => {
        const value = t[sourceSlot];
        if (value !== undefined) {
            targetSlot = targetSlot || sourceSlot;
            t.properties.push({
                meta: {
                    type: 'cim.2.science.TopicProperty'
                },
                specializationID: `${t.specializationID}.${targetSlot}`,
                values: Array.isArray(value) ? value : [value]
            });
        }
    };

    const _toplevelFieldSet = [
        ['coupler'],
        ['description', 'overview'],
        ['keywords'],
        ['longName', 'long_name'],
        ['modelType', 'model_type'],
        ['name'],
        ['version'],
    ];

    const _standardFieldSet = [
        ['name'],
        ['keywords'],
        ['description', 'overview'],
    ];

    m.topics.forEach(t => {
        const fieldSet = t === m.topics[0] ? _toplevelFieldSet : _standardFieldSet;
        fieldSet.forEach(slots => _setProperty(t, slots));
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
