<template>

    <table class="table table-bordered table-sm small esdoc-table-info">
        <thead>
            <tr>
                <th colspan="2" class="cim2-citation-header">
                    {{ citation.title }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="citation.citationDetail">
                <td colspan="2" class="cim2-citation-detail">
                    <div v-if="citation.doi && citation.doi !== 'n/a'">
                        <a :href=citation.doi class="cim2-citation-doi">{{ citation.citationDetail }} target="_blank"</a>
                    </div>
                    <div v-else>
                        {{ citation.citationDetail }}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

</template>

<script>

export default {
    name: "Citation",
    props: ['citation']
};

</script>
