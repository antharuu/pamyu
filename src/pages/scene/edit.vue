<script setup lang="ts">
import {computed} from 'vue';
import {useRoute} from 'vue-router';

import {useScenesStore} from '../../stores/scenesStore.ts';

import {Label} from '../../types/scene.ts';

const route = useRoute();
const scene = computed<Label>(() => {
    // noinspection TypeScriptValidateJSTypes
    const sc = useScenesStore().getSceneById(`${route.params.id}`);
    if (!sc) throw new Error('Scene not found');
    return sc;
});
</script>

<template>
  <h1>{{ scene.name }}</h1>
</template>

<style scoped>

</style>