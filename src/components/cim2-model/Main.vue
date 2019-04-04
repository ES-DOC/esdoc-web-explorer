<template>
    <b-container fluid>
        <b-row>
            <b-col >
                <SourceList style="margin-bottom: 8px;"/>
                <TopicTree/>
            </b-col>
            <b-col cols="9" >
                <TitleBar />
                <Topic />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import SourceList from "@/components/cim2-model/SourceList.vue";
import TitleBar from "@/components/cim2-model/TitleBar.vue";
import Topic from "@/components/cim2-model/Topic.vue";
import TopicTree from "@/components/cim2-model/TopicTree.vue";

export default {
    name: "Main",
    components: {
        SourceList,
        Topic,
        TopicTree,
        TitleBar,
    }
};
</script>
