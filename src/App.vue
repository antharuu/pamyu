<script setup lang="ts">
import Navigation from "./layout/Navigation.vue";
import {useSettingStore} from "./stores/useSettingStore.ts";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import {watchEffect} from "vue";
import {getDarkenColor, getLightenColor} from "./utils/colors.ts";

const userConfig = useSettingStore();
const {locale} = useI18n()

locale.value = userConfig.getLocale;

const route = useRoute()

route.meta.props = {
    pageTitle: String,
}

watchEffect(() => {
    const themeColor = useSettingStore().getThemeColor;
    const appStyle = document.documentElement.style;
    appStyle.setProperty('--color-primary', themeColor);
    appStyle.setProperty('--color-primary-dark', getDarkenColor(themeColor, 20));
    appStyle.setProperty('--color-primary-light', getLightenColor(themeColor, 20));
})
</script>

<template>
    <div id="renpy-ui">
        <Navigation/>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<style>
:root {
    /* ---------- COLORS ---------- */
    --color-dark: #131313;
    --color-darkgrey: #202329;
    --color-grey: #2e333d;
    --color-lightgrey: #a7acb8;
    --color-light: #dbfcff;
    --color-error: #E74C3C;
    --color-error-dark: #B93D30;
    --color-success: #2ECC71;
    --color-success-dark: #25A35A;
    --color-info: #6b8afd;
    --color-info-dark: #566ECA;
}

html, body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: var(--color-lightgrey);
    overflow: hidden;
}

* {
    box-sizing: border-box;
}

#renpy-ui {
    width: 100vw;
    height: 100vh;
    background-color: var(--color-dark);
    display: grid;
    grid-template-columns: 120px 1fr;
}

.content {
    background-color: var(--color-darkgrey);
    overflow: hidden;
    padding: 20px;
    border-radius: 25px 0 0 25px;
}

select {
    background-color: var(--color-grey);
    border: none;
    border-radius: 5px;
    padding: .5rem 1rem;
    color: var(--color-lightgrey);
    font-size: 16px;
}
</style>
