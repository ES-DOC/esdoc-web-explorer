<template>
  <div>
    <Header />
    <Main />
  </div>
</template>

<script>
// @ is an alias to /src

import Header from "@/components/core/Header.vue";
import Main from "@/components/cim2-model/Main.vue";

export default {
  name: "model",
  _metaInfo: {
      title: 'ES-DOC - Model',
  },
  components: {
      Header,
      Main
  }
};
</script>
