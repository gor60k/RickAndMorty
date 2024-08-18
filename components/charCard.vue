<template>
    <NuxtLink :to="{ name: 'character-id', params: { id: charId } }">
        <div class="char-card">
            <div class="char-card-img">
                <img :src="charImg" :alt="charName">
            </div>
            <span class="char-card-name">
                {{ charName }}
            </span>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    charImg: string
    charName: string
    charId: number
}>()
</script>