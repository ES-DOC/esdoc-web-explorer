<template>
    <b-navbar class="main-header">
        <b-navbar-brand href="https://www.wcrp-climate.org">
            <img src="@/assets/logo-wcrp-small.png" alt="Earth System Documentation" style="margin-top: -9px;" />
        </b-navbar-brand>
        <b-navbar-brand href="https://es-doc.org">
            <img src="@/assets/logo-2-icon.png" alt="Earth System Documentation" style="margin-top: -4px;"/>
            &nbsp;
            <b>ES-DOC</b> Explorer <span class="app-version">v{{ version }}</span>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-text style="color: black;">{{ project.label }} {{ documentType }}: <b>{{ documentLabel }}</b></b-nav-text>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

// Get pointer to namespaced state store module.
const { mapState } = createNamespacedHelpers('core');

export default {
    name: "TheMainHeader",
    computed: {
        ...mapState(['documentLabel', 'documentType', 'project', 'version']),
    }
};
</script>

<style>
.navbar.main-header {
    margin-bottom: 10px;
    color: #fff;
}

.app-version {
    font-size: 12px;
}

header.main {
    margin-top: 10px;
}

.esdoc-logo:hover {
    cursor:pointer;
}

header.main h1 small b {
    color: black;
}

header.main h1 {
    margin-top: 0px;
}
</style>
