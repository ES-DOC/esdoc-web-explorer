<template>
    <div>
        <TopicProperty
            v-for="topicProperty in topic.ownProperties"
            v-bind:key="topicProperty.id"
            v-bind:topicProperty="topicProperty"
        ></TopicProperty>
        <TopicSubProcess
            v-for="subProcess in topic.subProcesses"
            v-bind:key="subProcess.id"
            v-bind:subProcess="subProcess"
        ></TopicSubProcess>
    </div>
</template>

<script>
import { mapState } from "vuex";
import TopicProperty from "@/components/cim2-model/TopicProperty";
import TopicSubProcess from "@/components/cim2-model/TopicSubProcess";

export default {
    name: "Topic",

    components: {
        TopicProperty,
        TopicSubProcess
    },

    computed: {
        ...mapState({
            topic: state => state.specialization.topic
        })
    }
};

</script>
