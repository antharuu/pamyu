<script setup lang="ts">
import Locale from '../components/settings/Locale.vue';
import Theme from '../components/settings/Theme.vue';

import PageLayout from '../layout/PageLayout.vue';
</script>

<template>
  <PageLayout page-title="settings">
    <div class="page-settings">
      <Locale />
      <Theme />
    </div>
  </PageLayout>
</template>

<style scoped>
.page-settings {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 1rem;
}
</style>