<template>

  <div>
    <TheLoadingModal />
    <TheMainHeader />
    <TheSubExplorer />
  </div>

</template>

<script>

import TheLoadingModal from "@/components/core/TheLoadingModal.vue";
import TheMainHeader from "@/components/core/TheMainHeader.vue";
import TheSubExplorer from "@/components/cim2/model/TheSubExplorer.vue";

export default {
    name: "Cim2Model",
    _metaInfo: {
        title: 'ES-DOC - Model',
    },
    components: {
        TheLoadingModal,
        TheMainHeader,
        TheSubExplorer
    }
};

</script>
