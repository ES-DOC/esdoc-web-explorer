<template>
    <div id="cim2-model-source-list">
        <b-table borderless responsive small fixed
            class="esdoc-table-caption"
            :items="[]"
            :fields="documents.fields" />
        <b-table borderless responsive small fixed hover selectable
            style="padding-right: 0; position:relative; height: 180px; overflow-y:auto;"
            selectedVariant="esdoc-selected"
            select-mode="single"
            thead-class="hide-table-header"
            :items="documents.items"
            :fields="documents.fields"
            :tbody-tr-class="initialRowClass"
            @row-selected="setDocument" />
    </div>
</template>

<script>
import { sortBy } from "lodash";
import { mapActions, mapState } from "vuex";

export default {
    name: "DocumentSelector",
    computed: {
        ...mapState({
            documents: (state) => {
                return {
                    fields: [
                        {
                            key: 'institutionLabel',
                            label: 'Institute',
                            sortable: false,
                        },
                        {
                            key: 'source.label',
                            label: 'Model',
                            sortable: false,
                        }
                    ],
                    items: sortBy(state.documentList.inScope, ['institution.label', 'source.label'])
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
