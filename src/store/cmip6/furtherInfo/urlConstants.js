/**
 * @file URL constants pointing to various resources/endpoints.
 * @author Mark Conway-Greenslade
 */

import * as utils from "@/utils";

// Application mode can be derived from current window location.
 const APP_MODE = utils.getApplicationMode();

// Base URL: ES-DOC datset errata api.
const ESDOC_DATASET_ERRATA_BASE = {
    "dev": "http://localhost:5001",
    "test": "https://test-errata.es-doc.org",
    "prod": "https://errata.es-doc.org"
}[APP_MODE];

// Base URL: ES-DOC datset errata.
const ESDOC_EXPLORER_BASE = {
    "dev": "http://localhost:8080",
    "test": "https://test-explore.es-doc.org",
    "prod": "https://explore.es-doc.org"
}[APP_MODE];

// Base URL: ES-DOC documentation search/view.
const ESDOC_DOCUMENTATION_BASE = {
    "test": "https://test-documentation.es-doc.org",
    "prod": "https://documentation.es-doc.org"
}[APP_MODE] || "https://documentation.es-doc.org";

// Base URL: ES-DOC documentation search/view.
const ESDOC_API_BASE = {
    "dev": "http://localhost:5000",
    "test": "https://test-api.es-doc.org",
    "prod": "https://api.es-doc.org"
}[APP_MODE] || "https://api.es-doc.org";

// Dataset errata landing page.
export const DATASET_ERRATA = `${ESDOC_DATASET_ERRATA_BASE}?project={0}&institute={1}&experiment={2}&source={3}`;

// ES-DOC experiment documentation.
export const ESDOC_EXPERIMENT = `${ESDOC_DOCUMENTATION_BASE}/cmip6/experiments/{0}`;

// ES-DOC CMIP6 landing page.
export const ESDOC_CMIP6 = `https://es-doc.org/cmip6`;

// ES-DOC mip-era documentation.
export const ESDOC_MIP_ERA = `${ESDOC_DOCUMENTATION_BASE}/{0}`;

// ES-DOC experiment documentation.
export const ESDOC_MODEL = `${ESDOC_EXPLORER_BASE}/cmip6/models/{0}/{1}`;

// ES-DOC source identifier documentation.
export const ESDOC_SOURCE_ID = `${ESDOC_API_BASE}/2/summary/search?document_type=cim.2.science.Model&document_version=latest&project={0}`;

// Earth System Grid Federation landing page.
export const ESGF_SEARCH = "https://esgf-node.llnl.gov/search/{0}?mip_era={1}&institution_id={2}&experiment_id={3}&source_id={4}";

// WCRP CMIP6 landing page.
export const WCRP_CMIP6 = `https://www.wcrp-climate.org/wgcm-cmip/wgcm-cmip6`;
