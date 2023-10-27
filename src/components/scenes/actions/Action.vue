<script lang="ts" setup>
import {computed} from 'vue';

import {useScenesStore} from '../../../stores/scenesStore.ts';

import {Action} from '../../../types/scene.ts';

import ActionBtn from '../ActionBtn.vue';

import ActionRaw from './ActionRaw.vue';

const props = defineProps<{
    action: Action
}>();

const isOrderFirst = computed(() => props.action._order === 0);
const isOrderLast = computed(() => {
    const scene = useScenesStore().getSceneByActionId(props.action._id);
    if (!scene) return false;

    return props.action._order === scene.actions.length - 1;
});

const emit = defineEmits(['updated']);

function deleteAction(): void {
    const deleted = useScenesStore().deleteAction(props.action._id);
    if (deleted) emit('updated');
}

function orderUp(): void {
    useScenesStore().updateActionOrder(props.action._id, -1);
    emit('updated');
}

function orderDown(): void {
    useScenesStore().updateActionOrder(props.action._id, 1);
    emit('updated');
}
</script>

<template>
  <div class="action">
    <ActionRaw
      v-if="action.type === 'raw'"
      :action="action"
    />
    <div class="action-buttons">
      <ActionBtn
        :disabled="isOrderFirst"
        :pressing-duration=".5"
        icon="arrow_upward"
        type="secondary"
        @clicked="orderUp"
      />
      <ActionBtn
        :pressing-duration="3"
        class="delete-btn"
        icon="delete"
        type="danger"
        @clicked="deleteAction"
      />
      <ActionBtn
        :disabled="isOrderLast"
        :pressing-duration=".5"
        icon="arrow_downward"
        type="secondary"
        @clicked="orderDown"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: .5rem;
    transition: all .2s ease-in-out;
    width: 100%;
    min-height: calc(60px + .5rem);
}

.action-buttons {
    opacity: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 30px);
    flex-direction: row;
    gap: .5rem;
    transition: all .2s ease-in-out;
    justify-content: center;
}

.action:hover .action-buttons {
    opacity: 1;

    .action-button {
        opacity: .5;
        transition-delay: 0s;
    }
}

.delete-btn {
    grid-column: 2;
    grid-row: span 2;
}
</style>