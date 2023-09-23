<template>
    <div class="input-container">
        <div class="input-container-inputs">
            <slot />
        </div>
        <Actions end class="input-container-actions" v-if="$slots.actions">
            <slot name="actions" />
        </Actions>
    </div>
</template>

<style scoped>
.input-container, .input-container-inputs {
    display: grid;
    gap: 1rem;
}
</style>
<script setup lang="ts">
import Actions from "./Actions.vue";
</script>