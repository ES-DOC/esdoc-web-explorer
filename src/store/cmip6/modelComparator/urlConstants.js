/**
 * @file URL constants pointing to various resources/endpoints.
 * @author Mark Conway-Greenslade
 */

import * as utils from "@/utils";

// Application mode derived from current window location.
const APP_MODE = utils.getApplicationMode();

// Default URL: ES-DOC explorer.
const ESDOC_EXPLORER_DEFAULT = "https://explore.es-doc.org";

// Base URL: ES-DOC explorer.
const ESDOC_EXPLORER_BASE = {
    "dev": "http://localhost:8080",
    "test": "https://test-explore.es-doc.org",
    "prod": ESDOC_EXPLORER_DEFAULT
}[APP_MODE] || ESDOC_EXPLORER_DEFAULT;

// Default URL: ES-DOC documentation view.
const ESDOC_DOCUMENTATION_DEFAULT = "https://documentation.es-doc.org";

// Base URL: ES-DOC documentation view.
const ESDOC_DOCUMENTATION_BASE = {
    "test": "https://test-documentation.es-doc.org",
    "prod": ESDOC_DOCUMENTATION_DEFAULT
}[APP_MODE] || ESDOC_DOCUMENTATION_DEFAULT;

// Default URL: ES-DOC documentation search.
const ESDOC_API_DEFAULT = "https://api.es-doc.org";

// Base URL: ES-DOC documentation search.
const ESDOC_API_BASE = {
    "dev": "http://localhost:5000",
    "test": "https://test-api.es-doc.org",
    "prod": ESDOC_API_DEFAULT
}[APP_MODE] || ESDOC_API_DEFAULT;

// ES-DOC CMIP6 landing page.
export const ESDOC_CMIP6 = `https://es-doc.org/cmip6`;

// ES-DOC mip-era documentation.
export const ESDOC_MIP_ERA = `${ESDOC_DOCUMENTATION_BASE}/{0}`;

// ES-DOC model documentation.
export const ESDOC_MODEL = `${ESDOC_EXPLORER_BASE}/cmip6/models/{0}/{1}`;

// ES-DOC source identifier documentation.
export const ESDOC_SOURCE_ID = `${ESDOC_API_BASE}/2/summary/search?document_type=cim.2.science.Model&document_version=latest&project={0}`;
