/**
 * @file Returns set of URL's to be rendered to user.
 * @author Mark Conway-Greenslade
 */

import * as axios from "axios";
import * as constants from "./urlConstants";

/**
 * Returns set of URL's to be rendered to user.
 */
export default async (parsed) => {
    return {
        datasetErrata: getUrlForDatasetErrata(parsed),
        ensembleDescription: null,
        esdoc: constants.ESDOC_CMIP6,
        esgfSearch: getUrlForEsgfSearch(parsed),
        experiment: getUrlForExperiment(parsed),
        experimentCitations: null,
        institution: getUrlForInstitution(parsed),
        institutionCitations: null,
        machinePerformance: null,
        mipEra: getUrlForMipEra(parsed),
        sourceID: await getUrlForSourceID(parsed),
        wgcm: constants.WCRP_CMIP6
    };
};

const getUrlForMipEra = ({ mipEra }) => {
    const url = constants.ESDOC_MIP_ERA;

    return url.replace('{0}', mipEra.canonicalName);
};

const getUrlForInstitution = ({ institution }) => {
    return institution.data.homepage ? institution.data.homepage : null;
};

const getUrlForSourceID = async ({ mipEra, institution, sourceID }) => {
    const isDocumented = await getIsSourceIdDocumented(mipEra, institution, sourceID);
    if (isDocumented) {
        let url = constants.ESDOC_MODEL;
        url = url.replace('{0}', institution.canonicalName);
        url = url.replace('{1}', sourceID.canonicalName);
    
        return url;    
    }
};

const getUrlForExperiment = ({ experiment }) => {
    let url = constants.ESDOC_EXPERIMENT;

    return url.replace('{0}', experiment.canonicalName);
};

// Returns URL for ESGF search interface.
const getUrlForEsgfSearch = ({ mipEra, institution, sourceID, experiment, subExperiment }) => {
    let url = constants.ESGF_SEARCH;
    url = url.replace('{0}', mipEra.canonicalName);
    url = url.replace('{1}', mipEra.rawName);
    url = url.replace('{2}', institution.rawName);
    url = url.replace('{3}', experiment.rawName);
    url = url.replace('{4}', sourceID.rawName);
    if (subExperiment !== undefined) {
        url = `${url}?subexperiment_id=${subExperiment.rawName}`;
    }

    return url;
};

// Returns URL to associated DKRZ dataset errata.
const getUrlForDatasetErrata = ({ mipEra, institution, sourceID, experiment }) => {
    let url = constants.DATASET_ERRATA;
    url = url.replace('{0}', mipEra.canonicalName);
    url = url.replace('{1}', institution.canonicalName);
    url = url.replace('{2}', experiment.canonicalName);
    url = url.replace('{3}', sourceID.canonicalName);

    return url;
};

const getIsSourceIdDocumented = async (mipEra, institution, sourceID) => {
    // Invoke ES-DOC API to retrieve list of documented models.
    const url = constants.ESDOC_SOURCE_ID.replace('{0}', mipEra.canonicalName);
    let { data: { results: documents } } = await axios.get(url);

    // Pluck attributes of interest,
    documents = documents.map((i) => {
        return {
            institutionID: i[1].toLowerCase(),
            sourceID: i[4].toLowerCase()
    }});

    // Filter by institution & source,
    const document = documents.find((d) => {
        return d.institutionID === institution.canonicalName &&
               d.sourceID === sourceID.canonicalName;
    });
    
    return document === undefined ? false : true;
};
