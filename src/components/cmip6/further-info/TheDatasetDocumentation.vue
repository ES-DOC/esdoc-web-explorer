<template>
    <table class="table table-bordered table-sm small esdoc-table-info">
        <thead>
            <tr>
                <th colspan="2">
                    Dataset Documentation
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="caption">
                    <strong>ESGF Search</strong>
                </td>
                <td>
                    <a :href=urls.esgfSearch target="_blank">View @ PCMDI</a>
                </td>
            </tr>
            <tr>
                <td class="caption">
                    <strong>Errata</strong>
                </td>
                <td>
                    <a :href=urls.datasetErrata target="_blank">View @ ES-DOC</a>
                </td>
            </tr>
            <tr>
                <td class="caption">
                    <strong>Citation (Institute)</strong>
                </td>
                <td v-if="urls.institutionCitations">
                    <a :href=urls.institutionCitations target="_blank">View @ DKRZ</a>
                </td>
                <td v-else>
                    N/A
                </td>
            </tr>
            <tr>
                <td class="caption">
                    <strong>Citation (Experiment)</strong>
                </td>
                <td v-if="urls.experimentCitations">
                    <a :href=urls.experimentCitations target="_blank">View @ DKRZ</a>
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
    name: "TheDatasetDocumentation",
    computed: {
        ...mapState(['urls']),
    }
};
</script>
