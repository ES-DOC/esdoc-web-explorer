<template>
    <div id="cim2-model-source-list">
        <b-container>
            <b-row class="sub-section">
                <span style="width: 30%; font-weight: bold; margin-top: 6px;">Institute</span>
                <b-select id="source-selector2"
                          style="width: 70%;"
                          v-model="institution"
                          :options="optionsForInstitution">
                </b-select>
            </b-row>
            <b-row class="sub-section">
                <span style="width: 30%; font-weight: bold; margin-top: 6px;">Model</span>
                <b-select id="source-selector2"
                          style="width: 70%;"
                          v-model="source"
                          :options="optionsForSource">
                </b-select>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "DocumentSelector",
    computed: {
        ...mapState({
            optionsForInstitution: ({ institutions }) => institutions.map(i => {
                return {
                    value: i,
                    text: i.label
                }
            }),
            optionsForSource: ({ sources }) => sources.map(i => {
                return {
                    value: i,
                    text: i.label
                }
            })
        }),
        institution: {
            get: function() {
                return this.$store.state.institution;
            },
            set: function(val) {
                this.setInstitution(val);
            },
        },
        source: {
            get: function() {
                return this.$store.state.source;
            },
            set: function(val) {
                this.setSource(val);
            },
        }
    },
    methods: {
        ...mapActions([
            'setInstitution',
            'setSource',
        ])
    }
};

</script>
