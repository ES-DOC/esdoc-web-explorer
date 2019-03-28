/**
 * @file Exposes functions for pulling archived documents.
 * @author Mark Conway-Greenslade
 */

import $ from 'jquery';
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

const parse = (doc) => {
    doc.subTopics = [doc.keyProperties];
}
