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
            setSubProcesses,
            setTopics,
            setDepths
        ].forEach(f => f(s));
    });
}

/**
 * Sets depth of each topic within a specialization's hierarchy.
 */
const setDepths = (s) => {
    s.depth = 1
    s.processes.forEach(p => {
        p.depth = 2
        p.subProcesses.forEach(sp => {
            sp.depth = 3
        })
    })
}

/**
 * Sets null sub-processes to avoid littering code with if statements.
 */
const setSubProcesses = (s) => {
    s.processes.forEach((p) => {
        p.subProcesses = p.subProcesses || []
    })
}

/**
 * Sets list of specialization sub topics.
 */
const setSubTopics = (s) => {
    s.subTopics = [s.keyProperties, s.grid]
    s.topics = [s];
    s.processes.forEach((p) => {
        s.topics = s.topics.concat([p].concat(p.subProcesses))
    })
    s.topics = s.topics.filter(i => i !== undefined)
}

/**
 * Sets list of specialization topics.
 */
const setTopics = (s) => {
    s.topics = [s];
    s.processes.forEach((p) => {
        s.topics = s.topics.concat([p].concat(p.subProcesses))
    })
    s.topics = s.topics.filter(i => i !== undefined)
}
