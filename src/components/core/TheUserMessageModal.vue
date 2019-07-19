<template>
    <b-modal ref="core-user-message-modal"
             size="lg"
             v-model="isVisible"
             modal-class="core-user-message-modal">

        <div slot="modal-title">
            <strong>ES-DOC Explorer </strong><small>v{{version}}</small>{{ details.title ? ` - ${details.title}` : '' }}
        </div>

        <div slot="default" class="text-center">
            <b-alert show style="margin-bottom: 0px;">
                <strong>{{ details.message }}</strong>
            </b-alert>
        </div>

        <div slot="modal-footer">
            <b-button variant="info" @click="hideModal()">
              OK
            </b-button>
        </div>

    </b-modal>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

// Get pointer to namespaced state store module.
const { mapState } = createNamespacedHelpers('core');

// Modal DOM reference.
const MODAL_REF = 'core-user-message-modal';

export default {
    name: "TheLoadingModal",
    computed: {
        ...mapState(['version']),
        ...mapState({
            details: ({ userMessage }) => userMessage.details,
            isVisible: ({ userMessage }) => userMessage.isVisible
        })
    },
    methods: {
        hideModal() {
            this.$refs[MODAL_REF].hide();
        }
    }
};
</script>

<style>
.core-user-message-modal {
    margin-top: 150px;
}
</style>
