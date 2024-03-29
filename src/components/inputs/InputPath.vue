<script lang="ts" setup>
import {open} from '@tauri-apps/api/dialog';
import {computed} from 'vue';

import Icon from '../Icon.vue';

const props = withDefaults(defineProps<{
    modelValue: string | number | undefined;
    label: string;
    width?: string | null;
    readonly?: boolean;
    error?: string;
    message?: string;
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

const uniqueId = `input-${Math.random().toString(36).substring(2, 11)}`;
const usableWidth = props.width ? props.width : '100%';

async function importFolder(): Promise<void> {
    const selected = await open({
        multiple: false,
        directory: true,
    });

    if (typeof selected !== 'string') return;

    emit('update:model-value', selected);
}
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
    <div class="input__group-folder">
      <input
        :id="uniqueId"
        v-model.trim.lazy="value"
        aria-autocomplete="none"
        type="text"
        :readonly="props.readonly"
      >

      <button @click="importFolder">
        {{ $t('global.browse') }}
      </button>
    </div>
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

    &-folder {
        display: flex;
        gap: .5rem;
        width: 100%;
    }

    input {
        background-color: var(--color-background-light);
        border: none;
        border-radius: 5px;
        padding: .5rem 1rem;
        color: var(--color-lightgrey);
        font-size: 16px;
        outline: none;
        width: 100%;

        &:focus {
            box-shadow: 0 0 0 2px var(--color-accent);

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
            color: var(--color-danger);
        }
    }

    button {
        background-color: var(--color-background-light);
        border: none;
        border-radius: 5px;
        padding: .5rem 1rem;
        color: var(--color-lightgrey);
        font-size: 16px;
        outline: none;

        &:focus {
            box-shadow: 0 0 0 2px var(--color-accent);

            &:read-only {
                box-shadow: none;
            }
        }
    }
}
</style>
