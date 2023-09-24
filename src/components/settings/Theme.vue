<script setup lang="ts">
import {ref} from 'vue';

import {useSettingStore} from '../../stores/useSettingStore';

const themeColor = ref<string>(useSettingStore().getThemeColor);

function updateColor(event: Event): void {
    useSettingStore().setThemeColor((event.target as HTMLInputElement).value);
}
</script>

<template>
    <div>
        <h2>{{ $t('theme') }}</h2>
        <div class="color">
            <label for="theme-color">{{ $t('theme_color') }}</label>
            <input type="color" id="theme-color" v-model="themeColor" @change="updateColor" />
        </div>
    </div>
</template>

<style scoped>

</style>