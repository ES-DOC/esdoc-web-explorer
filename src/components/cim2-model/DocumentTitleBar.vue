<template>

    <b-table borderless responsive small fixed
        id="documentTitleBar"
        head-variant="light"
        :items="[]"
        :fields="fields" />

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: "DocumentTitleBar",
    computed: {
        ...mapState({
            fields: (state) => {
                const topic = state.specialization.topic;
                const institute = state.documents.current ? state.documents.current.institute : null;
                const canonicalName = state.documents.current ? state.documents.current.canonicalName : null;
                return [
                    {
                        key: `${institute} / ${canonicalName} / ${topic.id.split('.').slice(1).join(' / ')}`
                    }
                ];
            }
        })
    }
};

</script>

<style>

#documentTitleBar {
    margin-bottom: 10px;
}

</style>
