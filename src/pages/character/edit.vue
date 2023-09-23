<script setup lang="ts">
import {computed, ref, watch} from "vue";
import InputText from "../../components/inputs/InputText.vue";
import InputColor from "../../components/inputs/InputColor.vue";
import InputContainer from "../../layout/InputContainer.vue";
import ActionButton from "../../components/ActionButton.vue";
import {useCharacterStore} from "../../stores/characterStore";
import {useRoute, useRouter} from "vue-router";
import {Character} from "../../types/character";

const route = useRoute();
const router = useRouter();

const character = computed<Character>(() => useCharacterStore().getCharacterById(`${route.params.id}`))
const characterEdit = ref<Character>();

const nameError = computed<string>(() => {
    if (characterEdit.value.name === undefined) return "";
    if (characterEdit.value.name.length === 0) return "character_name_required";
    return "";
});

const isValid = computed<boolean>(() => {
    return nameError.value.length === 0 && characterEdit.value.name !== undefined && characterEdit.value.name.length > 0;
});

function editCharacter() {
    if (!isValid.value) return;

    useCharacterStore().updateCharacter(characterEdit.value)
}

function deleteCharacter() {
    useCharacterStore().deleteCharacter(characterEdit.value)
    router.push({name: "character.edit", params: { id: useCharacterStore().getCharacters[0]._id }})
}

watch(character, (newVal) => {
    if (!newVal) return;
    characterEdit.value = {...newVal};
},  {immediate: true})
</script>

<template>
    <div v-if="character && character._id">
        <h2>{{ $t('edit_character') }}</h2>
        <InputContainer>
            <InputText label="character_id" :model-value="character._id" readonly/>
            <InputText
                label="character_name"
                v-capitalize
                :model-value="characterEdit.name"
                :error="nameError"
                @update:model-value="characterEdit.name = $event"
            />
            <InputColor
                label="character_color"
                :model-value="characterEdit.color"
                @update:model-value="characterEdit.color = $event"
            />

            <template #actions>
                <ActionButton @click="deleteCharacter" type="delete">
                    {{ $t('delete') }}
                </ActionButton>
                <ActionButton :disabled="!isValid" @click="editCharacter">
                    {{ $t('edit') }}
                </ActionButton>
            </template>
        </InputContainer>
    </div>
</template>

<style scoped>

</style>