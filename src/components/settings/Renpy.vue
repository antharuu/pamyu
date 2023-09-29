<script setup lang="ts">
import {invoke} from '@tauri-apps/api/tauri';
import {ref, watch} from 'vue';

import {useSettingStore} from '../../stores/useSettingStore.ts';

import InputPath from '../inputs/InputPath.vue';

const renpyPath = ref(useSettingStore().renpyPath);
const renpyPathError = ref('');


watch(renpyPath, async () => {
    const files: string[] = await invoke('list_files_from_path', {path: renpyPath.value});
    if(hasRenpyExecutable(files)) {
        renpyPathError.value = '';
        useSettingStore().setRenpyPath(renpyPath.value);
    } else {
        renpyPathError.value = 'renpy_path_error';
        useSettingStore().setRenpyPath(undefined);
    }
});

function hasRenpyExecutable(files: string[]): boolean {
    return !!files.find(file => file.endsWith('renpy.exe'));
}
</script>

<template>
  <InputPath
    label="renpy_path"
    :model-value="renpyPath"
    :error="renpyPathError"
    @update:model-value="renpyPath = $event"
  />
</template>

<style scoped>

</style>