<template>
    <div>
        <b-table borderless responsive small fixed
            class="esdoc-table-caption"
            :items="[]"
            :fields="sources.fields" />
        <b-table borderless responsive small fixed hover selectable
            selectedVariant="esdoc-selected"
            select-mode="single"
            thead-class="hide-table-header"
            :items="sources.items"
            :fields="sources.fields"
            :tbody-tr-class="initialRowClass"
            @row-selected="setDocument" />
    </div>
</template>

<script>
import * as _ from "lodash";
import { mapActions, mapState } from "vuex";

export default {
    name: "SourceList",
    computed: {
        ...mapState({
            sources: (state) => {
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
                    items: _.sortBy(state.summary.all, ['institute', 'canonicalName'])
                }
            },
        })
    },
    methods: {
        ...mapActions([
            'setDocument'
        ]),
        initialRowClass(item, type) {
            return
            const paths = window.location.pathname.split('/').reverse();
            if (item.institute.toLowerCase() === paths[1] &&
                item.canonicalName.toLowerCase() === paths[0]) {
                return 'table-success'
            }
        }
    }
};

</script>
