// Map: project <--> list of supported models.
export const MODELS = {
    cmip6: PYESSV.WCRP.CMIP6.getSource()
}

/**
 * Returns a model matched by canonical or raw name.
 */
export const getModels = (project) => {
    return MODELS[project];
}

/**
 * Returns a model matched by canonical or raw name.
 */
export const getModel = (project, name) => {
    return getModels(project).find(
        i => i.canonicalName === name || i.rawName === name
    );
}
