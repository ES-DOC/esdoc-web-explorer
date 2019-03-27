/**
 * @file Application level state accessors.
 *       https://vuex.vuejs.org/en/getters.html
 * @author Mark Conway-Greenslade
 */

export const getProject = (state) => () => {
    return state.route;
}
