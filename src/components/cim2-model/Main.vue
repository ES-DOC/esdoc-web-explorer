<template>
    <b-container fluid>
        <b-row>
            <b-col style="padding-right: 0; position:relative; height: 870px; overflow-y:auto;" >
                <SourceList/>
            </b-col>
            <b-col style="padding-right: 0; position:relative; height: 870px; overflow-y:auto;" >
                <TopicTree/>
            </b-col>
            <b-col cols="7" style="position:relative; height: 870px; overflow-y:auto;" >
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
