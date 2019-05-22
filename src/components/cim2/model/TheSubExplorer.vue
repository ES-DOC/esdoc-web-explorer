<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <TheDocumentSelector/>
                <TheTopicSelector/>
            </b-col>
            <b-col cols="9">
                <TheTopicTitleBar/>
                <TheTopicDetail/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import TheDocumentSelector from "@/components/cim2/model/TheDocumentSelector.vue";
import TheTopicDetail from "@/components/cim2/model/TheTopicDetail.vue";
import TheTopicSelector from "@/components/cim2/model/TheTopicSelector.vue";
import TheTopicTitleBar from "@/components/cim2/model/TheTopicTitleBar.vue";

export default {
    name: "TheSubExplorer",
    components: {
        TheDocumentSelector,
        TheTopicSelector,
        TheTopicDetail,
        TheTopicTitleBar,
    }
};
</script>
