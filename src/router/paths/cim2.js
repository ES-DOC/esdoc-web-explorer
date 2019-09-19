/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
    {
        path: "/cmip6",
        view: 'cim2/Model'
    },
    {
        path: "/cmip6/models",
        view: 'cim2/Model'
    },
    {
        path: "/cmip6/models/*",
        view: 'cim2/Model'
    },
    {
        path: "/cmip6/models/*/*",
        view: 'cim2/Model'
    }
];
