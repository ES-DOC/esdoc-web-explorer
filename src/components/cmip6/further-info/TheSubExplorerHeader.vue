<template>
<div class="container-fluid">

    <b-navbar class="cmip6-furtherinfo-main-header">
        <b-navbar-brand href="https://www.wcrp-climate.org" target="_blank">
            <img src="@/assets/logo-wcrp.png" 
                 alt="Earth System Documentation"
                 style="margin-top: -9px;" />
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-text style="color: black;"><b>{{ project.label }} Further Information</b> <small> v{{ version }}</small></b-nav-text>
            <button class="esdoc-support btn btn-success" 
                    v-on:click="displaySupportEmailDialog">
                Support
            </button>
            <button class="esdoc-help btn btn-info"
                    v-on:click="openHelpPage">
                Help
            </button>            
        </b-navbar-nav>
    </b-navbar>

</div>
</template>

<script>
import { mapState } from "vuex";
import * as utils from '@/utils';

// Help page.
const URL_HELP_PAGE = "https://es-doc.org/cmip6-ensembles-further-info-url";

export default {
    name: "TheSubExplorerHeader",
    computed: {
        ...mapState('core', ['documentLabel', 'documentType', 'project', 'version']),
    },
    methods: {        
        displaySupportEmailDialog: (e) => {
            utils.openEmail(
                'cmip6-help@es-doc.org',
                'ES-DOC :: CMIP6 SUPPORT :: FURTHER-INFO',
                'Dear ES-DOC FURTHER-INFO support team,'
            );
        },

        openHelpPage: (e) => {
            utils.openURL(URL_HELP_PAGE, true);
        }
    }
};
</script>

<style>
.navbar.cmip6-furtherinfo-main-header {
    padding-left: 0px;
    padding-right: 0px;
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

button {
    width: 90px;
    margin-left: 10px;
}

</style>
