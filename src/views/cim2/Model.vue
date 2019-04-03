<template>
  <div>
    <Header />
    <Main />
  </div>
</template>

<script>
import Header from "@/components/core/Header.vue";
import Main from "@/components/cim2-model/Main.vue";

export default {
    name: "Cim2Model",

    _metaInfo: {
        title: 'ES-DOC - Model',
    },

    components: {
        Header,
        Main
    }
};
</script>
