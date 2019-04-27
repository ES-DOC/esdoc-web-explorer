<template>
    <div style="position:relative; height: 860px; overflow-y:auto;">
        <TopicPropertyList caption="Top Level"
                           v-bind:properties="topic.ownProperties" />
        <TopicPropertyList v-for="subProcess in topic.subProcesses"
                           v-bind:caption="subProcess.label"
                           v-bind:properties="subProcess.ownProperties" />
        <CitationList v-bind:citations="documentTopic.citations" />
        <ResponsiblePartyList v-bind:responsibleParties="documentTopic.responsibleParties" />
    </div>
</template>

<script>
import { mapState } from "vuex";
import CitationList from "@/components/cim2-shared/CitationList";
import ResponsiblePartyList from "@/components/cim2-shared/ResponsiblePartyList";
import TopicPropertyList from "@/components/cim2-model/TopicPropertyList";

export default {
    name: "Topic",
    components: {
        CitationList,
        ResponsiblePartyList,
        TopicPropertyList
    },
    computed: {
        ...mapState({
            documentTopic: state => state.document.topicMap[state.topic.id],
            topic: state => state.topic
        })
    }
};
</script>

<style>
div.sub-section {
    margin-bottom: 16px;
    background-color: #337ab7;
    color: white;
    padding: 4px 2px 4px 5px;
    margin-bottom: 5px
}
</style>
