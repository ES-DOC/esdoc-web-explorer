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
                <td v-if="urls.institutionCitations.length === 1">
                    <a v-for="url in urls.institutionCitations" :href=url.url target="_blank">View @ DKRZ</a>
                </td>
                <td v-else-if="urls.institutionCitations.length > 1">
                    <a v-for="url in urls.institutionCitations" :href=url.url target="_blank">View {{ url.activityID }} @ DKRZ&nbsp;</a>
                </td>
                <td v-else>
                    N/A
                </td>
            </tr>
            <tr>
                <td class="caption">
                    <strong>Citation (Experiment)</strong>
                </td>
                <td v-if="urls.experimentCitations.length === 1">
                    <a v-for="url in urls.experimentCitations" :href=url.url target="_blank">View @ DKRZ</a>
                </td>
                <td v-else-if="urls.experimentCitations.length > 1">
                    <a v-for="url in urls.experimentCitations" :href=url.url target="_blank">View {{ url.activityID }} @ DKRZ&nbsp;</a>
                </td>
                <td v-else>
                    N/A
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "TheDatasetDocumentation",
    computed: {
        ...mapState('cmip6/furtherInfo', ['urls']),
    }
};
</script>
