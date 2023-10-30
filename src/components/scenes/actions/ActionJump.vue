<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';

import {useScenesStore} from '../../../stores/scenesStore.ts';

import {Action, JumpAction, Label} from '../../../types/scene.ts';

import InputSelect from '../../inputs/InputSelect.vue';

type SelectChoices = {
    value: Label['_id']
    label: Label['name']
}

const props = defineProps<{
    action: JumpAction
}>();

const selectedScene = ref<Label['_id'] | null>(props.action.sceneId);

const possibleScenes = computed<SelectChoices[]>(() => {
    const scenes: SelectChoices[] = useScenesStore().getScenes.map(scene => {
        return {value: scene._id, label: scene.name};
    });

    return [
        {
            value: null,
            label: useI18n().t('scenes.actions.jump.noScene')
        },
        ...scenes
    ] as SelectChoices[];
});

watch(selectedScene, (newValue) => {
    useScenesStore().updateAction({
        ...props.action,
        sceneId: newValue
    } as Action);
});
</script>

<template>
  <div class="jump">
    <InputSelect
      :model-value="selectedScene"
      :options="possibleScenes"
      no-translate
      @update:model-value="selectedScene = $event"
    />
  </div>
</template>

<style scoped>

</style>