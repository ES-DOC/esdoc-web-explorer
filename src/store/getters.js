// https://vuex.vuejs.org/en/getters.html

export const getProject = (state) => () => {
    return state.route;
}
