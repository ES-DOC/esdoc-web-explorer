<template>
    <b-container fluid>
        <b-row>
            <b-col cols="">
                <SourceList/>
            </b-col>
            <b-col cols="">
                <TopicTree/>
            </b-col>
            <b-col cols="7">
                <TitleBar />
                <DocumentContent />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapState } from 'vuex';
import DocumentContent from "./DocumentContent.vue";
import SourceList from "./SourceList.vue";
import TitleBar from "./TitleBar.vue";
import TopicTree from "./TopicTree.vue";

export default {
    name: "Main",
    components: {
        SourceList,
        TopicTree,
        DocumentContent,
        TitleBar,
    }
};
</script>
