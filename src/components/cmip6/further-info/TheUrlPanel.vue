<template>
    <div class="alert alert-info">
        <strong>Further Info URL: https://furtherinfo.es-doc.org/{{ targetURL }}</strong>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "TheDatasetDocumentation",
    computed: {
        ...mapState('cmip6/furtherInfo', ['targetURL', 'urls']),
    }
};
</script>
