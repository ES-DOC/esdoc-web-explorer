<template>
    <div id="cim2-model-source-list">
        <b-container hidden>
            <b-row class="sub-section">
                <span style="width: 30%; font-weight: bold;">Institute</span>
                <select id="institute-selector" style="width: 70%;">
                    <option
                        v-for="institute in institutions"
                        :key="institute.canonicalName"
                        value="institute.canonicalName">
                        {{ institute.label }}
                    </option>
                </select>
            </b-row>
            <b-row class="sub-section">
                <span style="width: 30%; font-weight: bold;">Model</span>
                <select id="source-selector" style="width: 70%;">
                    <option
                        v-for="source in sources"
                        :key="source.canonicalName"
                        value="source.canonicalName">
                        {{ source.label }}
                    </option>
                </select>
            </b-row>
        </b-container>

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
            institution: state => state.institution,
            institutions: state => state.institutions,
            sources: state => state.sources
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
