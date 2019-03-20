// List: supported projects.
export const PROJECTS = [
    {
        label: 'CMIP6',
        key: 'cmip6',
    }
];

/**
 * Returns default project.
 */
export const getDefault = () => {
    return getProject('cmip6');
}

/**
 * Returns a project matched by project identifier.
 */
export const getProject = (key) => {
    return PROJECTS.find(i => i.key === key);
}
