<!-- Your original component -->
<template>
    <main class="page">
        <div class="page-banner">
            <img src="/public/images/main-banner.jpg" alt="Главный Баннер">
        </div>
        <div class="wrapper">
            <div class="filters">
                <input type="text" class="filters-input" v-model="searchQuery" @input="searchCharacters"
                    placeholder="Имя">
                <Dropdown v-model="statusFilter" :options="statusOptions" @change="handleStatusChange" />
                <Dropdown v-model="genderFilter" :options="genderOptions" @change="handleGenderChange" />
            </div>
            <div class="char-cards-list">
                <div class="char-cards-list-wrapper" :class="{ empty: !filteredCharacters?.length }">
                    <CharCard v-for="char in filteredCharacters" :key="char.id" :char-img="char.image"
                        :char-name="char.name" :char-id="char.id" />
                    <div class="not-found" v-if="!filteredCharacters.length">
                        <span>Wubba lubba dub dub,</span>
                        <span>ничего не найдено!</span>
                    </div>
                </div>
                <Pagintation :currentPage="currentPage" :totalPages="totalPages" @pageChanged="handlePageChanged" />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCharacterStore } from '~/stores/getCharacterStore';
import { useCharacterSearchStore } from '~/stores/characterSearchStore';

interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    gender: string
}

const searchStore = useCharacterSearchStore();
const searchQuery = ref<string>('');
const statusFilter = ref<string>('');
const genderFilter = ref<string>('');

const store = useCharacterStore();
const characters = ref<Character[] | null>([]);
const currentPage = ref<number>(1);
const limit = ref<number>(12);
const totalPages = ref<number>(0);

const loadCharacters = async () => {
    await store.getAllCharacters(limit.value, currentPage.value);
    characters.value = store.characters.value;
    totalPages.value = Math.ceil(store.totalCount.value / limit.value);
};

loadCharacters();

const filteredCharacters = computed(() => {
    if (searchQuery.value) {
        return characters.value?.filter((char) => char.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    } else if (statusFilter.value) {
        return characters.value?.filter((char) => char.status === statusFilter.value);
    } else if (genderFilter.value) {
        return characters.value?.filter((char) => char.gender === genderFilter.value);
    }
    else {
        return characters.value;
    }
});

const searchCharacters = async () => {
    searchStore.searchQuery = searchQuery.value;
    await searchStore.getCharacterByName(searchQuery);
};

const handlePageChanged = (newPage: number) => {
    currentPage.value = newPage;
    loadCharacters();
};

const statusOptions = [
    { value: '', label: 'Статус' },
    { value: 'Alive', label: 'Жив' },
    { value: 'Dead', label: 'Мертв' },
    { value: 'unknown', label: 'Неизвестно' },
];

const genderOptions = [
    { value: '', label: 'Пол' },
    { value: 'Female', label: 'Женский' },
    { value: 'Male', label: 'Мужской' },
    { value: 'genderless', label: 'Оно' },
    { value: 'unknown', label: 'Неизвестно' },
];

const handleStatusChange = (newValue: string) => {
    statusFilter.value = newValue;
    console.log(statusFilter.value);

};

const handleGenderChange = (newValue: string) => {
    genderFilter.value = newValue;
};
</script>