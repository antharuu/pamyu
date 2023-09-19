<script setup lang="ts">
import Navigation from "./layout/Navigation.vue";
import {useUserConfig} from "./stores/userConfigStore.ts";
import {useI18n} from "vue-i18n";

const userConfig = useUserConfig();
const { locale } = useI18n()

locale.value = userConfig.getLocale;

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
  --color-dark: #131313;
  --color-darkgrey: #202329;
  --color-grey: #2e333d;
  --color-lightgrey: #a7acb8;
  --color-primary: #6b8afd;
  --color-white: #dbfcff;
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
</style>
