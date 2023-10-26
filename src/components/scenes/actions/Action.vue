<script lang="ts" setup>
import {ref} from 'vue';

import {useScenesStore} from '../../../stores/scenesStore.ts';

import {Action} from '../../../types/scene.ts';

import Icon from '../../Icon.vue';

import ActionRaw from './ActionRaw.vue';

const props = defineProps<{
    action: Action
}>();

const emit = defineEmits(['deleted']);
const deleteTimer = ref<NodeJS.Timeout | null>(null);
const isDeleting = ref<boolean>(false);

function startDeleting(): void {
    isDeleting.value = true;
    deleteTimer.value = setTimeout(() => {
        const deleted = useScenesStore().deleteAction(props.action._id);
        if (deleted) emit('deleted');
    }, 1000);
}

function stopDeleting(): void {
    if (deleteTimer.value) {
        isDeleting.value = false;
        clearTimeout(deleteTimer.value);
        deleteTimer.value = null;
    }
}
</script>

<template>
  <div class="action">
    <ActionRaw
      v-if="action.type === 'raw'"
      :action="action"
    />
    <div class="action-buttons">
      <button
        :class="{
          'action-button': true,
          'action-button--deleting': isDeleting
        }"
        @mousedown="startDeleting"
        @mouseleave="stopDeleting"
        @mouseup="stopDeleting"
      >
        <Icon name="delete" />
        <span class="deleting-icon">
          <Icon name="delete" />
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action {
    display: grid;
    grid-template-columns: 1fr 30px;
    gap: .5rem;
    transition: all .2s ease-in-out;
    width: 100%;
}

.action-buttons {
    opacity: 1;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    transition: all .2s ease-in-out;
    justify-content: center;
}

.action:hover .action-buttons {
    opacity: 1;
    display: flex;
    grid-template-columns: 1fr 30px;

    .action-button {
        opacity: .5;
        transition-delay: 0s;
    }
}

.action-button {
    position: relative;
    background: var(--color-danger);
    color: var(--color-danger);
    cursor: pointer;
    transition: all .2s ease-in-out;
    border-radius: 50px;
    width: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 1;
    border: 2px dashed var(--color-danger);
    background: transparent;
    opacity: .1;
    transition-delay: .5s;

    > * {
        font-size: 1rem;
        transition: all .2s ease-in-out;
        transition-delay: 0s;
    }

    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0;
        background: var(--color-danger);
        opacity: 0;
        transition: all .2s ease-in-out;
        z-index: -1;
    }

    &:hover {
        opacity: 1 !important;
        transition-delay: 0s;
    }

    .deleting-icon {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        color: var(--color-background);
        transition-delay: 0s;
        transition: all .2s ease-in-out;
        z-index: 2;

        > * {
            font-size: 1rem;
        }
    }

    &--deleting {
        opacity: 1;
        transition-delay: 0s;

        > * {
            transition-delay: .4s;
            opacity: 0;
        }

        &::before {
            opacity: 1;
            animation: delete 1s ease-in-out forwards;
        }

        .deleting-icon {
            opacity: 1;
            transition-delay: .4s;
        }
    }
}

@keyframes delete {
    0% {
        height: 0;
    }

    100% {
        height: 100%;
    }
}
</style>