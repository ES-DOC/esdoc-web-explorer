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
        ...mapState('cim2/model', {
            documentLabel: ({ document }) => document.label,
            topicHierachy: ({ document }) => {
                const { hierarchy } = document.topicInfo.topic;

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
