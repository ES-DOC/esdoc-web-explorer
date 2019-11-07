/**
 * @file Returns set of URL's to be rendered to user.
 * @author Mark Conway-Greenslade
 */

import * as axios from "axios";
import * as constants from "./urlConstants";

/**
 * Returns set of URL"s to be rendered to user.
 */
export default async (vocabs) => {
    return {
        datasetErrata: getUrlForDatasetErrata(vocabs),
        ensembleDescription: null,
        esdoc: constants.ESDOC_CMIP6,
        esgfSearch: getUrlForEsgfSearch(vocabs),
        experiment: getUrlForExperiment(vocabs),
        experimentCitations: await getUrlForExperimentCitations(vocabs),
        institution: getUrlForInstitution(vocabs),
        institutionCitations: await getUrlForInstitutionCitations(vocabs),
        machinePerformance: null,
        mipEra: getUrlForMipEra(vocabs),
        sourceID: await getUrlForSourceID(vocabs),
        wgcm: constants.WCRP_CMIP6
    };
};

// Returns URL to associated DKRZ dataset errata.
const getUrlForDatasetErrata = ({
    mipEra,
    activityID,
    institution,
    sourceID,
    experiment
}) => {
    let url = constants.DATASET_ERRATA;
    url = url.replace("{0}", mipEra.canonicalName);
    url = url.replace("{1}", activityID.canonicalName);
    url = url.replace("{2}", institution.canonicalName);
    url = url.replace("{3}", experiment.canonicalName);
    url = url.replace("{4}", sourceID.canonicalName);

    return url;
};

// Returns URL for ESGF search interface.
const getUrlForEsgfSearch = ({
    mipEra,
    activityID,
    institution,
    sourceID,
    experiment,
    subExperiment
}) => {
    let url = constants.ESGF_SEARCH;
    url = url.replace("{0}", mipEra.canonicalName);
    url = url.replace("{1}", mipEra.rawName);
    url = url.replace("{2}", activityID.rawName);
    url = url.replace("{3}", institution.rawName);
    url = url.replace("{4}", experiment.rawName);
    url = url.replace("{5}", sourceID.rawName);
    if (subExperiment !== undefined) {
        url = `${url}?subexperiment_id=${subExperiment.rawName}`;
    }

    return url;
};

// Returns URL for ES-DOC experiment documentation.
const getUrlForExperiment = ({ experiment }) => {
    let url = constants.ESDOC_EXPERIMENT;

    return url.replace("{0}", experiment.canonicalName);
};

// Returns URL for DKRZ experiment citations.
const getUrlForExperimentCitations = async (vocabs) => {
    const {
        experiment: {
            data: {
                activityID: activityIdentifiers
            }
        }
    } = vocabs;

    const result = [];
    for (const activityID of activityIdentifiers) {
        result.push({
            activityID,
            url: await getUrlForExperimentCitation(vocabs)
        });
    }

    return result;
};

// Returns URL for a DKRZ experiment citation.
const getUrlForExperimentCitation = async ({
    mipEra,
    activityID,
    institution,
    sourceID,
    experiment
}) => {
    // Set URL to invoke.
    let url = constants.DKRZ_CITATIONS_EXPERIMENT;
    url = url.replace("{0}", mipEra.canonicalName);
    url = url.replace("{1}", mipEra.rawName);
    url = url.replace("{2}", activityID.rawName);
    url = url.replace("{3}", institution.rawName);
    url = url.replace("{4}", sourceID.rawName);
    url = url.replace("{5}", experiment.rawName);

    // Invoke API & escape if there was no response.
    let { data: response } = await axios.get(url);
    if (!response.length) {
        return;
    }

    // Extract response data.
    const {
        CITATION_COMPLETED: citationExists,
        DATA_REFERENCE: dataReference
    } = response[0];

    // Return DOI when citation exists.
    if (citationExists) {
        return dataReference.split("doi:")[1].split(" ")[0];
    }
};

// Returns URL for an institute.
const getUrlForInstitution = ({ institution }) => {
    return institution.data.homepage ? institution.data.homepage : null;
};

// Returns URL for DKRZ experiment citations.
const getUrlForInstitutionCitations = async (vocabs) => {
    const {
        experiment: {
            data: {
                activityID: activityIdentifiers
            }
        }
    } = vocabs;

    const result = [];
    for (const activityID of activityIdentifiers) {
        result.push({
            activityID,
            url: await getUrlForInstitutionCitation(vocabs)
        });
    }

    return result;
};

// Returns URL for a DKRZ institution citation.
const getUrlForInstitutionCitation = async ({
    mipEra,
    activityID,
    institution,
    sourceID
}) => {
    // Set URL to invoke.
    let url = constants.DKRZ_CITATIONS_INSTITUTE;
    url = url.replace("{0}", mipEra.canonicalName);
    url = url.replace("{1}", mipEra.rawName);
    url = url.replace("{2}", activityID.rawName);
    url = url.replace("{3}", institution.rawName);
    url = url.replace("{4}", sourceID.rawName);

    // Invoke API & escape if there was no response.
    let { data: response } = await axios.get(url);
    if (!response.length) {
        return;
    }

    // Extract response data.
    const {
        CITATION_COMPLETED: citationExists,
        DATA_REFERENCE: dataReference
    } = response[0];

    // Return DOI when citation exists.
    if (citationExists) {
        return dataReference.split("doi:")[1].split(" ")[0];
    }
};

// Returns URL for a ES-DOC mip era documentation.
const getUrlForMipEra = ({ mipEra }) => {
    const url = constants.ESDOC_MIP_ERA;

    return url.replace("{0}", mipEra.canonicalName);
};

// Returns URL for a ES-DOC source id documentation.
const getUrlForSourceID = async ({ mipEra, institution, sourceID }) => {
    const isDocumented = await getIsSourceIdDocumented(mipEra, institution, sourceID);
    if (isDocumented) {
        let url = constants.ESDOC_MODEL;
        url = url.replace("{0}", institution.canonicalName);
        url = url.replace("{1}", sourceID.canonicalName);

        return url;
    }
};

// Returns flag indicating whether the CMIP6 source identifier is documented or not.
const getIsSourceIdDocumented = async (mipEra, institution, sourceID) => {
    // Invoke ES-DOC API to retrieve list of documented models.
    const url = constants.ESDOC_SOURCE_ID.replace("{0}", mipEra.canonicalName);
    let {
        data: {
            results: documents
        }
    } = await axios.get(url);

    // Pluck attributes of interest,
    documents = documents.map((i) => {
        return {
            institutionID: i[1].toLowerCase(),
            sourceID: i[4].toLowerCase()
        };
    });

    // Filter by institution & source,
    const document = documents.find((d) => {
        return d.institutionID === institution.canonicalName &&
               d.sourceID === sourceID.canonicalName;
    });

    return document === undefined ? false : true;
};

