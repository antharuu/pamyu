<script setup lang="ts">
withDefaults(defineProps<{
    block?: boolean;
    type?: 'default' | 'delete';
    disabled?: boolean;
    outlined?: boolean;
}>(), {
    block: false,
    type: 'default',
    disabled: false,
    outlined: false,
});
</script>

<template>
  <button
    class="action-button"
    :class="{
      'action-button--block': block,
      'action-button--delete': type === 'delete',
      'action-button--outlined': outlined,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.action-button {
    padding: .5rem 1.25rem;
    border-radius: 4px;
    border: none;
    background-color: var(--color-accent);
    color: var(--color-text);
    cursor: pointer;
    transition: background-color .2s ease-in-out;
    font-weight: bold;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .25rem;

    &--block {
        display: inline-block;
        width: 100%;
    }

    &:disabled {
        background-color: var(--color-background-light);
    }

    &:not(:disabled) {
        &:hover {
            background-color: var(--color-accent-dark);
        }
    }

    &--delete {
        background-color: var(--color-danger);

        &:not(:disabled) {
            &:hover {
                background-color: var(--color-danger-dark);
            }
        }
    }

    &--outlined {
        background-color: transparent;
        border: 2px solid var(--color-accent);
        color: var(--color-accent);

        &:not(:disabled) {
            &:hover {
                background-color: var(--color-accent);
                color: var(--color-text);
            }
        }

        &--delete {
            background-color: transparent;
            border: 2px solid var(--color-danger);
            color: var(--color-danger);

            &:not(:disabled) {
                &:hover {
                    background-color: var(--color-danger);
                    color: var(--color-text);
                }
            }
        }
    }
}
</style>