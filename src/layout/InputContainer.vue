<template>
    <div class="input-container">
        <div class="input-container-inputs">
            <slot />
        </div>
        <div class="input-container-actions" v-if="$slots.actions">
            <slot name="actions" />
        </div>
    </div>
</template>

<style scoped>
.input-container, .input-container-inputs {
    display: grid;
    gap: 1rem;
}

.input-container-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}
</style>