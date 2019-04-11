<template>
    <div id="cim2-model-source-list">
        <b-table borderless responsive small fixed
            class="esdoc-table-caption"
            :items="[]"
            :fields="sources.fields" />
        <b-table borderless responsive small fixed hover selectable
            style="padding-right: 0; position:relative; height: 180px; overflow-y:auto;"
            selectedVariant="esdoc-selected"
            select-mode="single"
            thead-class="hide-table-header"
            :items="sources.items"
            :fields="sources.fields"
            :tbody-tr-class="initialRowClass"
            @row-selected="setSource" />
    </div>
</template>

<script>
import { sortBy } from "lodash";
import { mapActions, mapState } from "vuex";

export default {
    name: "SourceList",
    computed: {
        ...mapState({
            sources: (state) => {
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
                    items: sortBy(state.sourceList.inScope, ['institution.label', 'source.label'])
                }
            },
        })
    },
    methods: {
        ...mapActions([
            'setSource'
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
