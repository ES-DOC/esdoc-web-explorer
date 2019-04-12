import * as DocumentApi from './document';
import * as ProjectApi from './project';
import * as SpecialisationApi from './specialisation';
import loadVocabs from './pyessv/index';
import { getApplicationMode } from '@/utils';

export default {
    document: {
        ...DocumentApi
    },

    project: {
        ...ProjectApi,
    },

    specialisation: {
        ...SpecialisationApi,
    },

    vocab: {
        getAll: () => loadVocabs(getApplicationMode()),
    }
};
