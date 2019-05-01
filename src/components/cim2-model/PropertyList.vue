<template>

    <div>
        <div class="sub-section">
            <strong>{{ caption }}</strong>
        </div>
        <Property
            v-for="specialisation in specialisations"
            v-bind:key="specialisation.id"
            v-bind:specialisation="specialisation"
            v-bind:values="propertyMap[specialisation.id] ? propertyMap[specialisation.id].values : []"
        ></Property>
    </div>

</template>

<script>

import Property from "@/components/cim2-model/Property";

export default {
    name: "PropertyList",
    components: {
        Property
    },
    props: ['caption', 'propertyMap', 'specialisations']
};

</script>
