<script setup lang="ts">
import {useSettingStore} from '../../stores/useSettingStore';
</script>

<template>
  <div>
    <h2>{{ $t('language') }}</h2>
    <select
      v-model="$i18n.locale"
      @change="useSettingStore().setLocale($i18n.locale)"
    >
      <option value="en">
        English
      </option>
      <option value="fr">
        Français
      </option>
    </select>
  </div>
</template>

<style scoped>

</style>