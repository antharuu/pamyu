<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps<{
    small?: '2' | '3' | '4';
    large?: '2' | '3' | '4';
}>();

const customStyle = computed(() => {
    const small = props.small ? props.small : 1;
    const large = props.large ? props.large : 1;
    return {
        '--cols-small': `repeat(${small}, 1fr)`,
        '--cols-large': `repeat(${large}, 1fr)`,
    };
});
</script>

<template>
  <div
    class="row"
    :style="customStyle"
  >
    <slot />
  </div>
</template>

<style scoped>
.row {
    --cols-small: 1fr;
    --cols-large: 1fr;
    display: grid;
    align-items: start;
    gap: 1rem;
    grid-template-columns: var(--cols-small);

    @media (width >= 1400px) {
        grid-template-columns: var(--cols-large);
    }
}
</style>