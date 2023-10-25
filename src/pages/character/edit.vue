<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import {useRoute} from 'vue-router';

import {useCharacterStore} from '../../stores/characterStore';

import i18n from '../../utils/i18n.ts';
import {capitalize} from '../../utils/tools.ts';

import {Character} from '../../types/character';

import ActionButton from '../../components/ActionButton.vue';
import InputColor from '../../components/inputs/InputColor.vue';
import InputSelect from '../../components/inputs/InputSelect.vue';
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

    move();
}

function move(): void {
    if (character.value?.folder !== characterEdit.value?.folder && character.value) {
        useCharacterStore().moveCharacter(character.value, characterEdit.value?.folder ?? undefined);
    }
}

watch(character, (newVal) => {
    if (!newVal) return;
    characterEdit.value = {...newVal};
}, {immediate: true});

const charactersFolders = computed(() => {
    const folders = useCharacterStore().getCharactersFolders;
    const base = [{
        value: undefined,
        label: i18n.global.t('folders.noFolder'),
    }];
    const list = folders.map((folder) => {
        return {
            value: folder,
            label: capitalize(folder),
        };
    });

    return [...base, ...list];
});
</script>

<template>
  <div v-if="character && character._id && characterEdit">
    <h2>{{ $t('characters.edit') }}</h2>
    <InputContainer>
      <Row
        small="2"
        large="3"
      >
        <Row class="left">
          <InputText
            label="characters.id"
            :model-value="character._id"
            readonly
          />
          <InputText
            v-capitalize
            label="characters.name"
            :model-value="characterEdit.name"
            :error="nameError"
            @update:model-value="characterEdit.name = $event"
          />
          <InputColor
            label="characters.color"
            :model-value="characterEdit.color"
            @update:model-value="characterEdit.color = $event"
          />
          <InputSelect
            v-if="charactersFolders.length > 0"
            :options="charactersFolders"
            label="folders.title"
            no-translate
            :model-value="characterEdit.folder"
            @update:model-value="characterEdit.folder = $event"
          />
        </Row>

        <Row
          class="right"
          large="2"
        >
          <InputText
            label="characters.what.prefix"
            no-trim
            :model-value="characterEdit.what_prefix"
            @update:model-value="characterEdit.what_prefix = $event"
          />
          <InputText
            label="characters.what.suffix"
            no-trim
            :model-value="characterEdit.what_suffix"
            @update:model-value="characterEdit.what_suffix = $event"
          />
          <InputText
            label="characters.who.prefix"
            no-trim
            :model-value="characterEdit.who_prefix"
            @update:model-value="characterEdit.who_prefix = $event"
          />
          <InputText
            label="characters.who.suffix"
            no-trim
            :model-value="characterEdit.who_suffix"
            @update:model-value="characterEdit.who_suffix = $event"
          />
        </Row>
      </Row>

      <template #actions>
        <router-link :to="{name: 'character.delete', params: {id: character._id}}">
          <ActionButton type="delete">
            {{ $t('global.delete') }}
          </ActionButton>
        </router-link>
        <ActionButton
          :disabled="!isValid"
          @click="editCharacter"
        >
          {{ $t('global.edit') }}
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