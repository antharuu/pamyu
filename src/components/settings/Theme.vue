<script setup lang="ts">
import {computed} from 'vue';

import {useSettingStore} from '../../stores/useSettingStore';

import InputBase from '../inputs/InputBase.vue';

const themeColor = computed<string>(() => useSettingStore().getThemeColor);

function updateColor(newValue: string): void {
    useSettingStore().setThemeColor(newValue);
}

const themes = [
    {name: 'colors.vividViolet', color: '#7D5FFF'},
    {name: 'colors.cobaltBlue', color: '#4A6BFF'},
    {name: 'colors.darkTurquoise', color: '#3AB0CD'},
    {name: 'colors.berryPink', color: '#FF5FA2'},
    {name: 'colors.emeraldGreen', color: '#2DCD91'},
    {name: 'colors.burntOrange', color: '#FF8F5F'}
];

</script>

<template>
  <div>
    <InputBase label="settings.theme">
      <div class="color-container">
        <button
          v-for="theme in themes"
          :key="theme.color"
          :style="{ backgroundColor: theme.color }"
          :class="{ 'color-container--active': themeColor === theme.color}"
          @click="updateColor(theme.color)"
        >
          <span class="color-name">
            {{ $t(theme.name) }}
          </span>
        </button>
      </div>
    </InputBase>
  </div>
</template>

<style scoped>
.color-container {
    display: flex;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 1rem;
    justify-items: start;
    height: 34px;
    align-items: center;
}

.color-container button {
    position: relative;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.color-container button .color-name {
    position: absolute;
    bottom: calc(100% + 0.5rem);
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    text-transform: uppercase;
    color: var(--color-text);
    background-color: var(--color-background-dark);
    padding: .5rem 2rem;
    border-radius: 1rem;
    white-space: nowrap;
    display: none;
}

.color-container button:hover .color-name {
    display: inline-block;
}

.color-container--active::before {
    content: '';
    position: absolute;
    inset: .2rem;
    background-color: var(--color-background);
    border-radius: 50%;
    transition: inset 0.2s ease-in-out;
}

.color-container--active:hover::before {
    inset: 5rem;
}
</style>