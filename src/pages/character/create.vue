<script setup lang="ts">
import {ref} from "vue";
import InputText from "../../components/inputs/InputText.vue";

const name = ref("");
</script>

<template>
    <div>
        <InputText label="character_name" :model-value="name" @update:model-value="name = $event" />
    </div>
</template>

<style scoped>

</style>