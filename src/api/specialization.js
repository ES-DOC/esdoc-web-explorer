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
            mergeKeyProperties,
            setTopics,
            setAncestors,
            extendTopics,
            setTopicProperties,
        ].forEach(f => f(s));
    });
}

/**
 * Merges specialization key properties into main specialization.
 */
const mergeKeyProperties = (s) => {
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
        t.properties = t.properties || [];
        t.propertySets = t.propertySets || [];
        t.subProcesses = t.subProcesses || [];
        t.subProcesses.forEach(sp => {
            sp.properties = sp.properties || [];
            sp.propertySets = sp.propertySets || [];
        })
        t.path = t.id.split('.');
        t.depth = t.path.length - 1;
    });
}

/**
 * Extends topics with derived or helper attributes.
 */
const setTopicProperties = (s) => {
    s.topics.forEach((t) => {
        t.properties.forEach(p => {
            p.fullLabel = p.label;
            p.parent = null;
        });
        t.propertySets.forEach(ps => {
            ps.properties = ps.properties || [];
            ps.properties.forEach((p) => {
                p.fullLabel = `${ps.label} > ${p.label}`;
                p.parent = ps;
            });
        });
        t.allProperties = t.propertySets.reduce((out, ps) => out.concat(ps.properties), t.properties);

        t.subProcesses.forEach(sp => {
            sp.properties.forEach(p => {
                p.fullLabel = `${sp.label} > ${p.label}`;
                p.parent = null;
            });
            sp.propertySets.forEach(ps => {
                ps.properties.forEach(p => {
                    p.fullLabel = `${sp.label} > ${ps.label} > ${p.label}`;
                })
            });
            sp.allProperties = sp.propertySets.reduce((out, ps) => out.concat(ps.properties), sp.properties);
        })

    });
}
