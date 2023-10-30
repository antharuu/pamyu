<script lang="ts" setup>
import {watchEffect} from 'vue';
import {useI18n} from 'vue-i18n';
import {useRoute} from 'vue-router';

import {useSettingStore} from './stores/useSettingStore.ts';

import {getDarkenColor, getLightenColor} from './utils/colors.ts';

import Navigation from './layout/Navigation.vue';

const userConfig = useSettingStore();
const {locale} = useI18n();

locale.value = userConfig.getLocale;

const route = useRoute();

route.meta.props = {
    pageTitle: String,
};

watchEffect(() => {
    const themeColor = useSettingStore().getThemeColor;
    const appStyle = document.documentElement.style;
    appStyle.setProperty('--color-accent', themeColor);
    appStyle.setProperty('--color-accent-dark', getDarkenColor(themeColor, 15));
    appStyle.setProperty('--color-accent-light', getLightenColor(themeColor, 15));
});
</script>

<template>
  <div id="renpy-ui">
    <Navigation />
    <div class="content">
      <div class="page">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
:root {
    /* Base Colors */
    --color-background: #1E1E2D;
    --color-background-light: #3A3A4A;
    --color-background-dark: #0B0B1B;

    --color-text: #E0E0E6;
    --color-text-light: #F2F2F7;
    --color-text-dark: #C0C0C6;

    --color-accent: #7D5FFF;
    --color-accent-light: #A28DFF;
    --color-accent-dark: #5C47CC;

    --color-success: #6BCD91;
    --color-success-light: #8DE3B0;
    --color-success-dark: #4BA76E;

    --color-warning: #FFC75F;
    --color-warning-light: #FFDE8D;
    --color-warning-dark: #E0A93F;

    --color-danger: #FF6B6B;
    --color-danger-light: #FF8D8D;
    --color-danger-dark: #E04848;

    font-size: 14px;
}

html, body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: var(--color-text);
    overflow: hidden;
}

* {
    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 8px;
        overflow: hidden;


        &-track {
            border-radius: 16px;
        }

        &-thumb {
            background: var(--color-background-dark);
            border-radius: 16px;

            &:hover {
                background: var(--color-background-light);
            }
        }
    }
}

a {
    text-decoration: none;
}

#renpy-ui {
    width: 100vw;
    height: 100vh;
    background-color: var(--color-background-dark);
    display: grid;
    grid-template-columns: auto 1fr;
}

.content {
    background-color: var(--color-background);
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 2rem 0 0 2rem;

    .page {
        padding: 1rem 1rem .5rem 1rem;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
</style>
