<script setup lang="ts">
import {ref} from 'vue';

import {useSettingStore} from '../../stores/useSettingStore';

import InputContainer from '../../layout/InputContainer.vue';
import InputColor from '../inputs/InputColor.vue';

const themeColor = ref<string>(useSettingStore().getThemeColor);

function updateColor(event: Event): void {
    useSettingStore().setThemeColor((event.target as HTMLInputElement).value);
}
</script>

<template>
  <div>
    <h2>{{ $t('theme') }}</h2>
    <InputContainer class="color">
      <InputColor
        v-model="themeColor"
        label="theme_color"
        @change="updateColor"
      />
    </InputContainer>
  </div>
</template>

<style scoped>

</style>