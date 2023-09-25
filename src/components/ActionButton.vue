<script setup lang="ts">
withDefaults(defineProps<{
    block?: boolean;
    type?: 'default' | 'delete';
}>(), {
    block: false,
    type: 'default',
});
</script>

<template>
  <button
    class="action-button"
    :class="{
      'action-button--block': block,
      'action-button--delete': type === 'delete',
    }"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.action-button {
    padding: .5rem 1.25rem;
    border-radius: 4px;
    border: none;
    background-color: var(--color-primary);
    color: var(--color-light);
    cursor: pointer;
    transition: background-color .2s ease-in-out;
    font-weight: bold;
    height: 34px;

    &--block {
        display: inline-block;
        width: 100%;
    }

    &:disabled {
        background-color: var(--color-grey);
    }

    &:not(:disabled) {
        &:hover {
            background-color: var(--color-primary-dark);
        }
    }

    &--delete {
        background-color: var(--color-error);

        &:not(:disabled) {
            &:hover {
                background-color: var(--color-error-dark);
            }
        }
    }
}
</style>