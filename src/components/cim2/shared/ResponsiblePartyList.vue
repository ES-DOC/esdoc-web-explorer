<template>
    <div v-if="responsibleParties && responsibleParties.length">
        <div class="sub-section">
            <strong>{{ caption || "Responsible Parties" }}</strong>
        </div>
        <div v-for="responsibleParty in responsibleParties"
             :key="responsibleParty.name">
            <ResponsiblePartyDetail
                v-for="party in responsibleParty.parties"
                :key="party.name"
                v-bind:responsibleParty="responsibleParty"
                v-bind:party="party" />
        </div>
    </div>
</template>

<script>
import ResponsiblePartyDetail from "@/components/cim2/shared/ResponsiblePartyDetail";

export default {
    name: "ResponsiblePartyList",
    components: {
        ResponsiblePartyDetail
    },
    props: {
        caption: {
            type: String,
            required: false
        },
        responsibleParties: {
            type: Array,
            required: true
        }
    }
};
</script>
