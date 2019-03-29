<template>

    <table class="table table-bordered table-sm small">
        <thead>
            <tr class="bg-light">
                <th style="border: 0;" colspan="2">
                    <strong>{{ topicProperty.fullLabel }}</strong>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="topic-property-description-caption">
                    <strong>Description</strong>
                </td>
                <td>
                    {{ topicProperty.description }}
                </td>
            </tr>
            <tr>
                <td class="topic-property-value-caption">
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
import { mapState } from 'vuex';

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

<style>

td.topic-property-description-caption, td.topic-property-value-caption {
    width: 25%;
}

</style>
