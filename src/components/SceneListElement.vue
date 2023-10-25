<script setup lang="ts">
import {useScenesStore} from '../stores/scenesStore.ts';

import {Label} from '../types/scene.ts';

defineProps<{
    sceneId: Label['_id'];
}>();
</script>

<template>
  <router-link
    class="scene"
    :to="{ name: 'scene.edit', params: { id: sceneId } }"
  >
    <div class="character__name">
      {{ useScenesStore().getSceneById(sceneId).name }}
    </div>
  </router-link>
</template>

<style scoped>
.scene {
    background-color: var(--color-background-light);
    border-radius: 5px;
    padding: 1rem;
    cursor: pointer;
    text-decoration: none;
    color: var(--color-light);

    /*noinspection CssUnusedSymbol*/
    &:hover, &.router-link-active {
        outline: 2px solid var(--color-accent);
    }
}
</style>