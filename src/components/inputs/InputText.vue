<script lang="ts" setup>
import {computed} from "vue";

const props = withDefaults(defineProps<{
    modelValue: string | number;
    type?: string;
    maxLenght?: number;
    width?: string | null;
    readonly?: boolean;
    textArea?: boolean;
}>(), {
    type: 'text',
    maxLenght: 9999999999,
    width: '300px',
    readonly: false,
    textArea: false
})

const emit = defineEmits(['update:model-value'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:model-value', value)
    }
})

</script>

<template>
    <input
        v-if="!props.textArea"
        v-model="value"
        :type="type"
        :readonly="props.readonly"
        :maxlength="props.maxLenght"
    />
    <textarea
        v-else
        v-model="value"
        :readonly="props.readonly"
        :maxlength="props.maxLenght"
    />
</template>

<style lang="scss" scoped>
input, textarea {
    background-color: var(--color-grey);
    border: none;
    border-radius: 5px;
    padding: .5rem 1rem;
    color: var(--color-lightgrey);
    font-size: 16px;
    outline: none;

    &:focus {
        box-shadow: 0 0 0 2px var(--color-primary);
    }
}
</style>
