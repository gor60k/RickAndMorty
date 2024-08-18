<template>
    <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-bullet prev-page">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path d="M1.78418 0L7.78418 6L1.78418 12L0.37793 10.5938L4.97168 6L0.37793 1.40625L1.78418 0Z"
                    fill="black" fill-opacity="0.87" />
            </svg>
        </button>
        <span class="pagination-bullet" v-for="page in pages" :key="page" @click="goToPage(page)"
            :class="{ active: page === currentPage }">{{
                page }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-bullet next-page">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path d="M1.78418 0L7.78418 6L1.78418 12L0.37793 10.5938L4.97168 6L0.37793 1.40625L1.78418 0Z"
                    fill="black" fill-opacity="0.87" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
    currentPage: number;
    totalPages: number;
}

const props = defineProps<Props>();

const emit = defineEmits(['pageChanged']);

const pages = computed(() => {
    const pages = [];
    const start = Math.max(1, props.currentPage - 2);
    const end = Math.min(props.totalPages, props.currentPage + 3);
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
});

const prevPage = () => {
    if (props.currentPage > 1) {
        emit('pageChanged', props.currentPage - 1);
    }
};

const nextPage = () => {
    if (props.currentPage < props.totalPages) {
        emit('pageChanged', props.currentPage + 1);
    }
};

const goToPage = (page: number) => {
    emit('pageChanged', page);
};
</script>