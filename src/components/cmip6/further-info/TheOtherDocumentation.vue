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
import { mapState } from "vuex";

export default {
    name: "TheOtherDocumentation",
    computed: {
        ...mapState('cmip6/furtherInfo', ['urls']),
    }
};
</script>
