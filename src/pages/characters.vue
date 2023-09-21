<script setup lang="ts">
import PageLayout from "../layout/PageLayout.vue";
import ListContainer from "../layout/ListContainer.vue";
</script>

<template>
    <PageLayout page-title="characters">
        <ListContainer>
            <template #list>
                <router-link :to="{name: 'character.create'}">
                    {{ $t("create_character") }}
                </router-link>
            </template>

        <router-view/>
        </ListContainer>
    </PageLayout>
</template>

<style scoped>

</style>