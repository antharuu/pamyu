<script lang="ts" setup>
import {ref, watchEffect} from 'vue';

import {Action} from '../../types/scene.ts';

const props = defineProps<{
    isVisible: boolean,
    actions: Action[],
    selectedAction: Action['type'] | null,
    order: number
}>();

const dropZone = ref<HTMLElement | null>(null);
const emit = defineEmits(['set-drag-order', 'remove-drag-order']);

watchEffect(() => {
    if (props.isVisible) {
        dropZone.value?.classList.add('drop-zone--visible');
    } else {
        dropZone.value?.classList.remove('drop-zone--visible');
        dropZone.value?.classList.remove('drop-zone--drag-hover');
    }
});

function dragEnter(): void {
    if (dropZone.value?.classList.contains('drop-zone--drag-hover')) return;
    dropZone.value?.classList.add('drop-zone--drag-hover');
    emit('set-drag-order', props.order);
}

function dragLeave(): void {
    setTimeout(() => {
        if (props.actions.length !== 0) {
            dropZone.value?.classList.remove('drop-zone--drag-hover');

            emit('remove-drag-order', props.order);
        }
    }, 100);
}

watchEffect(() => {
    if (props.actions.length === 0) {
        dropZone.value?.classList.add('drop-zone--visible');
    } else {
        dropZone.value?.classList.remove('drop-zone--visible');
    }
});
</script>

<template>
  <div
    ref="dropZone"
    class="drop-zone"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
  />
</template>

<style scoped>

</style>