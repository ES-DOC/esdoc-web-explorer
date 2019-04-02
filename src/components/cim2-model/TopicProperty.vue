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

export default {
    name: "TopicProperty",

    props: ['topicProperty'],

    computed: {
        vals: function () {
            const document = this.$store.state.document.current;

            if (document) {
                if (document.topicPropertyMap[this.topicProperty.id]) {
                    return document.topicPropertyMap[this.topicProperty.id].values;
                }
            }
            return ['--'];
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
