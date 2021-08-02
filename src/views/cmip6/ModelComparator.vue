<template>

  <div>
    <TheSubExplorer v-if="isInitialised"/>
    <TheUserMessageModal/>
    <TheLoadingModal />
  </div>

</template>

<script>

import { mapState } from "vuex";
import TheLoadingModal from "@/components/core/TheLoadingModal.vue";
import TheSubExplorer from "@/components/cmip6/model-comparator/TheSubExplorer.vue";
import TheUserMessageModal from "@/components/core/TheUserMessageModal.vue";

export default {
    name: "Cmip6ModelComparator",
    _metaInfo: {
        title: 'ES-DOC Model Comparator',
    },
    components: {
        TheLoadingModal,
        TheSubExplorer,
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
