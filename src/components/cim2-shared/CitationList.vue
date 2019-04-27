<template>

    <div v-if="citations && citations.length">
        <div class="sub-section">
            <strong>{{ caption || "Citations" }}</strong>
        </div>
        <Citation v-for="citation in citations"
                  v-bind:citation="citation" />
    </div>

</template>

<script>

import Citation from "@/components/cim2-shared/Citation";

export default {
    name: "CitationList",
    components: {
        Citation
    },
    props: ['caption', 'citations']
};

</script>
