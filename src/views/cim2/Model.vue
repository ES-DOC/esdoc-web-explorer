<template>

  <div>
    <Header />
    <TheSubExplorer />
  </div>

</template>

<script>

import Header from "@/components/core/Header.vue";
import TheSubExplorer from "@/components/cim2/model/TheSubExplorer.vue";

export default {
    name: "Cim2Model",
    _metaInfo: {
        title: 'ES-DOC - Model',
    },
    components: {
        Header,
        TheSubExplorer
    }
};

</script>
