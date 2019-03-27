/**
 * @file Exposes functions for pulling project configuration.
 * @author Mark Conway-Greenslade
 */

// List: supported projects.
const PROJECTS = [
    {
        label: 'CMIP5',
        key: 'cmip5',
        documentTypes: {
            all: [
                {
                    label: 'Experiment',
                    key: 'experiment',
                },
                {
                    label: 'Model',
                    key: 'model',
                }
            ],
            current: null
        }
    },
    {
        label: 'CMIP6',
        key: 'cmip6',
        documentTypes: {
            all: [
                {
                    label: 'Experiment',
                    key: 'experiment',
                },
                {
                    label: 'MIP',
                    key: 'mip',
                },
                {
                    label: 'Model',
                    key: 'model',
                }
            ],
            current: {
                label: 'Model',
                key: 'model',
            }
        }
    }
];

/**
 * Returns all supported projects.
 */
export const getAll = async () => {
    // Simulate fetching from a micro-service.
    return PROJECTS;
}
