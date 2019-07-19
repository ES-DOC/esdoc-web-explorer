<template>

  <div>
    <TheMainHeader v-if="isInitialised"/>
    <TheSubExplorer v-if="isInitialised"/>
    <TheLoadingModal />
  </div>

</template>

<script>
import { mapState } from "vuex";
import TheLoadingModal from "@/components/core/TheLoadingModal.vue";
import TheMainHeader from "@/components/core/TheMainHeader.vue";
import TheSubExplorer from "@/components/cim2/model/TheSubExplorer.vue";

export default {
    name: "Cim2Model",
    _metaInfo: {
        title: 'ES-DOC Explorer',
    },
    components: {
        TheLoadingModal,
        TheMainHeader,
        TheSubExplorer
    },
    computed: {
        ...mapState('app', ['isInitialised'])
    }
};

</script>
