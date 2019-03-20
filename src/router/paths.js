/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
    {
        path: "/",
        name: "home",
        view: 'core/Home'
    },
    {
        path: "/home",
        name: "home",
        view: 'core/Home'
    },
    {
        path: "/about",
        name: "about",
        view: 'core/About'
    },
    {
        path: "/not-found",
        name: "Not Found",
        view: 'core/404'
    },
].concat([
    {
        path: "/cmip6",
        name: "CMIP6",
        view: 'core/ComingSoon'
    },
    {
        path: "/cmip6/experiments",
        name: "CMIP6 Experiments",
        view: 'core/ComingSoon'
    },
    {
        path: "/cmip6/experiments/*",
        name: "CMIP6 Experiments",
        view: 'core/ComingSoon'
    },
    {
        path: "/cmip6/mips",
        name: "CMIP6 MIPS",
        view: 'core/ComingSoon'
    },
    {
        path: "/cmip6/mips/*",
        name: "CMIP6 MIPS",
        view: 'core/ComingSoon'
    },
    {
        path: "/cmip6/models",
        name: "CMIP6 Models",
        view: 'core/ComingSoon'
    },
    {
        path: "/cmip6/models/*",
        name: "CMIP6 Model",
        view: 'cim2/Model'
    },
])
