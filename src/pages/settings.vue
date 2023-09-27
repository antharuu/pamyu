<script setup lang="ts">
import Locale from '../components/settings/Locale.vue';
import Renpy from '../components/settings/Renpy.vue';
import Theme from '../components/settings/Theme.vue';

import PageLayout from '../layout/PageLayout.vue';
import Row from '../layout/Row.vue';
</script>

<template>
  <PageLayout page-title="settings">
    <Row large="2">
      <Row>
        <Renpy />
      </Row>
      <Row small="3">
        <Locale />
        <Theme />
      </Row>
    </Row>
  </PageLayout>
</template>

<style scoped>
</style>