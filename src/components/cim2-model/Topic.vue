<template>
    <div style="position:relative; height: 860px; overflow-y:auto;">
        <TopicProperty
            v-for="topicProperty in topic.ownProperties"
            v-bind:key="topicProperty.id"
            v-bind:topicProperty="topicProperty"
        ></TopicProperty>
        <div v-for="subProcess in topic.subProcesses">
            <TopicProperty
                v-for="topicProperty in subProcess.ownProperties"
                v-bind:key="topicProperty.id"
                v-bind:topicProperty="topicProperty"
            ></TopicProperty>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import TopicProperty from "@/components/cim2-model/TopicProperty";

export default {
    name: "Topic",

    components: {
        TopicProperty
    },

    computed: {
        ...mapState({
            topic: state => state.specialization.topic
        })
    }
};

</script>
