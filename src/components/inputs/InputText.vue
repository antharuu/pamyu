<script lang="ts" setup>
import {computed} from 'vue';

import Icon from '../Icon.vue';

const props = withDefaults(defineProps<{
    modelValue: string | number | undefined;
    label?: string | undefined;
    type?: string;
    maxLenght?: number;
    width?: string | null;
    readonly?: boolean;
    textArea?: boolean;
    error?: string;
    message?: string;
    noTrim?: boolean;
}>(), {
    label: undefined,
    type: 'text',
    maxLenght: 9999999999,
    width: '100%',
    readonly: false,
    textArea: false,
    error: '',
    message: '',
    noTrim: false
});

const emit = defineEmits(['update:model-value']);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        const trimmedValue = props.noTrim ? value : (value ?? '').toString().trim();
        emit('update:model-value', trimmedValue);
    }
});

const uniqueId = `input-${Math.random().toString(36).substring(2, 11)}`;
const usableWidth = props.width ? props.width : '100%';
</script>

<template>
  <div
    :class="{'input__group--error': error.length > 0}"
    :style="{width: usableWidth}"
    class="input__group"
  >
    <label
      v-if="label"
      :for="uniqueId"
    >
      <Icon
        v-if="props.readonly"
        class="input__group-icon"
        name="lock"
      />
      {{ $t(label) }}
    </label>
    <input
      v-if="!props.textArea"
      :id="uniqueId"
      v-model.lazy="value"
      :maxlength="props.maxLenght"
      :readonly="props.readonly"
      :type="type"
      aria-autocomplete="none"
    >
    <textarea
      v-else
      :id="uniqueId"
      v-model.lazy="value"
      :maxlength="props.maxLenght"
      :readonly="props.readonly"
    />
    <span
      v-if="message.length > 0 || error.length > 0"
      class="input__group-message"
    >
      <span
        v-if="error.length > 0"
        class="input__group-message-error"
      >
        {{ $t(error) }}
        <br>
      </span>
      <span
        v-if="message.length > 0"
        class="input__group-message-message"
      >
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
            color: var(--color-danger);
        }

        input, textarea {
            box-shadow: 0 0 0 2px var(--color-danger);
        }
    }

    input, textarea {
        background-color: var(--color-background-light);
        border: none;
        border-radius: 5px;
        padding: .5rem 1rem;
        color: var(--color-text);
        font-size: 16px;
        outline: none;

        &:focus {
            box-shadow: 0 0 0 2px var(--color-accent);

            &:read-only {
                box-shadow: none;
            }
        }

        &:disabled, &:read-only {
            color: var(--color-text-dark);
            opacity: .75;
        }
    }

    textarea {
        resize: vertical;
        min-height: 113px;
        max-height: 600px;
    }

    &-message {
        font-size: 12px;
        color: var(--color-text-dark);
        display: flex;
        flex-direction: column;
        gap: .5rem;

        &-error {
            color: var(--color-danger);
        }
    }
}
</style>
