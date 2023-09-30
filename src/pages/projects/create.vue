<script setup lang="ts">
import {invoke} from '@tauri-apps/api/tauri';
import {computed, ref, watch} from 'vue';

import {PathManager} from '../../utils/path.ts';

import ActionButton from '../../components/ActionButton.vue';
import InputPath from '../../components/inputs/InputPath.vue';

import Actions from '../../layout/Actions.vue';
import InputContainer from '../../layout/InputContainer.vue';
import Row from '../../layout/Row.vue';

const path = ref<string>('');
const pathError = computed<string>(() =>
    path.value.length > 0 && !isValid.value && !isValidating.value ? 'project_path_invalid' : '');

function createPath(): void {
    if (!isValid.value) return;
    isValid.value = false; // Avoid spamming the button


    PathManager.addNewPath(path.value);
}

const isValid = ref<boolean>(false);
const isValidating = ref<boolean>(false);

watch(path, async () => {
    isValid.value = false;
    isValidating.value = true;

    path.value = getValidRenpyPath(path.value);

    let valid = path.value.length > 0;
    await invoke('load_project', {path: path.value})
        .catch(() => valid = false);

    isValid.value = valid;
    isValidating.value = false;
});

function getValidRenpyPath(path: string): string {
    const regex = /[\/\\]game/;
    if (regex.test(path)) return path.split(regex)[0];

    return path;
}


</script>

<template>
  <div>
    <h2>{{ $t('add_project') }}</h2>
    <InputContainer>
      <Row large="2">
        <Row>
          <InputPath
            :model-value="path"
            :error="pathError"
            label="project_path"
            @update:model-value="path = $event"
          />
          <Actions end>
            <ActionButton
              :disabled="!isValid || isValidating"
              @click="createPath"
            >
              {{ $t("add_project") }}
            </ActionButton>
          </Actions>
        </Row>
      </Row>
    </InputContainer>
  </div>
</template>

<style scoped>

</style>