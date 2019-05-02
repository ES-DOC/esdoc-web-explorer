<template>
    <div>
        <div class="sub-section">
            <strong>{{ caption }}</strong>
        </div>
        <TopicProperty
            v-for="specialisation in specialisations"
            :key="specialisation.id"
            v-bind:specialisation="specialisation"
            v-bind:values="propertyMap[specialisation.id] ? propertyMap[specialisation.id].values : []"
        ></TopicProperty>
    </div>
</template>

<script>
import TopicProperty from "@/components/cim2/model/TopicProperty";

export default {
    name: "TopicPropertyList",
    components: {
        TopicProperty
    },
    props: {
        caption: {
            type: String,
            required: true
        },
        propertyMap: {
            type: Object,
            required: true
        },
        specialisations: {
            type: Array,
            required: true
        },
    }
};
</script>
