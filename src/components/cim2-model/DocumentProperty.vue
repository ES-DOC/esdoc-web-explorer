<template>

    <b-table borderless hover responsive selectable small fixed
        :items="documents.items"
        :fields="documents.fields"
        :tbody-tr-class="initialRowClass"
        @row-selected="setDocument"
        style="position:relative; height: 870px; overflow-y:auto;" />

</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "DocumentProperty",
    props: {
        title: String,
        description: String,
        values: Array
    },
    computed : {

    }
};
</script>
