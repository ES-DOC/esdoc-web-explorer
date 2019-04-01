<template>
    <b-table borderless responsive small fixed
        class="esdoc-table-caption"
        id="documentTitleBar"
        :items="[]"
        :fields="fields" />
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "DocumentTitleBar",
    computed: {
        ...mapState({
            fields: (state) => {
                const summary = state.summary.current;
                const institute = summary ? summary.institute : null;
                const canonicalName = summary ? summary.canonicalName : null;
                const topic = state.specialization.topic;
                return [
                    {
                        key: `${institute} > ${canonicalName} :: ${topic.id.split('.').slice(1).join(' > ')}`
                    }
                ];
            }
        })
    }
};

</script>

<style>
#documentTitleBar {
    margin-bottom: 16px;
}
</style>
