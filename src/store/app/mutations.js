/**
 * @file Store state mutations.
 * @author Mark Conway-Greenslade
 */

/**
 * Sets flag indicating whether explorer has been initialised.
 */
export const setIsInitialised = (state, isInitialised) => {
    state.isInitialised = isInitialised;
}

/**
 * Sets flag indicating whether a document is being loaded into memory.
 */
export const setIsLoading = (state, isLoading) => {
    state.isLoading = isLoading;
}
