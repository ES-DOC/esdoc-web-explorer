// https://vuex.vuejs.org/en/mutations.html

export const initialise = (state, { defaults, documents, projects, specializations, vocabs }) => {
    state.documents.all = documents;
    state.project.all = projects;
    state.project.current = projects.find(i => i.key === defaults.project);
    state.specialization.all = specializations;
    state.specialization.current = specializations[defaults.project];
    state.specialization.topics = state.specialization.current.reduce((v, s) => v.concat(s.topics), []);
    state.specialization.primary = state.specialization.topics[0];
    state.specialization.topic = state.specialization.topics[0];
    state.vocabs = vocabs;
}

export const updateProject = (state, project) => {
    state.project.current = project;
}

export const setTopic = (state, topic) => {
    state.specialization.topic = topic;
}

export const setPrimaryTopic = (state, topic) => {
    state.specialization.primary = topic;
}

export const setDocument = (state, document) => {
    state.documents.current = document;
}
