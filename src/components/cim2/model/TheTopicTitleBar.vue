<template>
    <div class="sub-section">
        <strong>{{ documentLabel }} :: {{ topicHierachy }}</strong>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "TheTopicTitleBar",
    computed: {
        ...mapState({
            documentLabel: state => state.document.label,
            topicHierachy: state => {
                const { hierarchy } = state.document.topicInfo.topic;
                return hierarchy.map(i => i.label).join(' > ');
            }
        })
    }
};

</script>

<style>
#documentTitleBar {
    margin-bottom: 16px;
}
</style>
