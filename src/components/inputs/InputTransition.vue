<script lang="ts" setup>
import {computed} from 'vue';

import InputSelect from './InputSelect.vue';
import InputText from './InputText.vue';

const props = defineProps<{
    modelValue: string | number | undefined;
    label: string;
    width?: string | null;
    readonly?: boolean;
    error?: string;
    message?: string;
    options: {value: string, label: string}[];
}>();

const transitions = [
    {value: null, label: 'transitions.none'},
    {value: 'fade', label: 'transitions.fade'},
    {value: 'dissolve', label: 'transitions.dissolve'},
    {value: 'pixellate', label: 'transitions.pixellate'},
    {value: 'move', label: 'transitions.move'},
    {value: 'moveinright', label: 'transitions.moveinright'},
    {value: 'moveoutright', label: 'transitions.moveoutright'},
    {value: 'ease', label: 'transitions.ease'},
    {value: 'zoomin', label: 'transitions.zoomin'},
    {value: 'zoomout', label: 'transitions.zoomout'},
    {value: 'zoominout', label: 'transitions.zoominout'},
    {value: 'zoominout', label: 'transitions.zoominout'},
    {value: 'vpunch', label: 'transitions.vpunch'},
    {value: 'hpunch', label: 'transitions.hpunch'},
    {value: 'blinds', label: 'transitions.blinds'},
    {value: 'squares', label: 'transitions.squares'},
    {value: 'wipeleft', label: 'transitions.wipeleft'},
    {value: 'slideleft', label: 'transitions.slideleft'},
    {value: 'slideawayleft', label: 'transitions.slideawayleft'},
    {value: 'slideawayleft', label: 'transitions.pushright'},
    {value: 'irisin', label: 'transitions.irisin'}
];

const emit = defineEmits(['update:model-value']);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:model-value', value);
    }
});

console.log(props.modelValue);
const isAdvancedInput = computed(() => !transitions.some(transition => transition.value === props.modelValue));
</script>

<template>
  <InputSelect
    v-if="!isAdvancedInput"
    :options="transitions"
    :model-value="props.modelValue"
    :label="props.label"
    :width="props.width"
    :readonly="props.readonly"
    :error="props.error"
    :message="props.message"
    @update:model-value="value = $event"
  />
  <InputText
    v-else
    :model-value="props.modelValue"
    :label="props.label"
    :width="props.width"
    :readonly="props.readonly"
    :error="props.error"
    :message="props.message"
    @update:model-value="value = $event"
  />
</template>

