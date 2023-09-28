<script setup lang="ts">
import {useCharacterStore} from '../stores/characterStore.ts';

import ActionButton from '../components/ActionButton.vue';

import ListContainer from '../layout/ListContainer.vue';
import PageLayout from '../layout/PageLayout.vue';
</script>

<template>
  <PageLayout page-title="characters">
    <ListContainer>
      <template #list>
        <router-link :to="{name: 'character.create'}">
          <ActionButton block>
            {{ $t("create_character") }}
          </ActionButton>
        </router-link>

        <div class="characters">
          <router-link
            v-for="character in useCharacterStore().getCharacters"
            :key="character._id"
            :to="{ name: 'character.edit', params: { id: character._id } }"
            class="character"
          >
            <div class="character__name">
              {{ character.name }}
            </div>
          </router-link>
        </div>
      </template>

      <router-view />
    </ListContainer>
  </PageLayout>
</template>

<style scoped>
.characters {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;

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
}
</style>