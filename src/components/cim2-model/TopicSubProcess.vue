<template>
    <div>
        <TopicProperty
            v-for="topicProperty in subProcess.ownProperties"
            v-bind:key="topicProperty.id"
            v-bind:topicProperty="topicProperty"
        ></TopicProperty>
    </div>
</template>

<script>
import TopicProperty from './TopicProperty';

export default {
    name: "TopicSubProcess",

    components: {
        TopicProperty,
    },

    props: ['subProcess'],
};

</script>

<style>


</style>
