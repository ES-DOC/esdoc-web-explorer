<template>
    <div v-if="citations && citations.length">
        <div class="sub-section">
            <strong>{{ caption || "Citations" }}</strong>
        </div>
        <CitationDetail
            v-for="citation in citations"
            :key="citation.title"
            v-bind:citation="citation" />
    </div>
</template>

<script>
import CitationDetail from "@/components/cim2/shared/CitationDetail";

export default {
    name: "CitationList",
    components: {
        CitationDetail
    },
    props: {
        caption: {
            type: String,
            required: false
        },
        citations: {
            type: Array,
            required: true
        }
    }
};
</script>
