<template>
    <div>
        <b-table borderless responsive small fixed
            class="topic-tree-head"
            head-variant="light"
            :items="[]"
            :fields="topics.fields" />
        <b-table borderless hover responsive selectable small
            head-variant="light"
            selectedVariant="success"
            select-mode="single"
            thead-class="hide-table-header"
            :items="topics.items"
            :fields="topics.fields"
            :tbody-tr-class="rowClass"
            @row-selected="setTopic"
            style="position:relative; height: 870px; overflow-y:auto;" />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: "TopicTree",
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
                    items: state.specialization.topics.filter(t => t.depth < 3)
                }
            },
        }),
    },
    methods: {
        rowClass(item) {
            // if (item.id === 'cmip6.toplevel') {
            //     return [
            //         `indent-${item.depth}`,
            //         'table-success',
            //     ]
            // }
            return [
                `indent-${item.depth}`
            ]
        },
        ...mapActions([
            'setTopic'
        ])
    }
};

</script>

<style>
.topic-tree-head {
    margin-bottom: -10px;
}
.hide-table-header {
    display: none;
}
tbody, thead {
    text-align: left;
}
tr.indent-1 > td {
    font-weight: bold;
}
tr.indent-2 > td {
    padding-left: 20px;
}
</style>
