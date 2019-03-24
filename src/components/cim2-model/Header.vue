<template>

    <b-container fluid>
        <b-row>
            <b-col>
                <h2>
                    {{ project }} Model: {{ institute }} :: {{ model }}
                </h2>
            </b-col>
        </b-row>
    </b-container>

</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "core-header",
    computed: mapState({
        project: state => state.project.current.label,
        route: state => state.route,
        institute: state => state.route.path.split('/')[3].toUpperCase(),
        model: state => state.route.path.split('/')[4].toUpperCase(),
    })
};
</script>
