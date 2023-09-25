<script setup lang="ts">
import {computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';

import {useCharacterStore} from '../../stores/characterStore.ts';

import {Character} from '../../types/character.ts';

import ActionButton from '../../components/ActionButton.vue';
import Icon from '../../components/Icon.vue';

import Actions from '../../layout/Actions.vue';

const route = useRoute();
const router = useRouter();
const character = computed<Character | undefined>(() => useCharacterStore().getCharacterById(`${route.params.id}`));

function deleteCharacter(): void {
    if (character.value) {
        useCharacterStore().deleteCharacter(character.value);
    }
    router.push({name: 'character.edit', params: {id: useCharacterStore().getCharacters[0]._id}});
}

function back(): void {
    router.back();
}
</script>

<template>
  <div v-if="character">
    <h2>{{ $t('delete_character') }} <small class="text-primary">{{ character.name }}</small></h2>
    <p>{{ $t('delete_character_message') }}</p>
    <p class="warn-message">
      <Icon
        name="warning"
        style="position: relative; top: 5px;"
      />
      {{ $t('delete_character_message_warning') }}
    </p>
    <br>
    <Actions>
      <ActionButton
        type="delete"
        @click="deleteCharacter"
      >
        {{ $t('delete') }}
      </ActionButton>
      <ActionButton @click="back">
        {{ $t('cancel') }}
      </ActionButton>
    </Actions>
  </div>
</template>

<style scoped>
.text-primary {
    color: var(--color-primary);
}

.warn-message {
    color: var(--color-error);
}
</style>