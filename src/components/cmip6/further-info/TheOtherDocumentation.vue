<template>
    <table class="table table-bordered table-sm small esdoc-table-info">
        <thead>
            <tr>
                <th colspan="2">
                    Other Documentation
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="caption">
                    <strong>WCRP CMIP6 Homepage</strong>
                </td>
                <td>
                    <a :href=urls.wgcm target="_blank">{{ urls.wgcm }}</a>
                </td>
            </tr>
            <tr>
                <td class="caption">
                    <strong>ES-DOC CMIP6 Homepage</strong>
                </td>
                <td>
                    <a :href=urls.esdoc target="_blank">{{ urls.esdoc }}</a>
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
    name: "TheOtherDocumentation",
    computed: {
        ...mapState(['urls']),
    }
};
</script>
