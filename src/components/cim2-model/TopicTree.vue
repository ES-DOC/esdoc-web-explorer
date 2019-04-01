<template>
    <div>
        <b-table borderless responsive small fixed
            class="esdoc-table-caption"
            :items="[]"
            :fields="topics.fields" />
        <b-table borderless hover responsive selectable small
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
.hide-table-header {
    display: none;
}
tr.indent-1 > td {
    font-weight: bold;
}
tr.indent-2 > td {
    padding-left: 20px;
}
</style>
