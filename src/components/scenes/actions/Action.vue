<script lang="ts" setup>
import {computed} from 'vue';

import {useScenesStore} from '../../../stores/scenesStore.ts';

import {getActionsElements} from '../../../utils/actionsElements.ts';

import {Action, ActionElementObject} from '../../../types/scene.ts';

import Icon from '../../Icon.vue';
import ActionBtn from '../ActionBtn.vue';

import ActionJump from './ActionJump.vue';
import ActionMessage from './ActionMessage.vue';
import ActionRaw from './ActionRaw.vue';

const props = defineProps<{
    action: Action
}>();

const actionsElements = computed<ActionElementObject>(() => {
    const actionsElements = getActionsElements();
    const actionsElementsObj: ActionElementObject = {};

    for (const actionElement of actionsElements) {
        actionsElementsObj[actionElement.name] = actionElement;
    }

    return actionsElementsObj;
});

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
    <div class="action__content">
      <label class="label">
        <Icon :name="actionsElements[action.type]?.icon ?? 'label'" />
        {{ $t(`scenes.actions.${action.type}.title`) }}
      </label>
      <ActionMessage
        v-if="action.type === 'message'"
        :action="action"
      />
      <ActionJump
        v-else-if="action.type === 'jump'"
        :action="action"
      />
      <ActionRaw
        v-if="action.type === 'raw'"
        :action="action"
      />
    </div>
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
    user-select: none;


    &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: .7rem;
        user-select: none;
    }
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

.label {
    color: var(--color-accent-light);
    display: flex;
    align-items: center;
    gap: .5rem;
    font-size: 1.3rem;
}
</style>