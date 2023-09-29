<script lang="ts" setup>
import {computed, onMounted} from 'vue';

const props = withDefaults(defineProps<{
    modelValue: string | number | undefined;
    label: string;
    width?: string | null;
    readonly?: boolean;
    error?: string;
    message?: string;
}>(), {
    modelValue: '#ffffff',
    width: '100%',
    readonly: false,
    error: '',
    message: '',
});

const emit = defineEmits(['update:model-value']);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:model-value', value);
    }
});

const uniqueId = `input-${Math.random().toString(36).substr(2, 9)}`;
const usableWidth = props.width ? props.width : '100%';

const isLightColor = computed<boolean>(() => {
    const color = value.value?.toString();
    if (color === undefined) return false;
    if (color.length === 0) return false;
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
});

onMounted(() => {
    emit('update:model-value', props.modelValue);
});
</script>

<template>
  <div
    class="input__group"
    :style="{width: usableWidth}"
    :class="{'input__group--error': error.length > 0}"
  >
    <label :for="uniqueId">{{ $t(label) }}</label>
    <input
      :id="uniqueId"
      v-model.trim="value"
      type="color"
      :readonly="props.readonly"
    >
    <span
      class="input__group-preview"
      :style="{backgroundColor: value?.toString()}"
      :class="{
        'input__group-preview--light': isLightColor
      }"
    >
      {{ value }}
    </span>
    <span
      v-if="message.length > 0 || error.length > 0"
      class="input__group-message"
    >
      <span
        v-if="error.length > 0"
        class="input__group-message-error"
      >
        {{ $t(error) }}
        <br>
      </span>
      <span
        v-if="message.length > 0"
        class="input__group-message-message"
      >
        {{ $t(message) }}
      </span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.input__group {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: .5rem;

    &--error {
        label {
            color: var(--color-danger);
        }

        input {
            box-shadow: 0 0 0 2px var(--color-danger);
        }
    }

    input {
        background-color: var(--color-background-light);
        border: none;
        border-radius: 5px;
        width: 100%;
        opacity: 0;
        outline: none;
        height: 34px;
    }

    &-preview {
        position: absolute;
        inset: 0;
        top: 1.7rem;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        pointer-events: none;
        color: var(--color-light);

        &--light {
            color: var(--color-dark);
        }
    }

    &-message {
        font-size: 12px;
        color: var(--color-lightgrey);
        display: flex;
        flex-direction: column;
        gap: .5rem;

        &-error {
            color: var(--color-danger);
        }
    }
}
</style>
