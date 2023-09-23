<script setup lang="ts">
defineProps<{
    end?: boolean
    center?: boolean
}>()
</script>

<template>
    <div class="actions" :class="{'actions--end': end, 'actions--center': center}">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.actions {
    display: flex;
    align-items: center;
    gap: 1rem;

    &--end {
        justify-content: flex-end;
    }

    &--center {
        justify-content: center;
    }
}
</style>