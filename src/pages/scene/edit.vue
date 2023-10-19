<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';

import {useScenesStore} from '../../stores/scenesStore.ts';

import {Action, Label} from '../../types/scene.ts';

import ActionButton from '../../components/ActionButton.vue';
import InputText from '../../components/inputs/InputText.vue';

import Actions from '../../layout/Actions.vue';
import InputContainer from '../../layout/InputContainer.vue';
import Row from '../../layout/Row.vue';

const route = useRoute();
const scene = computed<Label>(() => {
    // noinspection TypeScriptValidateJSTypes
    const sc = useScenesStore().getSceneById(`${route.params.id}`);
    if (!sc) throw new Error('Scene not found');
    return sc;
});

const action = ref<Action>();
const rawScript = ref<string>('');

function updateScript(): void {
    if (action.value) {
        useScenesStore().updateAction({
            ...action.value,
            code: rawScript.value,
        } as Action);
    } else {
        useScenesStore().createAction('raw', {
            code: rawScript.value,
        }, scene.value._id);
    }
}

function init(): void {
    if (scene.value.actions.length > 0) {
        action.value = useScenesStore().getActionById(scene.value.actions[0]);
        if (!action.value) return;
        if (action.value.type === 'raw') {
            rawScript.value = action.value.code ?? '';
        }
    } else {
        rawScript.value = '';
    }
}

onMounted(() => init());

useRouter().afterEach(() => init());
</script>

<template>
  <div>
    <h1>{{ scene.name }}</h1>
    <Row>
      <InputContainer>
        <InputText
          v-model="rawScript"
          text-area
          label="scenes.actions.raw"
        />
      </InputContainer>
      <Actions end>
        <ActionButton @click="updateScript">
          {{ $t('global.save') }}
        </ActionButton>
      </Actions>
    </Row>
  </div>
</template>

<style scoped>

</style>