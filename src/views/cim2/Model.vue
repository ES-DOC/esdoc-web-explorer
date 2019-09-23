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
import TheSubExplorer from "@/components/cim2/model/TheSubExplorer.vue";
import TheSubExplorerHeader from "@/components/cim2/model/TheSubExplorerHeader.vue";
import TheUserMessageModal from "@/components/core/TheUserMessageModal.vue";

export default {
    name: "Cim2Model",
    _metaInfo: {
        title: 'ES-DOC Model',
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
