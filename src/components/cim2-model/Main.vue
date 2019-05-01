<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <DocumentSelector style="margin-bottom: 8px;"/>
                <TopicSelector/>
            </b-col>
            <b-col cols="9">
                <TitleBar/>
                <Topic/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import DocumentSelector from "@/components/cim2-model/DocumentSelector.vue";
import TitleBar from "@/components/cim2-model/TitleBar.vue";
import Topic from "@/components/cim2-model/Topic.vue";
import TopicSelector from "@/components/cim2-model/TopicSelector.vue";

export default {
    name: "Main",
    components: {
        DocumentSelector,
        TitleBar,
        Topic,
        TopicSelector,
    }
};
</script>
