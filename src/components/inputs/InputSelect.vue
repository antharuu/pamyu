<script lang="ts" setup>
import {computed} from 'vue';

import Icon from '../Icon.vue';

const props = withDefaults(defineProps<{
    modelValue: string | number | undefined;
    label: string;
    width?: string | null;
    readonly?: boolean;
    error?: string;
    message?: string;
    options: {value: string, label: string}[];
}>(), {
    width: '100%',
    readonly: false,
    error: '',
    message: '',
});

const emit = defineEmits(['update:model-value']);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:model-value', value);
    }
});

const uniqueId = `input-${Math.random().toString(36).substr(2, 9)}`;
const usableWidth = props.width ? props.width : '100%';
</script>

<template>
  <div
    class="input__group"
    :style="{width: usableWidth}"
    :class="{'input__group--error': error.length > 0}"
  >
    <label :for="uniqueId">
      <Icon
        v-if="props.readonly"
        name="lock"
        class="input__group-icon"
      />
      {{ $t(label) }}
    </label>
    <select
      :id="uniqueId"
      v-model.trim.lazy="value"
      aria-autocomplete="none"
      :disabled="readonly"
    >
      <option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
      >
        {{ $t(item.label) }}
      </option>
    </select>
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
            color: var(--color-error);
        }

        select {
            box-shadow: 0 0 0 2px var(--color-error);
        }
    }

    select {
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

    textarea {
        resize: vertical;
        min-height: 100px;
        max-height: 300px;
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
