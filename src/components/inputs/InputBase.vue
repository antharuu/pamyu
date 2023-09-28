<script lang="ts" setup>
import Icon from '../Icon.vue';

const props = withDefaults(defineProps<{
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
    <slot />
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
        resize: none;
        min-height: 113px;
        max-height: 113px;
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
