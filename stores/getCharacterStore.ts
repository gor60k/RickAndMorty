import axios from 'axios';
import { ref, computed } from 'vue';

interface Character {
    id: number
    name: string
    image: string
};

export const useCharacterStore = () => {
    const characters = ref<Character[] | null>([]);
    const characterId = ref<string>('');
    const character = ref<Character | null | undefined>(null);
    const isLoading = ref(false);
    const currentPage = ref<number>(1);
    const limit = ref<number>(12);
    const totalCount = ref<number>(0);

    const getAllCharacters = async (limit?: number, page?: number) => {
        isLoading.value = true;
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
            const charactersArray = response.data.results;
            const slicedCharacters = charactersArray.slice(0, limit);
            characters.value = slicedCharacters;
            totalCount.value = response.data.info.count;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    };

    const getCharacter = async () => {
        if (!characterId.value) return;
        isLoading.value = true;
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId.value}`);
            character.value = response.data;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    };

    const totalPages = computed(() => {
        return Math.ceil(totalCount.value / limit.value);
    });

    const nextPage = async () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
            await getAllCharacters(limit.value, currentPage.value);
        }
    };

    const prevPage = async () => {
        if (currentPage.value > 1) {
            currentPage.value--;
            await getAllCharacters(limit.value, currentPage.value);
        }
    };

    return {
        characterId,
        character,
        isLoading,
        characters,
        currentPage,
        limit,
        totalPages,
        totalCount,
        getAllCharacters,
        getCharacter,
        nextPage,
        prevPage,
    };
};