<template>

    <b-container fluid>
        <b-row>
            <b-col cols="3">
                <SourceList/>
            </b-col>
            <b-col cols="2">
                <TopicTree/>
            </b-col>
            <b-col>
                <DocumentTitleBar />
                <DocumentContent />
            </b-col>
        </b-row>
    </b-container>

</template>

<script>

import { mapState } from 'vuex';
import SourceList from "./SourceList.vue";
import TopicTree from "./TopicTree.vue";
import DocumentContent from "./DocumentContent.vue";
import DocumentTitleBar from "./DocumentTitleBar.vue";

export default {
    name: "Main",
    components: {
        SourceList,
        TopicTree,
        DocumentContent,
        DocumentTitleBar,
    }
};

</script>
