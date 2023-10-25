<script lang="ts" setup>
import {ref, watch} from 'vue';

import {useScenesStore} from '../../../stores/scenesStore.ts';

import {Action, RawAction} from '../../../types/scene.ts';

import InputText from '../../inputs/InputText.vue';

const props = defineProps<{
    action: RawAction
}>();

const inputValue = ref<string>(props.action.code);

watch(inputValue, (newValue) => {
    console.log('Update raw action: ', newValue);
    useScenesStore().updateAction({
        ...props.action,
        code: newValue
    } as Action);
});
</script>

<template>
  <div class="raw">
    <InputText
      :model-value="inputValue"
      text-area
      @update:model-value="inputValue = $event"
    />
  </div>
</template>

<style scoped>

</style>