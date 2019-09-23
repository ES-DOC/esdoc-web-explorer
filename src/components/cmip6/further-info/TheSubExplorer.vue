<template>
    <b-container fluid>
        <b-row>
            <b-col cols="12">
                <TheUrlPanel/>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <TheEsdocDocumentation/>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <TheDatasetDocumentation/>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <TheOtherDocumentation/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import TheDatasetDocumentation from "@/components/cmip6/further-info/TheDatasetDocumentation.vue";
import TheEsdocDocumentation from "@/components/cmip6/further-info/TheEsdocDocumentation.vue";
import TheOtherDocumentation from "@/components/cmip6/further-info/TheOtherDocumentation.vue";
import TheUrlPanel from "@/components/cmip6/further-info/TheUrlPanel.vue";

export default {
    name: "TheSubExplorer",
    components: {
        TheDatasetDocumentation,
        TheEsdocDocumentation,
        TheOtherDocumentation,
        TheUrlPanel
    }
};
</script>
