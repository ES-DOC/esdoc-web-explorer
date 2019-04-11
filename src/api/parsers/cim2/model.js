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
        extendTopLevelKeyProperties,
        injectStandardKeyProperties,
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
    const push = (i, depth) => {
        if (Array.isArray(i)) {
            i.forEach((j) => push(j, depth));
        } else if (i !== undefined) {
            i._depth = depth;
            i.citations = i.citations || [];
            i.properties = i.properties || [];
            i.propertySets = i.propertySets || [];
            i.responsibleParties = i.responsibleParties || [];
            i.subTopics = i.subTopics || [];
            m.topics.push(i);
            i.subTopics.forEach(push, depth + 1);
        }
    };

    m.topics = []
    push(m.keyProperties, 1);
    push(m.activityProperties, 2);
    m.realms.forEach(r => {
        push(r.keyProperties, 1);
        push(r.grid, 2);
        push(r.processes, 2);
    });
}

/**
 * Pushes model key properties into top level topic.
 */
const extendTopLevelKeyProperties = (m) => {
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
const injectStandardKeyProperties = (m) => {
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
