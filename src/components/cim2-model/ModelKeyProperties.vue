<template>

    <div>
        
    </div>

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
    name: "ModelKeyProperties",
    data: {
        topicPrefix: "Top Level"
    }
    computed: mapState({
        topic: state => state.model.keyProperties,
    })
};
</script>
