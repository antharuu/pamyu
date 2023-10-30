<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';

import {useScenesStore} from '../../stores/scenesStore.ts';

import {Label} from '../../types/scene.ts';

import Timeline from '../../components/scenes/Timeline.vue';

const route = useRoute();
const router = useRouter();
const scene = ref<Label>();

function updateScene(id: string): void {
    const sc = useScenesStore().getSceneById(id);
    if (!sc) throw new Error('Scene not found');
    scene.value = sc;
}


router.beforeEach((to, _from, next) => {
    if (to.name === 'scene.edit') {
        updateScene(to.params.id as string);
    }

    next();
});

onMounted(() => updateScene(route.params.id as string));
</script>

<template>
  <div
    v-if="scene"
    class="timeline-container"
  >
    <h2>{{ scene.name }}</h2>
    <Timeline
      v-if="scene"
      :key="scene._id"
      :scene-id="scene._id"
    />
  </div>
</template>

<style scoped>
.timeline-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px 1fr;
    gap: 1rem;
}

h2 {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    color: var(--color-text);
}
</style>