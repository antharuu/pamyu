<script lang="ts" setup>
import {useSettingStore} from '../../stores/useSettingStore';

import InputSelect from '../inputs/InputSelect.vue';

const locales = [
    {label: 'langs.ar', value: 'ar'},
    {label: 'langs.bn', value: 'bn'},
    {label: 'langs.de', value: 'de'},
    {label: 'langs.en', value: 'en'},
    {label: 'langs.es', value: 'es'},
    {label: 'langs.fr', value: 'fr'},
    {label: 'langs.hi', value: 'hi'},
    {label: 'langs.ja', value: 'ja'},
    {label: 'langs.pt', value: 'pt'},
    {label: 'langs.ru', value: 'ru'},
    {label: 'langs.zh', value: 'zh'}
];

function updateLocale(newValue: string): void {
    useSettingStore().setLocale(newValue as 'en' | 'fr');
    window.location.reload();
}
</script>

<template>
  <div>
    <InputSelect
      :model-value="$i18n.locale"
      :options="locales"
      label="settings.language"
      @update:model-value="updateLocale"
    />
  </div>
</template>

<style scoped>

</style>