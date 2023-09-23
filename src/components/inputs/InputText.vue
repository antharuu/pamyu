<script lang="ts" setup>
import {computed} from "vue";
import Icon from "../Icon.vue";

const props = withDefaults(defineProps<{
    modelValue: string | number | undefined;
    label: string;
    type?: string;
    maxLenght?: number;
    width?: string | null;
    readonly?: boolean;
    textArea?: boolean;
    error?: string;
    message?: string;
}>(), {
    type: 'text',
    maxLenght: 9999999999,
    width: '100%',
    readonly: false,
    textArea: false,
    error: '',
    message: '',
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

const uniqueId = `input-${Math.random().toString(36).substr(2, 9)}`
const usableWidth = props.width ? props.width : '100%'
</script>

<template>
    <div class="input__group" :style="{width: usableWidth}" :class="{'input__group--error': error.length > 0}">
        <label :for="uniqueId">
            <Icon name="lock" v-if="props.readonly" class="input__group-icon" />
            {{ $t(label) }}
        </label>
        <input
            aria-autocomplete="none"
            v-if="!props.textArea"
            v-model.trim.lazy="value"
            :type="type"
            :readonly="props.readonly"
            :maxlength="props.maxLenght"
            :id="uniqueId"
        />
        <textarea
            v-else
            v-model.trim.lazy="value"
            :readonly="props.readonly"
            :maxlength="props.maxLenght"
            :id="uniqueId"
        />
        <span class="input__group-message" v-if="message.length > 0 || error.length > 0">
            <span class="input__group-message-error" v-if="error.length > 0">
                {{ $t(error) }}
                <br>
            </span>
            <span class="input__group-message-message" v-if="message.length > 0">
                {{ $t(message) }}
            </span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
.input__group {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    &-icon {
        font-size: 16px;
        position: relative;
        top: 2px;
    }

    &--error {
        label {
            color: var(--color-error);
        }

        input, textarea {
            box-shadow: 0 0 0 2px var(--color-error);
        }
    }

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

            &:read-only {
                box-shadow: none;
            }
        }
    }

    &-message {
        font-size: 12px;
        color: var(--color-lightgrey);
        display: flex;
        flex-direction: column;
        gap: .5rem;

        &-error {
            color: var(--color-error);
        }
    }
}
</style>
