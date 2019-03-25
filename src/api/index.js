import * as Document from './document';
import * as Project from './project';
import * as Specialization from './specialization';
import * as Vocab from './vocab';

export default {
    document: {
        getMany: Document.getMany,
        loadOne: Document.loadOne,
        getOne: async (project, institute, name) => await Document.getOne(project, institute, name),
    },

    project: {
        getAll: async () => await Project.getAll(),
    },

    specialization: {
        getAll: async () => await Specialization.getAll(),
    },

    vocab: {
        getAll: async () => await Vocab.getAll(),
    }
};
