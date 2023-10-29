<script lang="ts" setup>
import {onMounted, ref} from 'vue';

import {useScenesStore} from '../../stores/scenesStore.ts';

import {Action, JumpAction, MessageAction, RawAction} from '../../types/scene.ts';

import TimelineAction from './actions/Action.vue';
import DropZone from './DropZone.vue';
import NewActions from './NewActions.vue';

const props = defineProps<{
    sceneId: string
}>();

const actions = ref<Action[]>([]);
const selectedAction = ref<Action['type'] | null>(null);
const orderSelected = ref<number | null>(null);

function init(): void {
    actions.value = [];

    const newActions = useScenesStore().getAllActionsOfScene(props.sceneId);
    if (newActions) actions.value = newActions;
}

function addAction(): void {
    console.log('addAction', selectedAction.value, orderSelected.value);
    if (selectedAction.value === null || orderSelected.value === null) return;

    const actionName = selectedAction.value;
    const newAction = getAction(actionName);
    if (!newAction) return;

    useScenesStore().createAction(actionName, newAction, props.sceneId, orderSelected.value);
    removeOrderSelected(orderSelected.value);
    init();
}

function getAction(actionName: Action['type']): Action | null {
    let newAction: Partial<Action> = {};

    switch (actionName) {
        case 'message':
            const messageAction = newAction as MessageAction;
            messageAction['message'] = '';
            messageAction['character'] = null;
            newAction = messageAction;
            break;
        case 'jump':
            const jumpAction = newAction as JumpAction;
            jumpAction['sceneId'] = null;
            newAction = jumpAction;
            break;
        case 'raw':
            const rawAction = newAction as RawAction;
            rawAction['code'] = '';
            newAction = rawAction;
            break;
        default:
            console.error('Unknown action type: ', actionName);
            return null;
    }

    return newAction as Action;
}

function startDrag(name: Action['type']): void {
    selectedAction.value = name;
}

function endDrag(): void {
    if (selectedAction.value !== null || orderSelected.value !== null) {
        addAction();
    }
    selectedAction.value = null;
}

function setOrderSelected(order: number): void {
    orderSelected.value = order;
}

function removeOrderSelected(order: number): void {
    if (orderSelected.value === order) {
        orderSelected.value = null;
    }
}

onMounted(init);
</script>

<template>
  <div class="timeline">
    <div class="timeline__content">
      <TransitionGroup
        v-for="action in actions"
        :key="action._id"
        class="action"
        tag="div"
      >
        <DropZone
          :key="action._id + '-drop'"
          :actions="actions"
          :is-visible="selectedAction !== null || orderSelected === action._order - 1"
          :order="action._order - .5"
          :selected-action="selectedAction"
          class="drop-zone--not-last"
          @set-drag-order="setOrderSelected"
          @remove-drag-order="removeOrderSelected"
        />
        <TimelineAction
          :key="action._id"
          :action="action"
          @updated="init"
        />
      </TransitionGroup>
      <DropZone
        :actions="actions"
        :is-visible="selectedAction !== null || actions.length === 0"
        :order="actions.length"
        :selected-action="selectedAction"
        @set-drag-order="setOrderSelected"
        @remove-drag-order="removeOrderSelected"
      />
    </div>
    <NewActions
      @drag-start="startDrag"
      @drag-end="endDrag"
    />
  </div>
</template>

<style lang="scss" scoped>
.timeline {
    display: grid;
    gap: .5rem;
    grid-template-columns: 1fr 40px;
    overflow-y: hidden;
    height: calc(100vh - 8.3rem);

    &__content {
        display: grid;
        align-content: start;
        gap: .5rem;
        overflow-y: auto;
        padding: .5rem .5rem 50px;
    }
}

.drop-zone {
    pointer-events: all;
    transition: all .2s ease-in-out;
    border: 2px dashed transparent;
    border-radius: .5rem;
    position: relative;
    height: 10px;
    opacity: .5;
    width: calc(100% - calc(60px + 1rem));

    &--visible {
        border: 2px dashed var(--color-accent);
    }

    &--drag-hover {
        height: 35px !important;
        opacity: 1;
    }

    &--not-last {
        margin-bottom: .5rem;
    }
}
</style>