<script setup lang="ts">
import {invoke} from '@tauri-apps/api/tauri';
import {ref} from 'vue';

import {useSettingStore} from '../stores/useSettingStore.ts';

import {PathManager} from '../utils/path.ts';
import {capitalize} from '../utils/tools';

import ActionButton from '../components/ActionButton.vue';
import Icon from '../components/Icon.vue';

import Actions from './Actions.vue';

const canPlayGame = ref<boolean>(true);
const canStartRenpy = ref<boolean>(true);

withDefaults(
    defineProps<{
        pageTitle: string
    }>(),
    {
        pageTitle: ''
    }
);

async function playGame(): Promise<void> {
    const renpyPath = useSettingStore().renpyPath;
    if (renpyPath) {
        canPlayGame.value = false;
        void invoke('execute_game', {path: renpyPath, gamePath: PathManager.last?.path});
        setTimeout(() => canPlayGame.value = true, 1000);
    }
}

async function startRenpy(): Promise<void> {
    const renpyPath = useSettingStore().renpyPath;
    if (renpyPath) {
        canStartRenpy.value = false;
        void invoke('execute_renpy', {path: renpyPath});
        setTimeout(() => canStartRenpy.value = true, 1000);
    }
}
</script>

<template>
  <div class="app-container">
    <div class="top">
      <h1 v-if="pageTitle.length > 0">
        {{ capitalize($t(pageTitle)) }}
      </h1>
      <Actions>
        <ActionButton
          v-if="useSettingStore().hasRenpyPath"
          :disabled="!canPlayGame"
          @click="playGame"
        >
          <Icon name="play_arrow" />
          {{ $t('play_game') }}
        </ActionButton>
        <ActionButton
          v-if="useSettingStore().hasRenpyPath"
          :disabled="!canStartRenpy"
          @click="startRenpy"
        >
          <Icon name="settings_slow_motion" />
          {{ $t('start_renpy') }}
        </ActionButton>
      </Actions>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.app-container {
    height: 100%;
    width: 100%;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

h1 {
    font-size: 3rem;
    margin-top: 0;
    margin-bottom: 1rem;
}
</style>