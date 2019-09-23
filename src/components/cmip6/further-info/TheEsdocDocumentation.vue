<template>
    <table class="table table-bordered table-sm small esdoc-table-info">
        <thead>
            <tr>
                <th colspan="2">
                    ES-DOC Documentation
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="caption">
                    <strong>MIP Era</strong>
                </td>
                <td>
                    <a :href=urls.mipEra target="_blank">{{ mipEra.label }}</a>
                </td>
            </tr>
            <tr>
                <td class="caption">
                    <strong>Institution</strong>
                </td>
                <td v-if="urls.institution">
                    <a :href=urls.institution target="_blank">{{ institution.label }}</a>
                </td>
                <td v-else>
                    {{ institution.label }}
                </td>
            </tr>            
            <tr>
                <td class="caption">
                    <strong>Model</strong>
                </td>
                <td v-if="urls.sourceID">
                    <a :href=urls.sourceID target="_blank">{{ sourceID.label }}</a>
                </td>
                <td v-else>
                    {{ sourceID.label }}
                </td>
            </tr>  
            <tr>
                <td class="caption">
                    <strong>Experiment</strong>
                </td>
                <td>
                    <a :href=urls.experiment target="_blank">{{ experiment.label }}</a>
                </td>
            </tr>  
            <tr>
                <td class="caption">
                    <strong>Ensemble Description</strong>
                </td>
                <td v-if="urls.ensembleDescription">
                    <a :href=urls.ensembleDescription target="_blank">View @ ES-DOC</a>
                </td>
                <td v-else>
                    N/A
                </td>
            </tr>
            <tr>
                <td class="caption">
                    <strong>Machine Performance</strong>
                </td>
                <td v-if="urls.machinePerformance">
                    <a :href=urls.machinePerformance target="_blank">View @ ES-DOC</a>
                </td>
                <td v-else>
                    N/A
                </td>
            </tr>            
        </tbody>
    </table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

// Get pointer to namespaced state store module.
const { mapActions, mapState } = createNamespacedHelpers('cmip6/furtherInfo');

export default {
    name: "TheEsdocDocumentation",
    computed: {
        ...mapState(['mipEra', 'institution', 'sourceID', 'experiment', 'urls']),
    }
};
</script>
