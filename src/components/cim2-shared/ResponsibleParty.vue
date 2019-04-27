<template>

    <table class="table table-bordered table-sm small esdoc-table-info">
        <thead>
            <tr>
                <th colspan="2" class="cim2-responsible-party-header">
                    {{ party.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="responsibleParty.role">
                <td class="caption">
                    <strong>Role</strong>
                </td>
                <td class="cim2-responsible-party-role">
                    {{ responsibleParty.role }}
                </td>
            </tr>
            <tr v-if="party.email">
                <td class="caption">
                    <strong>Email</strong>
                </td>
                <td class="cim2-responsible-party-email">
                    {{ party.email }}
                </td>
            </tr>
            <tr v-if="party.address">
                <td class="caption">
                    <strong>Postal Address</strong>
                </td>
                <td class="cim2-responsible-party-address">
                    {{ party.address }}
                </td>
            </tr>
        </tbody>
    </table>

</template>

<script>

export default {
    name: "ResponsibleParty",
    props: ['responsibleParty', 'party']
};

</script>

<style>

th.cim2-responsible-party-header,
td.cim2-responsible-party-role {
    text-transform: capitalize;
}

</style>
