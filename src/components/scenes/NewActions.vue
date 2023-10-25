<script lang="ts" setup>
import {Action} from '../../types/scene.ts';

import Icon from '../Icon.vue';

const emit = defineEmits(['drag-start', 'drag-end']);

const actionsElements: {
    name: Action['type'];
    icon: string;
}[] = [
    {name: 'raw', icon: 'code'}
];

function startDrag(event: DragEvent): void {
    const target = event.target as HTMLElement;
    const name = target.dataset.name;
    if (!name) return;

    emit('drag-start', name);
}

function endDrag(): void {
    emit('drag-end');
}
</script>

<template>
  <div class="new-actions__container">
    <div class="new-actions">
      <div
        v-for="actionElement in actionsElements"
        :key="actionElement.name"
        :data-name="actionElement.name"
        class="new-action"
        draggable="true"
        @dragend="endDrag"
        @dragstart="startDrag"
      >
        <Icon :name="actionElement.icon" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.new-actions {
    min-height: 40px;
    display: grid;
    gap: .4rem;
    user-select: none;

    .new-action {
        background-color: var(--color-accent-dark);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 50%;
    }
}
</style>