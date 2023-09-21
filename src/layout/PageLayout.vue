<script setup lang="ts">
import {capitalize} from "../utils/tools";

withDefaults(
    defineProps<{
        pageTitle: string
    }>(),
    {
        pageTitle: ""
    }
)
</script>

<template>
    <div class="app-container">
        <h1 v-if="pageTitle.length > 0">{{ capitalize($t(pageTitle)) }}</h1>
        <slot/>
    </div>
</template>

<style scoped>
.app-container {
    height: 100%;
    width: 100%;
}

h1 {
    font-size: 3rem;
    margin-top: 0;
    margin-bottom: 1rem;
}
</style>