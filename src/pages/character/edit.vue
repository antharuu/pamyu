<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import {useRoute} from 'vue-router';

import {useCharacterStore} from '../../stores/characterStore';

import {Character} from '../../types/character';

import ActionButton from '../../components/ActionButton.vue';
import InputColor from '../../components/inputs/InputColor.vue';
import InputText from '../../components/inputs/InputText.vue';

import InputContainer from '../../layout/InputContainer.vue';
import Row from '../../layout/Row.vue';

const route = useRoute();

const character = computed<Character | undefined>(() => useCharacterStore().getCharacterById(`${route.params.id}`));
const characterEdit = ref<Character>();

const nameError = computed<string>(() => {
    if (!characterEdit.value || characterEdit.value.name === undefined) return '';
    if (characterEdit.value.name.length === 0) return 'character_name_required';
    return '';
});

const isValid = computed<boolean>(() => {
    if (!characterEdit.value) return false;
    return nameError.value.length === 0 && characterEdit.value.name !== undefined && characterEdit.value.name.length > 0;
});

function editCharacter(): void {
    if (!isValid.value) return;

    if (characterEdit.value) {
        useCharacterStore().updateCharacter(characterEdit.value);
    }
}

watch(character, (newVal) => {
    if (!newVal) return;
    characterEdit.value = {...newVal};
}, {immediate: true});
</script>

<template>
  <div v-if="character && character._id && characterEdit">
    <h2>{{ $t('edit_character') }}</h2>
    <InputContainer>
      <Row
        small="2"
        large="3"
      >
        <Row class="left">
          <InputText
            label="character_id"
            :model-value="character._id"
            readonly
          />
          <InputText
            v-capitalize
            label="character_name"
            :model-value="characterEdit.name"
            :error="nameError"
            @update:model-value="characterEdit.name = $event"
          />
          <InputColor
            label="character_color"
            :model-value="characterEdit.color"
            @update:model-value="characterEdit.color = $event"
          />
        </Row>

        <Row
          class="right"
          large="2"
        >
          <InputText
            label="character_what_prefix"
            :model-value="characterEdit.what_prefix"
            @update:model-value="characterEdit.what_prefix = $event"
          />
          <InputText
            label="character_what_suffix"
            :model-value="characterEdit.what_suffix"
            @update:model-value="characterEdit.what_suffix = $event"
          />
          <InputText
            label="character_who_prefix"
            :model-value="characterEdit.who_prefix"
            @update:model-value="characterEdit.who_prefix = $event"
          />
          <InputText
            label="character_who_suffix"
            :model-value="characterEdit.who_suffix"
            @update:model-value="characterEdit.who_suffix = $event"
          />
        </Row>
      </Row>

      <template #actions>
        <router-link :to="{name: 'character.delete', params: {id: character._id}}">
          <ActionButton type="delete">
            {{ $t('delete') }}
          </ActionButton>
        </router-link>
        <ActionButton
          :disabled="!isValid"
          @click="editCharacter"
        >
          {{ $t('edit') }}
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