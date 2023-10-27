<script lang="ts" setup>
import {computed, ref} from 'vue';

import Icon from '../Icon.vue';

const props = defineProps<{
    icon: string;
    type: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    pressingDuration: number | undefined;
}>();

const instant = computed(() => props.pressingDuration === undefined || props.pressingDuration === 0);
const duration = computed(() => instant.value ? 0 : props.pressingDuration);
const middleDuration = computed(() => duration.value / 2);
const durationSeconds = computed(() => `${duration.value}s`);
const middleDurationSeconds = computed(() => `${middleDuration.value}s`);

const emit = defineEmits(['clicked']);

const isPressing = ref<boolean>(false);
const pressTimer = ref<NodeJS.Timeout | null>(null);

function startPressing(): void {
    if (props.disabled) return;
    if (instant.value) {
        emit('clicked');
        return;
    }

    isPressing.value = true;
    pressTimer.value = setTimeout(() => {
        emit('clicked');
    }, props.pressingDuration * 1000);
}

function stopPressing(): void {
    isPressing.value = false;
    if (pressTimer.value) {
        clearTimeout(pressTimer.value);
        pressTimer.value = null;
    }
}
</script>

<template>
  <button
    :class="{
      'action-button': true,
      'action-button--primary': type === 'primary',
      'action-button--secondary': type === 'secondary',
      'action-button--danger': type === 'danger',
      'action-button--disabled': disabled,
      'action-button--pressing': isPressing
    }"
    @mousedown="startPressing"
    @mouseleave="stopPressing"
    @mouseup="stopPressing"
  >
    <Icon :name="icon" />
    <span
      v-if="!instant"
      class="pressing-icon"
    >
      <Icon :name="icon" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.action-button {
    --_current-color: var(--color-accent);
    position: relative;
    background: var(--_current-color);
    color: var(--_current-color);
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
    border: 2px dashed var(--_current-color);
    background: transparent;
    opacity: .1;
    transition-delay: .5s;

    &--primary {
        --_current-color: var(--color-accent);
    }

    &--secondary {
        --_current-color: var(--color-text-dark);
    }

    &--danger {
        --_current-color: var(--color-danger);
    }

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
        background: var(--_current-color);
        opacity: 0;
        transition: all .2s ease-in-out;
        z-index: -1;
    }

    &:hover {
        opacity: 1 !important;
        transition-delay: 0s;
    }

    &--disabled {
        cursor: not-allowed;
        opacity: .1 !important;

        &:hover {
            opacity: .1 !important;
        }
    }

    .pressing-icon {
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

    &--pressing {
        opacity: 1;
        transition-delay: 0s;

        > * {
            transition-delay: v-bind(middleDurationSeconds);
            opacity: 0;
        }

        &::before {
            opacity: 1;
            animation: delete v-bind(durationSeconds) ease-out forwards;
        }

        .pressing-icon {
            opacity: 1;
            transition-delay: v-bind(middleDurationSeconds);
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