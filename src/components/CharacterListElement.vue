<script setup lang="ts">
import {useCharacterStore} from '../stores/characterStore.ts';

import {getVisibleName} from '../utils/characters.ts';

import {Character} from '../types/character.ts';

defineProps<{
    characterId: Character['_id'];
}>();
</script>

<template>
  <router-link
    class="character"
    :to="{ name: 'character.edit', params: { id: characterId } }"
  >
    <div class="character__name">
      {{ getVisibleName(useCharacterStore().getCharacterById(characterId)) }}
    </div>
  </router-link>
</template>

<style scoped>
.character {
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