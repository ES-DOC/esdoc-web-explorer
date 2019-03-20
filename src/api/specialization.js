import cmip6_toplevel from '@/static/data/cmip6-specializations/_toplevel.json';
import cmip6_aerosol from '@/static/data/cmip6-specializations/_aerosol.json';
import cmip6_atmos from '@/static/data/cmip6-specializations/_atmos.json';
import cmip6_atmoschem from '@/static/cmip6-specializations/cmip6/_atmoschem.json';
import cmip6_land from '@/static/data/cmip6-specializations/_land.json';
import cmip6_landice from '@/static/data/cmip6-specializations/_landice.json';
import cmip6_ocean from '@/static/data/cmip6-specializations/_ocean.json';
import cmip6_ocnbgchem from '@/static/data/cmip6-specializations/_ocnbgchem.json';
import cmip6_seaice from '@/static/data/cmip6-specializations/_seaice.json';

// Map: project <--> list of specialization topics.
export const SPECIALIZATIONS = {
    cmip6: [
        cmip6_toplevel,
        cmip6_aerosol,
        cmip6_atmos,
        cmip6_atmoschem,
        cmip6_land,
        cmip6_landice,
        cmip6_ocean,
        cmip6_ocnbgchem,
        cmip6_seaice,
    ]
}

/**
 * Returns a specialization matched by project identifier.
 */
export const getSpecialization = (project) => {
    return SPECIALIZATIONS[project];
};

/**
* Returns a topic matched by project & topic identifiers.
 */
export const getTopic = (project, topic) => {
    const specialization = getSpecialization(project);
    if (topic === undefined) {
        return specialization[0];
    }
    return specialization.find(i => i.name === topic);
};
