<script setup lang="ts">
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';

import {useScenesStore} from '../../stores/scenesStore.ts';

import ActionButton from '../../components/ActionButton.vue';
import InputText from '../../components/inputs/InputText.vue';

import Actions from '../../layout/Actions.vue';
import InputContainer from '../../layout/InputContainer.vue';
import Row from '../../layout/Row.vue';

const router = useRouter();

const sceneName = ref<string>('');

const isValid = computed<boolean>(() => sceneName.value.length > 0);

function createScene(): void {
    if (!isValid.value) return;

    const newId = useScenesStore().createScene(sceneName.value);
    sceneName.value = '';

    router.push({name: 'scene.edit', params: {id: newId}});
}
</script>

<template>
  <div>
    <h2>{{ $t('scenes.create') }}</h2>
    <InputContainer>
      <Row large="2">
        <Row>
          <InputText
            v-model="sceneName"
            label="scenes.name"
          />
          <Actions end>
            <ActionButton
              :disabled="!isValid"
              @click="createScene"
            >
              {{ $t('global.create') }}
            </ActionButton>
          </Actions>
        </Row>
      </Row>
    </InputContainer>
  </div>
</template>

<style scoped>

</style>