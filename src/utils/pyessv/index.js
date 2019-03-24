// Module imports.
import Esdoc from './authorities/esdoc.js';
import Wcrp from './authorities/wcrp.js';

// WCRP controlled vocabulary authority.
export let WCRP = null;

// ES-DOC controlled vocabulary authority.
export let ESDOC = null;

// Application mode.
const APP_MODE = (() => {
    if (window.location.host && window.location.host.indexOf('es-doc.org') >= 0) {
        if (window.location.host.indexOf('test') >= 0) {
            return 'test';
        }
        return 'prod';
    }
    return 'dev';
})();

// Api URL.
const URL_API = {
    "dev": "http://localhost:5010",
    "test": "https://test-pyessv.es-doc.org",
    "prod": "https://pyessv.es-doc.org"
}[APP_MODE] + "/1/retrieve";

// Module initialiser.
export const initialise = async () => {
    const { data: authorities } = await $.get(URL_API);
    authorities.forEach((a) => {
        switch(a.canonicalName) {
            case 'wcrp':
                WCRP = new Wcrp(a);
                break;
            case 'esdoc':
                ESDOC = new Esdoc(a);
                break;
        }
    })

    return {
        ESDOC,
        WCRP
    }
};
