<script setup lang="ts">
import {computed, ref} from 'vue';

import {useCharacterStore} from '../../../stores/characterStore.ts';

import ActionButton from '../../../components/ActionButton.vue';
import InputText from '../../../components/inputs/InputText.vue';

import Actions from '../../../layout/Actions.vue';
import Row from '../../../layout/Row.vue';

const name = ref<string>();
const nameError = computed(() => {
    if (name.value === undefined) return '';
    if (name.value.length === 0) return 'folder_name_required';
    return '';
});

const notValid = computed(() => {
    return nameError.value.length > 0 || name.value === undefined || name.value.length === 0;
});

function createFolder(): void {
    if (notValid.value) return;

    useCharacterStore().createFolder(name.value);

    name.value = undefined;
}
</script>

<template>
  <div>
    <h2>{{ $t('folders.create') }}</h2>
    <InputContainer>
      <Row large="2">
        <InputText
          :model-value="name"
          :error="nameError"
          label="folders.name"
          @update:model-value="name = $event"
        />
        <div />
        <Actions end>
          <ActionButton
            :disabled="notValid"
            @click="createFolder"
          >
            {{ $t("global.create") }}
          </ActionButton>
        </Actions>
      </Row>
    </InputContainer>
  </div>
</template>

<style scoped>

</style>