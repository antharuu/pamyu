<script lang="ts" setup>

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
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    overflow: hidden;
}

.left {
    overflow: hidden;
    padding: .5em .5em 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    width: clamp(23rem, 22%, 30rem);
}

.right {
    width: 100%;
    overflow: hidden;
    padding: .5em .5em 0;
}
</style>