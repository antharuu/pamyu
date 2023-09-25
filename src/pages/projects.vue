<script setup lang="ts">
import {PathManager} from '../utils/path.ts';
import {truncatePath} from '../utils/tools.ts';

import ListContainer from '../layout/ListContainer.vue';
import PageLayout from '../layout/PageLayout.vue';

import Create from './projects/create.vue';

const paths = PathManager.getAll();

function loadProject(path: string): void {
    PathManager.setAsLast(path);
    window.location.reload();
}
</script>

<template>
  <PageLayout page-title="projects">
    <ListContainer v-if="paths.length > 0">
      <template #list>
        <div class="paths">
          <div
            v-for="path in paths"
            :key="path._id"
            class="path"
            :class="{active: path.isLast}"
            @click="loadProject(path._id)"
          >
            <div class="character__name">
              {{ truncatePath(path.path, 40) }}
            </div>
          </div>
        </div>
      </template>
      <Create />
    </ListContainer>
    <Create v-else />
  </PageLayout>
</template>

<style scoped>
.paths {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;

    .path {
        background-color: var(--color-grey);
        border-radius: 5px;
        padding: 1rem;
        cursor: pointer;
        text-decoration: none;
        color: var(--color-light);

        /*noinspection CssUnusedSymbol*/

        &:hover, &.router-link-active, &.active {
            outline: 2px solid var(--color-primary);
        }
    }
}
</style>