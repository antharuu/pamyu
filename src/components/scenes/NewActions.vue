<script lang="ts" setup>
import {getActionsElements} from '../../utils/actionsElements.ts';

import Icon from '../Icon.vue';

const emit = defineEmits(['drag-start', 'drag-end']);

const actionsElements = getActionsElements();

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
        <div
          class="label"
          v-text="actionElement.label"
        />
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
        position: relative;
        z-index: 2;

        .label {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 50%;
            z-index: -1;
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
            background: var(--color-accent-dark);
            overflow: hidden;
            padding: .5rem 50%;
            border-radius: 50rem 0 0 50rem;
            transform: scaleX(0);
            transform-origin: right;
        }

        &:hover {
            .label {
                transform: scaleX(1);
                transition: transform .2s ease-in-out;
            }
        }
    }
}
</style>