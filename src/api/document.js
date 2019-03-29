/**
 * @file Exposes functions for pulling archived documents.
 * @author Mark Conway-Greenslade
 */

import $ from 'jquery';
import * as _ from 'lodash';
import { getApplicationMode } from '@/utils';

// Map: document uid <-> document.
const cache = {};

// Map: Application mode <-> API URL.
const ENV_TO_URL = {
    dev: "http://localhost:5000",
    prod: "https://api.es-doc.org",
    test: "https://test-api.es-doc.org"
};

/**
 * Returns documents matched by project & institute identifiers.
 * @param {String} project - Project canonical name, e.g. cmip6.
 * @param {String} documentType - Document type canonical name, e.g. cim.2.science.Model.
 */
export const getMany = async (project, documentType) => {
    const mode = getApplicationMode();
    const baseUrl = ENV_TO_URL[mode];
    const params = `document_version=latest&document_type=${documentType}&project=${project}`;
    const url = `${baseUrl}/2/summary/search?${params}`;
    const { results: data } = await $.get(url);

    return data.map(i => {
        return {
            alternativeName: i[8],
            canonicalName: i[5],
            experiment: i[0],
            institute: i[1],
            longName: i[2],
            model: i[3],
            name: i[4],
            project,
            uid: i[6],
            version: i[7]
        };
    })
}

/**
 * Returns a document matched by project, institute & canonical-name identifiers.
 * @param {String} project - Project canonical name, e.g. cmip6.
 * @param {String} uid - Document uuid v4 identifier.
 */
export const getOne = async ({ project, uid }) => {
    if (!cache[uid]) {
        const mode = getApplicationMode();
        const baseUrl = ENV_TO_URL[mode];
        const params = `client=esdoc-explorer&project=${project}&id=${uid}&version=latest&encoding=json`;
        const url = `${baseUrl}/2/document/search-id?${params}`;
        console.log(url);
        const doc = await $.get(url);
        parse(doc);
        cache[uid] = doc;
    }

    return cache[uid];
}

const parse = (m) => {
    setDefaults(m);
    setTopics(m);
    setTopicProperties(m);

    // console.log(m.topics);
    // console.log(m.topicProperties);
}

const setDefaults = (m) => {
    const assign = (i) => {
        if (i !== undefined) {
            if (_.isArray(i)) {
                i.forEach(assign);
            } else {
                i.properties = i.properties || [];
                i.propertySets = i.propertySets || [];
                i.subTopics = i.subTopics || [];
                i.subTopics.forEach(st => {
                    st.properties = st.properties || [];
                    st.propertySets = st.propertySets || [];
                })
            }
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

const setTopics = (m) => {
    const assign = (i) => {
        if (i !== undefined) {
            if (_.isArray(i)) {
                i.forEach(assign);
            } else {
                m.topics.push(i);
            }
        }
    };

    m.topics = []
    assign(m.keyProperties);
    assign(m.activityProperties);
    m.realms.forEach(r => {
        assign(r.keyProperties);
        assign(r.grid);
        assign(r.processes);
    });

    m.topicMap = m.topics.reduce((obj, t) => {
        obj[t.specializationID] = t;
        return obj
    }, {});
}


const setTopicProperties = (m) => {
    m.topicProperties = [];
    m.topics.forEach(t => {
        m.topicProperties = m.topicProperties.concat(t.properties);
        t.propertySets.forEach(ps => {
            m.topicProperties = m.topicProperties.concat(ps.properties);
        })
    })

    m.topicPropertyMap = m.topicProperties.reduce((obj, t) => {
        obj[t.specializationID] = t;
        return obj
    }, {});
}
