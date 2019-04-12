<template>
    <b-navbar class="main-header">
        <b-navbar-brand href="https://www.wcrp-climate.org">
            <img src="@/assets/logo-wcrp-small.png" alt="Earth System Documentation" style="margin-top: -9px;" />
        </b-navbar-brand>
        <b-navbar-brand href="https://es-doc.org">
            <img src="@/assets/logo-2-icon.png" alt="Earth System Documentation" style="margin-top: -4px;"/>
            &nbsp;
            <b>ES-DOC</b> Explorer <span class="app-version">v0.1.0</span>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-text style="color: black;">{{ project }} Model: <b>{{ institute }} > {{ canonicalName }}</b></b-nav-text>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "core-header",
    computed: mapState({
        canonicalName: state => state.summary ? state.summary.canonicalName : null,
        institute: state => state.summary ? state.summary.institute : null,
        project: state => state.project.label
    })
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
