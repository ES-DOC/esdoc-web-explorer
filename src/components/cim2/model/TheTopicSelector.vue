<template>
    <div>
        <div class="sub-section">
            <strong>Realm > Process</strong>
        </div>
        <b-table borderless hover responsive selectable small
            style="padding-right: 0; height: 1150px; overflow-y:auto;"
            selectedVariant="esdoc-selected"
            select-mode="single"
            thead-class="hide-table-header"
            :items="topicTree.items"
            :fields="topicTree.fields"
            :tbody-tr-class="rowClass"
            @row-selected="setDocumentTopic" />
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

// Get pointer to namespaced state store module.
const { mapActions, mapState } = createNamespacedHelpers('cim2/model');

export default {
    name: "TopicSelector",
    computed: {
        ...mapState({
            topicTree: ({ document }) => {
                return {
                    fields: [
                        {
                            key: 'topic.label',
                            label: 'Realm / Process',
                            sortable: false
                        }
                    ],
                    items: document.topicTree
                }
            },
        }),
    },
    methods: {
        rowClass(item) {
            return [
                `indent-${item.topic.depth}`,
                item.isDocumented === false ? 'undocumented' : '',
                item.isSelected ? 'b-table-row-selected table-esdoc-selected' : ''
            ]
        },
        ...mapActions([
            'setDocumentTopic'
        ])
    }
};

</script>

<style>
.hide-table-header {
    display: none;
}
tr.undocumented > td {
    color: grey;
}
tr.indent-1 > td {
    font-weight: bold;
}
tr.indent-2 > td {
    padding-left: 20px;
}
</style>
