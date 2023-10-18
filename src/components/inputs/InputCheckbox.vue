<script lang="ts" setup>
import {computed} from 'vue';

import Icon from '../Icon.vue';

const props = withDefaults(defineProps<{
    modelValue: boolean | undefined;
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
</script>

<template>
  <div
    class="input__group"
    :style="{width: usableWidth}"
    :class="{'input__group--error': error.length > 0}"
    @click="value = !value"
  >
    <label :for="uniqueId">
      <Icon
        v-if="props.readonly"
        name="lock"
        class="input__group-icon"
      />
      {{ $t(label) }}
    </label>
    <div
      class="input__group-checkbox"
    >
      <input
        :id="uniqueId"
        v-model.trim.lazy="value"
        aria-autocomplete="none"
        type="checkbox"
        :readonly="props.readonly"
      >
      <div
        class="visible"
      >
        <Icon
          v-if="value"
          name="done"
          class="input__group-icon"
        />
      </div>
      <div class="sub-label">
        {{ $t(value ? 'global.yes' : 'global.no') }}
      </div>
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
    user-select: none;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    cursor: pointer;

    &-icon {
        font-size: 16px;
        position: relative;
        top: 2px;
    }

    &-checkbox {
        height: 34px;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
    }

    &--error {
        label {
            color: var(--color-danger);
        }

        input {
            box-shadow: 0 0 0 2px var(--color-danger);
        }
    }

    input {
        background-color: var(--color-background-light);
        border: none;
        border-radius: 5px;
        padding: .5rem 1rem;
        color: var(--color-lightgrey);
        font-size: 16px;
        outline: none;
        opacity: 0;

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

    .visible {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border-radius: 5px;
        background-color: var(--color-background-light);
        cursor: pointer;

        i {
            color: var(--color-accent);
            font-weight: bold;
            position: relative;
            font-size: 1.8rem;
        }
    }

    .sub-label{
        position: absolute;
        left: calc(34px + 1rem);
    }
}
</style>
