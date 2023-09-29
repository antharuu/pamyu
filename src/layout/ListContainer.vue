<script setup lang="ts">

</script>

<template>
  <div class="list-container">
    <div class="left">
      <slot name="list" />
    </div>
    <div class="right">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.list-container {
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 4fr;
    grid-template-rows: 1fr;
    grid-gap: 1rem;
    max-height: calc(100vh - 6.6rem);
    overflow: hidden;
}

.left {
    overflow: hidden;
    padding: .5em;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
}

.right {
    overflow: hidden;
    padding: .5em;
}
</style>