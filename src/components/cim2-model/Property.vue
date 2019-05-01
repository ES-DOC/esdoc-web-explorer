<template>

    <table class="table table-bordered table-sm small esdoc-table-info">
        <thead>
            <tr>
                <th colspan="2">
                    {{ specialisation.fullLabel }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="caption">
                    <strong>Description</strong>
                </td>
                <td>
                    {{ specialisation.description }}
                </td>
            </tr>
            <tr v-for="(value, index) in valuesForRendering">
                <td v-if="index === 0"
                    class="caption"
                    :rowspan="valuesForRendering.length">
                    <strong>Value{{ valuesForRendering.length > 1 || specialisation.cardinality.endsWith('N') ? "s" : "" }}</strong>
                </td>
                <td>
                    {{ value }}
                </td>
            </tr>
        </tbody>
    </table>

</template>

<script>
// Null value when documentation is mandatory.
const AWAITING_DOCUMENTATION = '-- Awaiting modelling group input --';

// Null value when documentation is optional.
const NO_VALUES = '--';

export default {
    name: "Property",
    props: ['specialisation', 'values'],
    computed: {
        valuesForRendering: function () {
            let values = this.values;

            // If dealing with an enum then inject descriptions.
            if (values.length && this.specialisation.type === 'enum') {
                values = values.map(i => {
                    const choice = this.specialisation.enum.choices.find(c => {
                        return c.label.toLowerCase() === i.toLowerCase()
                    });
                    if (choice && choice.description) {
                        return `${i} - ${choice.description}`;
                    }
                    return i;
                })
            }

            // Replace various field values.
            values = values.map(val => {
                const v = val.toLowerCase();
                if (['f', 'false'].includes(v)) {
                    return 'FALSE';
                }
                if (['t', 'true'].includes(v)) {
                    return 'TRUE';
                }
                if (['nil:inapplicable', 'other: n/a'].includes(v)) {
                    return 'N/A';
                }
                return `${val.slice(0, 1).toUpperCase()}${val.slice(1)}`;
            })

            // Returns wither the values or null substitutes.
            if (values.length) {
                return values;
            } else if (this.specialisation.cardinality.slice(0, 1) === '1') {
                return [AWAITING_DOCUMENTATION]
            } else {
                return [NO_VALUES];
            }
        }
    }
};

</script>
