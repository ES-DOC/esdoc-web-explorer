<template>
    <div>
        <b-table borderless responsive small fixed
            class="source-list-head"
            head-variant="light"
            :items="[]"
            :fields="documents.fields" />
        <b-table borderless hover responsive selectable small fixed
            head-variant="light"
            selectedVariant="success"
            select-mode="single"
            thead-class="hide-table-header"
            :items="documents.items"
            :fields="documents.fields"
            @row-selected="setDocument"
            style="position:relative; height: 870px; overflow-y:auto;" />
    </div>
</template>

<script>
import * as _ from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
    name: "SourceList",
    computed: {
        ...mapState({
            documents: (state) => {
                return {
                    fields: [
                        {
                            key: 'institute',
                            sortable: false,
                        },
                        {
                            key: 'canonicalName',
                            label: 'Source ID',
                            sortable: false,
                        }
                    ],
                    items: _.sortBy(state.documents.all, ['institute', 'canonicalName'])
                }
            }
        })
    },
    methods: {
        ...mapActions([
            'setDocument'
        ])
    }
};

</script>

<style>
.source-list-head {
    margin-bottom: -10px;
}

.hide-table-header {
    display: none;
}

tr.row td.cell {
    text-align: left;
}

</style>
