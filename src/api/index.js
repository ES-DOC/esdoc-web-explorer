import * as DocumentApi from './document';
import * as ProjectApi from './project';
import * as SpecializationApi from './specialization';
import loadVocabs from './pyessv/index';
import { getApplicationMode } from '@/utils';

export default {
    document: {
        ...DocumentApi
    },

    project: {
        ...ProjectApi,
    },

    specialization: {
        ...SpecializationApi,
    },

    vocab: {
        getAll: () => loadVocabs(getApplicationMode()),
    }
};
