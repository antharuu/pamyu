<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';

import {useScenesStore} from '../../stores/scenesStore.ts';

import {Label} from '../../types/scene.ts';

import Timeline from '../../components/scenes/Timeline.vue';

import Row from '../../layout/Row.vue';

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
  <div v-if="scene">
    <h2>{{ scene.name }}</h2>
    <Row>
      <Timeline
        v-if="scene"
        :key="scene._id"
        :scene-id="scene._id"
      />
    </Row>
  </div>
</template>

<style>

</style>