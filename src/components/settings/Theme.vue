<script setup lang="ts">
import {useSettingStore} from "../../stores/useSettingStore";
import {ref} from "vue";

const themeColor = ref<string>(useSettingStore().getThemeColor);

const updateColor = (event: Event) => {
    useSettingStore().setThemeColor((event.target as HTMLInputElement).value);
}
</script>

<template>
    <div>
        <h2>{{ $t('theme') }}</h2>
        <div class="color">
            <label for="theme-color">{{ $t('theme_color') }} ({{themeColor}})</label>
            <input type="color" id="theme-color" v-model="themeColor" @change="updateColor" />
        </div>
        {{ JSON.stringify(useSettingStore().$state) }}
    </div>
</template>

<style scoped>

</style>