// https://vuex.vuejs.org/en/actions.html

import API from '@/api';

export const initialise = async (context, defaults) => {
    const projects = await API.project.getAll();
    await context.commit('initialise', {
        defaults,
        documents: await API.document.getMany('cmip6', 'cim.2.science.Model'),
        projects: await API.project.getAll(),
        specializations: await API.specialization.getAll(),
        vocabs: await API.vocab.getAll()
    });
};

export const updateProject = async (context, project) => {
    await context.commit('updateProject', project);
};

export const setTopic = async (context, [topic]) => {
    await context.commit('setTopic', topic);
}

export const setPrimaryTopic = async (context, topic) => {
    await context.commit('setPrimaryTopic', topic);
}

export const setDocument = async ({ commit }, [document]) => {
    const model = await API.document.loadOne(document);
    await commit('setDocument', document);
    console.log(model);
    await commit('setModel', model);
}
