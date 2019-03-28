<template>
    <b-container fluid>
        <b-row>
            <b-col style="position:relative; height: 870px; overflow-y:auto;" >
                <SourceList/>
            </b-col>
            <b-col style="position:relative; height: 870px; overflow-y:auto;" >
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
import { mapState } from 'vuex';
import SourceList from "./SourceList.vue";
import TitleBar from "./TitleBar.vue";
import Topic from "./Topic.vue";
import TopicTree from "./TopicTree.vue";

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
