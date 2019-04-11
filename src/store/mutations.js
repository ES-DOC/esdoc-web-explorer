/**
 * @file Application level state mutations.
 *       https://vuex.vuejs.org/en/mutations.html
 * @author Mark Conway-Greenslade
 */

 /**
  * Initialises state store - part of application setup process.
  */
export const initialise = async (state, {
    document,
    project,
    projects,
    sourceList,
    specializations,
    summaries,
    summary,
    vocabs
}) => {
    state.document.current = document;

    state.project.all = projects;
    state.project.current = projects.find(i => i.key === project);

    state.sourceList = sourceList;

    state.specialization.all = specializations;
    state.specialization.current = specializations[project];
    state.specialization.topics = state.specialization.current.reduce((v, s) => v.concat(s.topics), []);
    state.specialization.topic = state.specialization.topics[0];

    state.summary.all = summaries;
    state.summary.current = summary;

    state.vocabs = vocabs;
}

export const setDocument = async (state, document) => {
    state.document.current = document;
}

export const setSummary = async (state, summary) => {
    state.summary.current = summary;
}

export const setTopic = async (state, { specialisationID }) => {
    state.specialization.topic = state.specialization.topics.find(i => i.id === specialisationID);
}

export const updateProject = async (state, project) => {
    state.project.current = project;
}
