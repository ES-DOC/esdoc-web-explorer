/**
 * @file Application level state accessors.
 *       https://vuex.vuejs.org/en/getters.html
 * @author Mark Conway-Greenslade
 */

export const document = (state) => {
    return state.documents.current;
}

export const getProject = (state) => () => {
    return state.route;
}
