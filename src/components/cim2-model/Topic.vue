<template>
    <div style="position:relative; height: 860px; overflow-y:auto;">
        <PropertyList caption="Top Level"
                      v-bind:properties="properties"
                      v-bind:specialisations="topic.ownProperties" />

        <PropertyList v-for="subProcess in topic.subProcesses"
                      v-bind:caption="subProcess.label"
                      v-bind:properties="properties"
                      v-bind:specialisations="subProcess.ownProperties" />

        <CitationList v-bind:citations="citations" />

        <ResponsiblePartyList v-bind:responsibleParties="responsibleParties" />
    </div>
</template>

<script>
import { mapState } from "vuex";
import CitationList from "@/components/cim2-shared/CitationList";
import ResponsiblePartyList from "@/components/cim2-shared/ResponsiblePartyList";
import PropertyList from "@/components/cim2-model/PropertyList";

export default {
    name: "Topic",
    components: {
        CitationList,
        PropertyList,
        ResponsiblePartyList,
    },
    computed: {
        ...mapState({
            citations: state => state.document.topicInfo.content.citations,
            properties: state => state.document.content.topicPropertyMap,
            responsibleParties: state => state.document.topicInfo.content.responsibleParties,
            topic: state => state.document.topicInfo.topic
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
