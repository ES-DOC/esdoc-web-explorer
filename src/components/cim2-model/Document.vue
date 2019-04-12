<template>
    <b-container fluid>
        <b-row>
            <b-col >
                <DocumentList style="margin-bottom: 8px;"/>
                <TopicList/>
            </b-col>
            <b-col cols="9" >
                <TitleBar />
                <Topic />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import DocumentList from "@/components/cim2-model/DocumentList.vue";
import TitleBar from "@/components/cim2-model/TitleBar.vue";
import Topic from "@/components/cim2-model/Topic.vue";
import TopicList from "@/components/cim2-model/TopicList.vue";

export default {
    name: "Main",
    components: {
        DocumentList,
        Topic,
        TopicList,
        TitleBar,
    }
};
</script>
