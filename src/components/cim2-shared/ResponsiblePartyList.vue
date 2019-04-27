<template>

    <div v-if="responsibleParties && responsibleParties.length">
        <div class="sub-section">
            <strong>{{ caption || "Responsible Parties" }}</strong>
        </div>
        <div v-for="responsibleParty in responsibleParties">
            <ResponsibleParty
                v-for="party in responsibleParty.parties"
                v-bind:responsibleParty="responsibleParty"
                v-bind:party="party"
            ></ResponsibleParty>
        </div>
    </div>

</template>

<script>

import ResponsibleParty from "@/components/cim2-shared/ResponsibleParty";

export default {
    name: "ResponsiblePartyList",
    components: {
        ResponsibleParty
    },
    props: ['caption', 'responsibleParties']
};

</script>
