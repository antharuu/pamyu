<script lang="ts" setup>
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
          {{ $t('renpy.runGame') }}
        </ActionButton>
        <ActionButton
          v-if="useSettingStore().hasRenpyPath"
          :disabled="!canStartRenpy"
          @click="startRenpy"
        >
          <Icon name="settings_slow_motion" />
          {{ $t('renpy.runRenpy') }}
        </ActionButton>
      </Actions>
    </div>
    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app-container {
    display: grid;
    grid-template-rows: 2.4rem 1fr;
    gap: 1rem;
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

h1 {
    font-size: 2rem;
    margin-top: 0;
}
</style>