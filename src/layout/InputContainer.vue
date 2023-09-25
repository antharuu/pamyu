<template>
  <div class="input-container">
    <div class="input-container-inputs">
      <slot />
    </div>
    <Actions
      v-if="$slots.actions"
      end
      class="input-container-actions"
    >
      <slot name="actions" />
    </Actions>
  </div>
</template>

<script setup lang="ts">
import Actions from './Actions.vue';
</script>
<style scoped>
.input-container, .input-container-inputs {
    display: grid;
    gap: 1rem;
}
</style>