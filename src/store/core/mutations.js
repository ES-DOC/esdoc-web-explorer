/**
 * @file Store state mutations.
 * @author Mark Conway-Greenslade
 */

/**
 * Initialises state store - part of application setup process.
 */
export const initialise = (state, {
    project,
    projects,
    vocabs
}) => {
    state.project = project;
    state.projects = projects;
    state.vocabs = vocabs;
};

/**
 * Sets information pertaining to currently loaded document.
 */
export const setDocumentInfo = (state, { documentLabel, documentType }) => {
    state.documentLabel = documentLabel;
    state.documentType = documentType;
};

/**
 * Sets flag indicating whether explorer has been initialised.
 */
export const setIsInitialised = (state, isInitialised) => {
    state.isInitialised = isInitialised;
};

/**
 * Sets flag indicating whether a document is being loaded into memory.
 */
export const setIsLoading = (state, isLoading) => {
    state.isLoading = isLoading;
};

/**
 * Displays a message to the user.
 */
export const setUserMessage = ({ userMessage }, msgInfo) => {
    userMessage.details = msgInfo;
    userMessage.isVisible = true;
};
