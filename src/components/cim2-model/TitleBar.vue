<template>
    <div class="sub-section">
        <strong>{{ institute }} > {{ model }} :: {{ topicHierachy }}</strong>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "TitleBar",
    computed: {
        ...mapState({
            model: state => state.document.label,
            institute: state => state.document.institutionID.label,
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
