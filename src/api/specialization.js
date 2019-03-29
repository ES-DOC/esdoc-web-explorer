/**
 * @file Exposes functions for pulling specializations.
 * @author Mark Conway-Greenslade
 */

import CMIP6 from '@/static/cmip6-specializations'

/**
 * Returns all specializations.
 */
export const getAll = async () => {
    // Parse to simplify downstream processing.
    parse(CMIP6);

    return {
        cmip6: CMIP6
    };
}

/**
 * Parses a specialization to simplify downstream processing.
 */
const parse = (specializations) => {
    specializations.forEach((s) => {
        [
            setKeyProperties,
            setTopics,
            setAncestors,
            extendTopics,
        ].forEach(f => f(s));
    });
}

/**
 * Merges specialization key properties into main specialization.
 */
const setKeyProperties = (s) => {
    s.properties = s.keyProperties.properties || [];
    s.propertySets = s.keyProperties.propertySets || [];
    s.subProcesses = s.keyProperties.subProcesses || [];
}

/**
 * Sets list of specialization topics.
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
 * Sets specialization ancestors.
 */
const setAncestors = (s) => {
    s.ancestors = [];
    s.parent = null;
    s.processes.forEach((p) => {
        p.ancestors = [s];
        p.parent = s;
        (p.subProcesses || []).forEach(sp => {
            sp.ancestors = [s, p];
            sp.parent = p;
        });
    });
}

/**
 * Extends topics with derived or helper attributes.
 */
const extendTopics = (s) => {
    s.topics.forEach((t) => {
        t.path = t.id.split('.');
        t.depth = t.path.length - 1;
    });

    s.topics.forEach(setContainerProperties);
    s.topics.forEach((t) => {
        t.subProcesses = t.subProcesses || [];
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