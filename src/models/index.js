import * as models from './model/index';
import * as factories from './factory/index';

export default {
    getSourceList: (ctx) => factories.getSourceList(models, ctx),
    getTopicTree: (ctx) => factories.getTopicTree(models, ctx)
}
