<script setup lang="ts">
import {useSettingStore} from '../../stores/useSettingStore';

import InputSelect from '../inputs/InputSelect.vue';

const locales = [
    {
        label: 'langs.en',
        value: 'en',
    },
    {
        label: 'langs.fr',
        value: 'fr',
    },
];

function updateLocale(newValue: string): void {
    useSettingStore().setLocale(newValue as 'en' | 'fr');
    window.location.reload();
}
</script>

<template>
  <div>
    <InputSelect
      label="settings.language"
      :options="locales"
      :model-value="$i18n.locale"
      @update:model-value="updateLocale"
    />
  </div>
</template>

<style scoped>

</style>