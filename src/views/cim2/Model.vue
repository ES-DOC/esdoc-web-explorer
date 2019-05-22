<template>

  <div>
    <TheMainHeader />
    <TheSubExplorer />
  </div>

</template>

<script>

import TheMainHeader from "@/components/core/TheMainHeader.vue";
import TheSubExplorer from "@/components/cim2/model/TheSubExplorer.vue";

export default {
    name: "Cim2Model",
    _metaInfo: {
        title: 'ES-DOC - Model',
    },
    components: {
        TheMainHeader,
        TheSubExplorer
    }
};

</script>
