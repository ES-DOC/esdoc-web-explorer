<template>

    <table class="table table-bordered table-sm small">
        <tbody>
            <tr class="bg-light">
                <td colspan="2">
                    <strong>{{ topicProperty.fullLabel }}</strong>
                </td>
            </tr>
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
                    TODO: extract from loaded document
                </td>
            </tr>
        </tbody>
    </table>

</template>

<script>

export default {
    name: "TopicProperty",
    props: ['topicProperty'],
};

</script>

<style>

td.topic-property-description-caption, td.topic-property-value-caption {
    width: 25%;
}

</style>
