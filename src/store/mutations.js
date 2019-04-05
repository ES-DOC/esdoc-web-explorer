/**
 * @file Application level state mutations.
 *       https://vuex.vuejs.org/en/mutations.html
 * @author Mark Conway-Greenslade
 */

 /**
  * Initialises state store - part of application setup process.
  */
export const initialise = async (state, { project, projects, specializations, vocabs }) => {
    // Set project related state.
    state.project.all = projects;
    state.project.current = projects.find(i => i.key === project);

    // Set specialisation related state.
    state.specialization.all = specializations;
    state.specialization.current = specializations[project];
    state.specialization.topics = state.specialization.current.reduce((v, s) => v.concat(s.topics), []);
    state.specialization.topic = state.specialization.topics[0];

    // Set vocabularies used across application.
    state.vocabs = vocabs;
}

export const updateProject = async (state, project) => {
    state.project.current = project;
}

export const setTopic = async (state, topic) => {
    state.specialization.topic = topic;
}

export const setDocument = async (state, document) => {
    state.document.current = document;
    const topics = state.vocabs.WCRP.CMIP6.getSourceComponents(document.canonicalID).concat(['toplevel']);
    for (let t of state.specialization.topics) {
        t._isInScope = topics.includes(t._path[1]);
    }
}

export const setSummary = async (state, summary) => {
    state.summary.current = summary;
}

export const setSummaries = async (state, summaries) => {
    state.summary.all = summaries;
}
