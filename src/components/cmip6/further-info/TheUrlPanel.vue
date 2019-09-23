<template>
    <div class="alert alert-info">
        <strong>Further Info URL: https://furtherinfo.es-doc.org/</strong>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

// Get pointer to namespaced state store module.
const { mapActions, mapState } = createNamespacedHelpers('cmip6/furtherInfo');

export default {
    name: "TheDatasetDocumentation",
    computed: {
        ...mapState(['urls']),
    }
};
</script>
