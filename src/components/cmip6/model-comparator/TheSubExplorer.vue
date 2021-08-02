<template>
    <b-container fluid>
        <b-row>
            <b-col cols="12">
                <TheTopicSelector/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import TheSpecialisationSelector from "@/components/cmip6/model-comparator/TheSpecialisationSelector.vue";
import TheTopicSelector from "@/components/cmip6/model-comparator/TheTopicSelector.vue";

export default {
    name: "TheSubExplorer",
    components: {
        TheSpecialisationSelector,
        TheTopicSelector,
    }
};
</script>
