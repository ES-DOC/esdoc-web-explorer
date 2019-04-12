<template>
    <div>
        <b-table borderless responsive small fixed
            class="esdoc-table-caption"
            :items="[]"
            :fields="topics.fields" />
        <b-table borderless hover responsive selectable small
            style="padding-right: 0; position:relative; height: 620px; overflow-y:auto;"
            selectedVariant="esdoc-selected"
            select-mode="single"
            thead-class="hide-table-header"
            :items="topics.items"
            :fields="topics.fields"
            :tbody-tr-class="rowClass"
            @row-selected="setTopic" />
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "TopicList",
    computed: {
        ...mapState({
            topics: (state) => {
                return {
                    fields: [
                        {
                            key: 'label',
                            label: 'Realm / Process',
                            sortable: false
                        }
                    ],
                    items: state.document.topicTree
                }
            },
        }),
    },
    methods: {
        rowClass(item) {
            return [
                `indent-${item.depth}`,
                item.isDocumented === false ? 'undocumented' : '',
                item.isSelected ? 'b-table-row-selected table-esdoc-selected' : ''
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
