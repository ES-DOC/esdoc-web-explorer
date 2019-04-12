<template>
  <div>
    <Header />
    <Document />
  </div>
</template>

<script>
import Header from "@/components/core/Header.vue";
import Document from "@/components/cim2-model/Document.vue";

export default {
    name: "Cim2Model",

    _metaInfo: {
        title: 'ES-DOC - Model',
    },

    components: {
        Document,
        Header
    }
};
</script>
