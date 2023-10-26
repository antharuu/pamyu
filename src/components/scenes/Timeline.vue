<script lang="ts" setup>
import {onMounted, ref} from 'vue';

import {useScenesStore} from '../../stores/scenesStore.ts';

import {Action, RawAction} from '../../types/scene.ts';

import TimelineAction from './actions/action.vue';
import NewActions from './NewActions.vue';

const props = defineProps<{
    sceneId: string
}>();

const actions = ref<Action[]>([]);
const selectedAction = ref<Action['type'] | null>(null);
const dropZone = ref<HTMLDivElement | null>(null);
const dropZoneSelected = ref<boolean>(false);

function init(): void {
    actions.value = [];

    const newActions = useScenesStore().getAllActionsOfScene(props.sceneId);
    if (newActions) actions.value = newActions;
}

function addAction(): void {
    if (!selectedAction.value) return;
    const actionName = selectedAction.value;
    let newAction: Partial<Action> = {};

    switch (actionName) {
        case 'raw':
            const rawAction = newAction as RawAction;
            rawAction['code'] = '';
            newAction = rawAction;
            break;
        default:
            console.error('Unknown action type: ', actionName);
            return;
    }

    useScenesStore().createAction(actionName, newAction, props.sceneId);
    init();
}

function startDrag(name: Action['type']): void {
    selectedAction.value = name;
    dropZone.value?.classList.add('drop-zone--visible');
}

function endDrag(): void {
    dropZone.value?.classList.remove('drop-zone--visible');
    dropZone.value?.classList.remove('drop-zone--drag-hover');

    if (dropZoneSelected.value) {
        addAction();
    }

    dropZoneSelected.value = false;
}

function dragEnter(): void {
    if (dropZone.value?.classList.contains('drop-zone--drag-hover')) return;
    dropZone.value?.classList.add('drop-zone--drag-hover');
    dropZoneSelected.value = true;
}

function dragLeave(): void {
    setTimeout(() => {
        dropZone.value?.classList.remove('drop-zone--drag-hover');
        dropZoneSelected.value = false;
    }, 100);
}

onMounted(init);
</script>

<template>
  <div class="timeline">
    <div class="timeline__content">
      <div
        v-for="action in actions"
        :key="action._id"
        class="action"
      >
        <TimelineAction
          :action="action"
          @deleted="init"
        />
      </div>
      <div
        ref="dropZone"
        class="drop-zone"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
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
    width: calc(100% - calc(30px + .5rem));

    &--visible {
        border: 2px dashed var(--color-accent);
    }

    &--drag-hover {
        height: 35px !important;
        opacity: 1;
    }
}
</style>