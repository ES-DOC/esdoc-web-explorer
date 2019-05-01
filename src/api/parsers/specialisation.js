/**
 * @file Exposes functions for parsing specialisation sets.
 * @author Mark Conway-Greenslade
 */

/**
 * Parses specialisation sets to simplify downstream processing.
 */
export default (specialisationSets, vocabs) => {
    specialisationSets.forEach((s) => {
        [
            setFromVocabs,
            setKeyProperties,
            setTopics,
            setAncestors,
            extendTopics,
        ].forEach(f => f(s, vocabs));
    });
}

/**
 * Merges specialisation set key properties into main specialisation.
 */
const setFromVocabs = (s, vocabs) => {
    const canonicalName = s.id.split('.')[1];
    const modelTopic = vocabs.ESDOC.CMIP6.getModelTopic(canonicalName);
    s.label = modelTopic.label;
}

/**
 * Merges specialisation set key properties into main specialisation.
 */
const setKeyProperties = (s) => {
    s.properties = s.keyProperties.properties || [];
    s.propertySets = s.keyProperties.propertySets || [];
    s.subProcesses = s.keyProperties.subProcesses || [];
}

/**
 * Sets list of specialisation set topics.
 */
const setTopics = (s) => {
    s.topics = [s, s.grid];
    s.processes.forEach((p) => {
        s.topics.push(p);
        (p.subProcesses || []).forEach(sp => s.topics.push(sp));
    });
    s.topics = s.topics.filter(i => i !== undefined);
}

/**
 * Sets specialisation set ancestors.
 */
const setAncestors = (s) => {
    s.ancestors = [];
    s.hierarchy = [s];
    s.parent = null;
    s.processes.forEach((p) => {
        p.ancestors = [s];
        p.hierarchy = [s, p];
        p.parent = s;
        (p.subProcesses || []).forEach(sp => {
            sp.ancestors = [s, p];
            sp.hierarchy = [s, p, sp];
            sp.parent = p;
        });
    });
}

/**
 * Extends topics with derived or helper attributes.
 */
const extendTopics = (s) => {
    s.topics.forEach((t) => {
        t.subProcesses = t.subProcesses || [];
        t.path = t.id.split('.');
        t.depth = t.path.length - 1;
        if (t.depth === 1) {
            t.id = `${t.id}.key_properties`;
        }
    });

    s.topics.forEach((t) => {
        setContainerProperties(t);
        t.subProcesses.forEach(setContainerProperties);
    });

    s.allProperties = s.topics.reduce((out, t) => out.concat(t.ownProperties), []);
    s.allPropertiesMap = s.allProperties.reduce((obj, p) => {
        obj[p.id] = p;
        return obj
    }, {});
}

/**
 * Extends topics with derived or helper attributes.
 */
const setContainerProperties = (c) => {
    c.properties = c.properties || [];
    c.propertySets = c.propertySets || [];

    c.properties.forEach(p => {
        p.fullLabel = `${c.label} > ${p.label}`;
    });
    c.propertySets.forEach(ps => {
        ps.properties.forEach(p => {
            p.fullLabel = `${c.label} > ${ps.label} > ${p.label}`;
        })
    });

    c.ownProperties = c.propertySets.reduce((out, ps) => out.concat(ps.properties), c.properties);
    c.ownPropertiesMap = c.ownProperties.reduce((obj, p) => {
        obj[p.id] = p;
        return obj;
    }, {});
}
