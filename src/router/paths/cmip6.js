/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

const comparator = [
    {
        path: "/cmip6/compare-models",
        view: "cmip6/ModelComparator"
    }
];

const models = [
    {
        path: "/cmip6",
        view: "cim2/Model"
    },
    {
        path: "/cmip6/models",
        view: "cim2/Model"
    },
    {
        path: "/cmip6/models/*",
        view: "cim2/Model"
    },
    {
        path: "/cmip6/models/*/*",
        view: "cim2/Model"
    }
];

const furtherInformation = [
    {
        path: "/cmip6/further-info",
        view: "cmip6/FurtherInfo"
    }
];

export default models.concat(furtherInformation).concat(comparator);
