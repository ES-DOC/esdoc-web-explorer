/**
 * @file pyessv API wrapper.
 * @author Mark Conway-Greenslade
 */

import $ from 'jquery';
import { ESDOC, WCRP } from './authorities/index';

// Api URL.
const URL_API = {
    "dev": "http://localhost:5010",
    "test": "https://test-pyessv.es-doc.org",
    "prod": "https://pyessv.es-doc.org"
}

/**
 * Returns set of vocabs from remote pyessv API.
 * @param {String} mode - Application execution mode.
 */
export default async (mode) => {
    // Pull from pyessv-ws.
    const baseUrl = URL_API[mode];
    const url = `${baseUrl}/1/retrieve`;
    const { data: authorities } = await $.get(url);

    // Map to wrapper objects.
    const result = {};
    authorities.forEach((a) => {
        switch(a.canonicalName) {
            case 'wcrp':
                result['WCRP'] = new WCRP(a);
                break;
            case 'esdoc':
                result['ESDOC'] = new ESDOC(a);
                break;
        }
    });

    return result;
};
