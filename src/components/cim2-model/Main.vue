<template>
    <b-container fluid>
        <b-row>
            <b-col >
                <ModelList style="margin-bottom: 8px;"/>
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
import ModelList from "@/components/cim2-model/ModelList.vue";
import TitleBar from "@/components/cim2-model/TitleBar.vue";
import Topic from "@/components/cim2-model/Topic.vue";
import TopicTree from "@/components/cim2-model/TopicTree.vue";

export default {
    name: "Main",
    components: {
        ModelList,
        Topic,
        TopicTree,
        TitleBar,
    }
};
</script>
