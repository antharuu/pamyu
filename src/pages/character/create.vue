<script setup lang="ts">
import {computed, ref} from 'vue';

import {useCharacterStore} from '../../stores/characterStore.ts';

import ActionButton from '../../components/ActionButton.vue';
import InputColor from '../../components/inputs/InputColor.vue';
import InputText from '../../components/inputs/InputText.vue';

import InputContainer from '../../layout/InputContainer.vue';
import Row from '../../layout/Row.vue';
 
const name = ref<string>();
const nameError = computed<string>(() => {
    if (name.value === undefined) return '';
    if (name.value.length === 0) return 'character_name_required';
    return '';
});

const whatPrefix = ref<string>();
const whatSuffix = ref<string>();
const whoPrefix = ref<string>();
const whoSuffix = ref<string>();

const color = ref<string>();

const isValid = computed<boolean>(() => {
    return nameError.value.length === 0 && name.value !== undefined && name.value.length > 0;
});

function createCharacter(): void {
    if (!isValid.value) return;

    useCharacterStore().addCharacter({
        name: name.value,
        color: color.value,
        what_prefix: whatPrefix.value,
        what_suffix: whatSuffix.value,
        who_prefix: whoPrefix.value,
        who_suffix: whoSuffix.value,
    });

    name.value = undefined;
    color.value = undefined;
}
</script>

<template>
  <div>
    <h2>{{ $t('characters.create') }}</h2>
    <InputContainer>
      <Row
        small="2"
        large="3"
      >
        <Row class="left">
          <InputText
            v-capitalize
            label="characters.name"
            :model-value="name"
            :error="nameError"
            @update:model-value="name = $event"
          />
          <InputColor
            label="characters.color"
            :model-value="color"
            @update:model-value="color = $event"
          />
        </Row>

        <Row
          class="right"
          large="2"
        >
          <InputText
            label="characters.what.prefix"
            no-trim
            :model-value="whatPrefix"
            @update:model-value="whatPrefix = $event"
          />
          <InputText
            label="characters.what.suffix"
            no-trim
            :model-value="whatSuffix"
            @update:model-value="whatSuffix = $event"
          />
          <InputText
            label="characters.who.prefix"
            no-trim
            :model-value="whoPrefix"
            @update:model-value="whoPrefix = $event"
          />
          <InputText
            label="characters.who.suffix"
            no-trim
            :model-value="whoSuffix"
            @update:model-value="whoSuffix = $event"
          />
        </Row>
      </Row>

      <template #actions>
        <ActionButton
          :disabled="!isValid"
          @click="createCharacter"
        >
          {{ $t('global.create') }}
        </ActionButton>
      </template>
    </InputContainer>
  </div>
</template>

<style scoped>
.right {
    @media (width >= 1400px) {
        grid-column: span 2;
    }
}
</style>