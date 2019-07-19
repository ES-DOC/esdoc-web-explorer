<template>
    <div class="sub-section">
        <strong>{{ documentLabel }} :: {{ topicHierachy }}</strong>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

// Get pointer to namespaced state store module.
const { mapState } = createNamespacedHelpers('cim2/model');

export default {
    name: "TheTopicTitleBar",
    computed: {
        ...mapState({
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
