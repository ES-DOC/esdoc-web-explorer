<template>
    <div style="position:relative; height: 860px; overflow-y:auto;">
        <div class="topic-sub-section">
            <strong>Top Level</strong>
        </div>
        <TopicProperty
            v-for="topicProperty in topic.ownProperties"
            v-bind:key="topicProperty.id"
            v-bind:topicProperty="topicProperty"
        ></TopicProperty>
        <div v-for="subProcess in topic.subProcesses">
            <div class="topic-sub-section">
                <strong>{{ subProcess.label }}</strong>
            </div>
            <TopicProperty
                v-for="topicProperty in subProcess.ownProperties"
                v-bind:key="topicProperty.id"
                v-bind:topicProperty="topicProperty"
            ></TopicProperty>
        </div>
        <div v-if="documentTopic.citations.length">
            <div class="topic-sub-section">
                <strong>Citations</strong>
            </div>
        </div>
        <Citation
            v-for="citation in documentTopic.citations"
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
            documentTopic: state => state.document.topicMap[state.topic.id],
            topic: state => state.topic
        })
    }
};
</script>

<style>
div.topic-sub-section {
    margin-bottom: 16px;
    background-color: #337ab7;
    color: white;
    padding: 4px 2px 4px 5px;
    margin-bottom: 5px
}
</style>
