<template>
    <svg :viewBox="viewBox">
        <use :xlink:href="` /_nuxt/public/icons/sprite.svg#${iconName}`"></use>
    </svg>
</template>

<script setup lang="ts">
defineProps<{
    iconName: string,
    viewBox: string
}>()
</script>