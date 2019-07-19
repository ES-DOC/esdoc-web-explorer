<template>
    <div style="position:relative; height: 860px; overflow-y:auto;">
        <TopicPropertyList
            caption="Top Level Properties"
            v-bind:propertyMap="propertyMap"
            v-bind:specialisations="topic.ownProperties" />
        <TopicPropertyList
            v-for="subProcess in topic.subProcesses"
            :key="subProcess.id"
            v-bind:caption="subProcess.label"
            v-bind:propertyMap="propertyMap"
            v-bind:specialisations="subProcess.ownProperties" />
        <CitationList
            v-bind:citations="citations" />
        <ResponsiblePartyList
            v-bind:responsibleParties="responsibleParties" />
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import CitationList from "@/components/cim2/shared/CitationList";
import ResponsiblePartyList from "@/components/cim2/shared/ResponsiblePartyList";
import TopicPropertyList from "@/components/cim2/model/TopicPropertyList";

// Get pointer to namespaced state store module.
const { mapState } = createNamespacedHelpers('cim2/model');

export default {
    name: "TheTopicDetail",
    components: {
        CitationList,
        ResponsiblePartyList,
        TopicPropertyList
    },
    computed: {
        ...mapState({
            citations: ({ document }) => document.topicInfo.content ? document.topicInfo.content.citations : [],
            propertyMap: ({ document }) => document.content.topicPropertyMap,
            responsibleParties: ({ document }) => document.topicInfo.content ? document.topicInfo.content.responsibleParties : [],
            topic: ({ document }) => document.topicInfo.topic
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
