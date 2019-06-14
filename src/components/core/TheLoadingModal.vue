<template>
    <b-modal
        centered
        size="lg"
        v-model="isVisible">
        <div slot="modal-footer" />
        <div slot="modal-header">
            <strong>ES-DOC Explorer </strong><small>v{{app.version}}</small>
        </div>
        <b-container fluid>
            <b-row class="mb-1 text-center">
                <b-col>
                    <b-progress height="60px" variant="info" striped>
                        <b-progress-bar :value="100" style="font-size: 1.6em;">
                            <strong>Loading documentation ... please wait</strong>
                        </b-progress-bar>
                    </b-progress>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "TheLoadingModal",
    computed: {
        ...mapState(['app']),
        ...mapState({
            isVisible: state => !state.isInitialised || state.isLoading
        })
    }
};
</script>
