<script setup lang="ts">
import {useScenesStore} from '../stores/scenesStore.ts';

import ActionButton from '../components/ActionButton.vue';
import SceneListElement from '../components/SceneListElement.vue';

import ListContainer from '../layout/ListContainer.vue';
import PageLayout from '../layout/PageLayout.vue';

function create(): void {
    useScenesStore().createScene('New scene à la con');
}

const scenes = useScenesStore().getScenes;
</script>

<template>
  <PageLayout page-title="scenes.title">
    <ListContainer>
      <template #list>
        <router-link :to="{name: 'scene.create'}">
          <ActionButton block>
            {{ $t("scenes.create") }}
          </ActionButton>
        </router-link>

        <div class="scenes">
          <SceneListElement
            v-for="scene in scenes"
            :key="scene._id"
            :scene-id="scene._id"
          />
        </div>
      </template>
      <router-view />
    </listcontainer>
  </PageLayout>
</template>

<style scoped>
.scenes {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}
</style>