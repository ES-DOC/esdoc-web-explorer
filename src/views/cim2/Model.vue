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
    },

    async created() {
        let project, documentType, institute, documentName;

        const paths = window.location.pathname.split('/').slice(1);
        if (paths.length === 1) {
            [ project ] = paths;
        } else if (paths.length === 2) {
            [ project, documentType ] = paths;
        } else if (paths.length === 3) {
            [ project, documentType, institute ] = paths;
        } else {
            [ project, documentType, institute, documentName ] = paths;
        }

        project = project || 'cmip6';
        documentType = documentType || 'models';

        await this.$store.dispatch('setSummaries', {
            documentName,
            documentType,
            institute,
            project,
        });
    }
};
</script>
