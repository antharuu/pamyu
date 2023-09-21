<script setup lang="ts">

</script>

<template>
    <div class="list-container">
        <div class="left">
            <slot name="list"></slot>
        </div>
        <div class="right">
            <slot/>
        </div>
    </div>
</template>

<style scoped>
.list-container {
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 4fr;
    grid-gap: 1rem;
}

.left {
    overflow: hidden;
    padding: .5em;
}

.right {
    overflow: hidden;
    padding: .5em;
}
</style>