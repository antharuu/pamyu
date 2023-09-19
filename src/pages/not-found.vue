<script setup lang="ts">
import {useCounterStore} from "../stores/counter";
</script>

<template>
  <div>
    <h1>{{ useCounterStore().count }}</h1>
    <p>Page not found</p>
    <button @click="useCounterStore().increment">
      + Increment
    </button>
  </div>
</template>

<style scoped>
button {
  margin-left: 10px;
  padding: 10px;
}
</style>