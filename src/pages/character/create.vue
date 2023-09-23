<script setup lang="ts">
import {computed, ref} from "vue";
import InputText from "../../components/inputs/InputText.vue";
import InputColor from "../../components/inputs/InputColor.vue";
import InputContainer from "../../layout/InputContainer.vue";
import ActionButton from "../../components/ActionButton.vue";
import {useCharacterStore} from "../../stores/characterStore.ts";

const name = ref<string>();
const nameError = computed<string>(() => {
    if (name.value === undefined) return "";
    if (name.value.length === 0) return "character_name_required";
    return "";
});

const color = ref<string>();

const isValid = computed<boolean>(() => {
    return nameError.value.length === 0 && name.value !== undefined && name.value.length > 0;
});

const createCharacter = () => {
    if(!isValid.value) return;

    useCharacterStore().addCharacter({
        name: name.value,
        color: color.value,
    })

    name.value = undefined;
    color.value = undefined;
}
</script>

<template>
    <div>
        <h2>{{ $t('create_character') }}</h2>
        <InputContainer>
            <InputText
                label="character_name"
                v-capitalize
                :model-value="name"
                :error="nameError"
                @update:model-value="name = $event"
            />
            <InputColor
                label="character_color"
                :model-value="color"
                @update:model-value="color = $event"
            />

            <template #actions>
                <ActionButton :disabled="!isValid" @click="createCharacter">
                    {{ $t('create') }}
                </ActionButton>
            </template>
        </InputContainer>
    </div>
</template>

<style scoped>

</style>