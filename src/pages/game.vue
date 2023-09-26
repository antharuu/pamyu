<script setup lang="ts">
import {ref} from 'vue';

import {useProjectStore} from '../stores/useProjectStore.ts';

import ActionButton from '../components/ActionButton.vue';
import InputCheckbox from '../components/inputs/InputCheckbox.vue';
import InputSelect from '../components/inputs/InputSelect.vue';
import InputText from '../components/inputs/InputText.vue';
import InputTransition from '../components/inputs/InputTransition.vue';

import InputContainer from '../layout/InputContainer.vue';
import PageLayout from '../layout/PageLayout.vue';
import Row from '../layout/Row.vue';

const tempProject = ref(useProjectStore().getProject);

function saveProject(): void {
    useProjectStore().updateProject(tempProject.value);

    tempProject.value = useProjectStore().getProject;
    window.location.reload();
}

const windowOptions = [
    {value: 'auto', label: 'game.window.auto'},
    {value: 'show', label: 'game.window.show'},
    {value: 'hide', label: 'game.window.hide'},
];
</script>

<template>
  <PageLayout page-title="game.category">
    <InputContainer>
      <Row
        small="3"
        large="3"
      >
        <Row>
          <InputText
            :model-value="tempProject.name"
            label="game.name"
            @update:model-value="tempProject.name = $event"
          />
          <InputCheckbox
            :model-value="tempProject.showName"
            label="game.show_name"
            @update:model-value="tempProject.showName = $event"
          />
          <InputText
            :model-value="tempProject.version"
            label="game.version"
            @update:model-value="tempProject.version = $event"
          />
          <InputText
            :model-value="tempProject.about"
            label="game.about"
            text-area
            @update:model-value="tempProject.about = $event"
          />
          <InputText
            :model-value="tempProject.buildName"
            label="game.buildName"
            @update:model-value="tempProject.buildName = $event"
          />
          <InputText
            :model-value="tempProject.saveDirectory"
            readonly
            label="game.saveDirectory"
            @update:model-value="tempProject.saveDirectory = $event"
          />
          <InputText
            :model-value="tempProject.windowIcon"
            label="game.windowIcon"
            @update:model-value="tempProject.windowIcon = $event"
          />
        </Row>
        <Row>
          <InputSelect
            :model-value="tempProject.window"
            :options="windowOptions"
            label="game.window.mode"
            @update:model-value="tempProject.window = $event"
          />
          <InputTransition
            :model-value="tempProject.transitionEnter"
            label="game.transitionEnter"
            @update:model-value="tempProject.transitionEnter = $event"
          />
          <InputTransition
            :model-value="tempProject.transitionExit"
            label="game.transitionExit"
            @update:model-value="tempProject.transitionExit = $event"
          />
          <InputTransition
            :model-value="tempProject.transitionIntra"
            label="game.transitionIntra"
            @update:model-value="tempProject.transitionIntra = $event"
          />
          <InputTransition
            :model-value="tempProject.transitionAfterLoad"
            label="game.transitionAfterLoad"
            @update:model-value="tempProject.transitionAfterLoad = $event"
          />
          <InputTransition
            :model-value="tempProject.transitionEndGame"
            label="game.transitionEndGame"
            @update:model-value="tempProject.transitionEndGame = $event"
          />
          <InputTransition
            :model-value="tempProject.transitionWindowShow"
            label="game.transitionWindowShow"
            @update:model-value="tempProject.transitionWindowShow = $event"
          />
          <InputTransition
            :model-value="tempProject.transitionWindowHide"
            label="game.transitionWindowHide"
            @update:model-value="tempProject.transitionWindowHide = $event"
          />
        </Row>
        <Row>
          <InputCheckbox
            :model-value="tempProject.hasSound"
            label="game.hasSound"
            @update:model-value="tempProject.hasSound = $event"
          />
          <InputCheckbox
            :model-value="tempProject.hasMusic"
            label="game.hasMusic"
            @update:model-value="tempProject.hasMusic = $event"
          />
          <InputCheckbox
            :model-value="tempProject.hasVoice"
            label="game.hasVoice"
            @update:model-value="tempProject.hasVoice = $event"
          />
        </Row>
      </Row>
      <template #actions>
        <ActionButton
          :disabled="!tempProject.name"
          @click="saveProject"
        >
          {{ $t('save') }}
        </ActionButton>
      </template>
    </InputContainer>
  </PageLayout>
</template>

<style scoped>

</style>