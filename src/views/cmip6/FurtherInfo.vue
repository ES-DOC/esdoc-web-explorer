<template>

  <div>
    <TheSubExplorerHeader v-if="isInitialised"/>
    <TheSubExplorer v-if="isInitialised"/>
    <TheUserMessageModal/>
    <TheLoadingModal />
  </div>

</template>

<script>
import { mapState } from "vuex";
import TheLoadingModal from "@/components/core/TheLoadingModal.vue";
import TheSubExplorer from "@/components/cmip6/further-info/TheSubExplorer.vue";
import TheSubExplorerHeader from "@/components/cmip6/further-info/TheSubExplorerHeader.vue";
import TheUserMessageModal from "@/components/core/TheUserMessageModal.vue";

export default {
    name: "Cmip6FurtherInfo",
    _metaInfo: {
        title: 'ES-DOC Further Info',
    },
    components: {
        TheLoadingModal,
        TheSubExplorer,
        TheSubExplorerHeader,
        TheUserMessageModal
    },
    computed: {
        ...mapState('core', ['isInitialised'])
    }
};

</script>

<style>

body {
    width: 980px;
    margin: auto;
}

</style>
