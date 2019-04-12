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
        <Citation
            v-for="citation in document.citations"
            v-bind:citation="citation"
        ></Citation>
    </div>
</template>

<script>
import { mapState } from "vuex";
import TopicProperty from "@/components/cim2-model/TopicProperty";
import Citation from "@/components/cim2-shared/Citation";

export default {
    name: "Topic",

    components: {
        TopicProperty,
        Citation
    },

    computed: {
        ...mapState({
            document: state => state.document,
            topic: state => state.topic
        })
    }
};
</script>
