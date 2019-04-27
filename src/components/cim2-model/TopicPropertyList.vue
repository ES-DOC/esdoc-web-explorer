<template>

    <div>
        <div class="sub-section">
            <strong>{{ caption }}</strong>
        </div>
        <TopicProperty
            v-for="topicProperty in properties"
            v-bind:key="topicProperty.id"
            v-bind:topicProperty="topicProperty"
        ></TopicProperty>
    </div>

</template>

<script>

import TopicProperty from "@/components/cim2-model/TopicProperty";

export default {
    name: "TopicPropertyList",
    components: {
        TopicProperty
    },
    props: ['caption', 'properties']
};

</script>
