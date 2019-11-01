/**
 * @file URL constants pointing to various resources/endpoints.
 * @author Mark Conway-Greenslade
 */

import * as utils from "@/utils";

// Application mode derived from current window location.
const APP_MODE = utils.getApplicationMode();

// Default URL: ES-DOC explorer.
const ESDOC_DATASET_ERRATA_DEFAULT = "https://errata.es-doc.org";

// Base URL: ES-DOC datset errata api.
const ESDOC_DATASET_ERRATA_BASE = {
    "dev": "http://localhost:5001",
    "test": "https://test-errata.es-doc.org",
    "prod": ESDOC_DATASET_ERRATA_DEFAULT
}[APP_MODE] || ESDOC_DATASET_ERRATA_DEFAULT;

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

// Base URL: ESGF search.
const ESGF_API_BASE = "https://esgf-node.llnl.gov/search";

// Dataset errata landing page.
export const DATASET_ERRATA = `${ESDOC_DATASET_ERRATA_BASE}?project={0}&activity_id={1}&institute={2}&experiment={3}&source={4}`;

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
export const ESGF_SEARCH = `${ESGF_API_BASE}/{0}?mip_era={1}&activity_id={2}&institution_id={3}&experiment_id={4}&source_id={5}`;

// WCRP CMIP6 landing page.
export const WCRP_CMIP6 = `https://www.wcrp-climate.org/wgcm-cmip/wgcm-cmip6`;

// DKRZ citations: experiment.
export const DKRZ_CITATIONS_EXPERIMENT = "https://cera-www.dkrz.de/WDCC/ui/cerasearch/cerarest/{0}Citations?drsId={1}.{2}.{3}.{4}.{5}";

// DKRZ citations: institute.
export const DKRZ_CITATIONS_INSTITUTE = "https://cera-www.dkrz.de/WDCC/ui/cerasearch/cerarest/{0}Citations?drsId={1}.{2}.{3}.{4}";
