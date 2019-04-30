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
            :tbody-tr-class="rowClass"
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
                            key: 'institutionID.label',
                            label: 'Institute'
                        },
                        {
                            key: 'sourceID.label',
                            label: 'Model'
                        }
                    ],
                    items: sortBy(state.documents.all, [
                        'institutionID.label',
                        'sourceID.label'
                    ])
                }
            },
        })
    },
    methods: {
        ...mapActions([
            'setDocument'
        ]),
        rowClass(item) {
            return item.isSelected ? 'b-table-row-selected table-esdoc-selected' : '';
        }
    }
};

</script>
