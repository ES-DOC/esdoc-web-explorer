<template>

    <b-container fluid>
        <b-row>
            <b-col>
                {{ model }}
            </b-col>
        </b-row>
    </b-container>

</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "Document",
    computed: mapState({
        model: state => state.model,
    })
};
</script>
