/**
 * @file Store state accessors.
 * @author Mark Conway-Greenslade
 */

export const document = (state) => {
    return state.documents.current;
}

export const getProject = (state) => () => {
    return state.route;
}
