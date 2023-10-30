<script lang="ts" setup>
import {computed, ref, watchEffect} from 'vue';
import {useI18n} from 'vue-i18n';

import {useCharacterStore} from '../../../stores/characterStore.ts';
import {useScenesStore} from '../../../stores/scenesStore.ts';

import {Action, Label, MessageAction} from '../../../types/scene.ts';

import Row from '../../../layout/Row.vue';
import InputSelect from '../../inputs/InputSelect.vue';
import InputText from '../../inputs/InputText.vue';

type SelectChoices = {
    value: Label['_id']
    label: Label['name']
}

const props = defineProps<{
    action: MessageAction
}>();

const selectedCharacter = ref<Label['_id'] | null>(props.action.character);
const messageValue = ref<string>(props.action.message);

const possibleScenes = computed<SelectChoices[]>(() => {
    const scenes: SelectChoices[] = useCharacterStore().getCharacters.map(scene => {
        return {value: scene._id, label: scene.name};
    });

    return [
        {
            value: null,
            label: useI18n().t('scenes.actions.message.noCharacter')
        },
        ...scenes
    ] as SelectChoices[];
});

watchEffect(() => {
    const store = useScenesStore();

    store.updateAction({
        ...props.action,
        character: selectedCharacter.value,
        message: messageValue.value
    } as Action);
});
</script>

<template>
  <div class="message">
    <Row
      large="3"
      small="3"
    >
      <InputSelect
        :model-value="selectedCharacter"
        :options="possibleScenes"
        no-translate
        @update:model-value="selectedCharacter = $event"
      />
      <InputText
        :model-value="props.action.message"
        class="message__input message__input--textarea"
        text-area
        @update:model-value="messageValue = $event"
      />
    </Row>
  </div>
</template>

<style lang="scss" scoped>
.message {
    &__input {
        grid-column: span 3;
    }
}
</style>