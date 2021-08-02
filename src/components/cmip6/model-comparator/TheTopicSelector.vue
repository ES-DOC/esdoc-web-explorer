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
            @row-selected="setTopic" />
    </div>
</template>

<script>

import { createNamespacedHelpers } from "vuex";

// Get pointer to namespaced state store module.
const { mapActions, mapState } = createNamespacedHelpers('cmip6/modelComparator');

export default {
    name: "TopicSelector",
    computed: {
        ...mapState({
            topicTree: ({ topics }) => {
                return {
                    fields: [ 'label', 'depth' ],
                    // fields: [
                    //     {
                    //         key: 'id',
                    //         label: 'Realm / Process 456',
                    //         sortable: false
                    //     },
                    //     {
                    //         key: 'label',
                    //         label: 'Realm / Process 123',
                    //         sortable: false
                    //     },
                    // ],
                    items: topics.filter(i => i.depth <= 2)
                }
            },
        }),
    },
    methods: {
        rowClass(item) {
            return [
                `indent-${item.depth} b-table-row-selected table-esdoc-selected`,
            ]
        },
        ...mapActions([
            'setTopic'
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
