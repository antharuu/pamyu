<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <i class="material-symbols-outlined" v-text="name.trim()"></i>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style>
