<template>
    <b-modal
        centered
        size="lg"
        v-model="isVisible">
        <div slot="modal-footer" />
        <div slot="modal-header">
            <strong>ES-DOC Explorer </strong><small>v{{version}}</small> - {{ details.title }}
        </div>
        <b-container fluid>
            <b-row class="mb-1 text-center">
                <b-col>
                    <strong>{{ details.message }}</strong>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

// Get pointer to namespaced state store module.
const { mapState } = createNamespacedHelpers('core');

export default {
    name: "TheLoadingModal",
    computed: {
        ...mapState(['version']),
        ...mapState({
            details: state => state.userMessage.details,
            isVisible: state => state.userMessage.display
        })
    }
};
</script>
