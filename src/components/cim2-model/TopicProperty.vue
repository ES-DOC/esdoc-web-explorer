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
            <tr v-for="(value, index) in vals">
                <td v-if="index === 0"
                    class="caption"
                    :rowspan="vals.length">
                    <strong>Value{{ vals.length > 1 || topicProperty.cardinality.endsWith('N') ? "s" : "" }}</strong>
                </td>
                <td>
                    {{ value }}
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
            const document = this.$store.state.document;

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
                if (v === 'nil:inapplicable' || v === 'other: n/a') {
                    return 'N/A';
                }
                return `${val.slice(0, 1).toUpperCase()}${val.slice(1)}`;
            })

            if (values.length) {
                return values;
            }

            if (this.topicProperty.cardinality.slice(0, 1) === '1') {
                return ['-- Awaiting modelling group input --']
            }

            return NO_VALUES;
        },

        ...mapState({
            document: state => state.document,
            values: state => {
                return state.document ? state.document.topicProperties[3].values : []
            }
        })
    }
};

</script>
