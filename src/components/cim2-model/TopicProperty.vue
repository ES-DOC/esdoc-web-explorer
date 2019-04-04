<template>

    <table class="table table-bordered table-sm small esdoc-table-info">
        <thead>
            <tr>
                <th colspan="2">
                    {{ topicProperty.fullLabel }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="caption">
                    <strong>Description</strong>
                </td>
                <td>
                    {{ topicProperty.description }}
                </td>
            </tr>
            <tr>
                <td class="caption">
                    <strong>Value(s)</strong>
                </td>
                <td>
                    <span
                        v-for="value in vals"
                    >{{ value }}<br/></span>
                </td>
            </tr>
        </tbody>
    </table>

</template>

<script>
import { mapState } from "vuex";

const NO_VALUES = ['--'];

export default {
    name: "TopicProperty",

    props: ['topicProperty'],

    computed: {
        vals: function () {
            const document = this.$store.state.document.current;

            let values = [];
            if (document && document.topicPropertyMap[this.topicProperty.id]) {
                values = document.topicPropertyMap[this.topicProperty.id].values;
            }

            if (values.length && this.topicProperty.type === 'enum') {
                values = values.map(i => {
                    const choice = this.topicProperty.enum.choices.find(c => {
                        return c.label.toLowerCase() === i.toLowerCase()
                    });
                    if (choice && choice.description) {
                        return `${i} - ${choice.description}`;
                    }
                    return i;
                })
            }

            values = values.map(val => {
                const v = val.toLowerCase();
                if (v === 'f' || v === 'false') {
                    return 'FALSE';
                }
                if (v === 't' || v === 'true') {
                    return 'TRUE';
                }
                if (v === 'nil:inapplicable') {
                    return 'N/A';
                }
                return `${val.slice(0, 1).toUpperCase()}${val.slice(1)}`;
            })

            return values.length ? values : NO_VALUES;
        },

        ...mapState({
            document: state => state.document.current,
            values: state => {
                return state.document.current ? state.document.current.topicProperties[3].values : []
            }
        })
    }
};

</script>
